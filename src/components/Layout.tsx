import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import ConfiguratorPage from '@/pages/ConfiguratorPage';
import WhyASRPage from '@/pages/WhyASRPage';
import HowToUsePage from '@/pages/HowToUsePage';
import AboutPage from '@/pages/AboutPage';

export type PageId = 'configurator' | 'why' | 'how' | 'about';

const pageTitles: Record<PageId, string> = {
  configurator: 'ASR Configurator - Attack Surface Reduction Rules Configuration Tool',
  why: 'Why ASR Matters - Microsoft Defender Attack Surface Reduction Guide',
  how: 'How to Use ASR Rules - PowerShell, GPO & Intune Deployment Guide',
  about: 'About ASR Configurator - Microsoft Defender Security Tool',
};

export function Layout() {
  const [currentPage, setCurrentPageState] = useState<PageId>(() => {
    if (typeof window === 'undefined') return 'configurator';
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page') as PageId | null;
    if (p && (p === 'configurator' || p === 'why' || p === 'how' || p === 'about')) {
      return p;
    }
    return 'configurator';
  });

  const setCurrentPage = useCallback((page: PageId) => {
    setCurrentPageState(page);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (page === 'configurator') {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', page);
      }
      window.history.replaceState({}, '', url.toString());
      document.title = pageTitles[page];

      const pageCanonical = page === 'configurator' 
        ? 'https://asrconfigurator.pages.dev/' 
        : `https://asrconfigurator.pages.dev/?page=${page}`;
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', pageCanonical);
      }
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', pageCanonical);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (currentPage === 'configurator' && params.get('rule')) {
        return;
      }
      document.title = pageTitles[currentPage];
      const pageCanonical = currentPage === 'configurator' 
        ? 'https://asrconfigurator.pages.dev/' 
        : `https://asrconfigurator.pages.dev/?page=${currentPage}`;
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', pageCanonical);
      }
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', pageCanonical);
      }
    }
  }, [currentPage]);

  return (
    <div className="h-[100dvh] min-h-[100dvh] flex flex-col bg-background overflow-hidden">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {currentPage === 'configurator' && <ConfiguratorPage />}
        {currentPage === 'why' && <WhyASRPage />}
        {currentPage === 'how' && <HowToUsePage />}
        {currentPage === 'about' && <AboutPage />}
      </main>
    </div>
  );
}
