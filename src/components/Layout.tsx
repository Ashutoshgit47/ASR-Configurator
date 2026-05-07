import { useState } from 'react';
import { Header } from '@/components/Header';
import ConfiguratorPage from '@/pages/ConfiguratorPage';
import WhyASRPage from '@/pages/WhyASRPage';
import HowToUsePage from '@/pages/HowToUsePage';
import AboutPage from '@/pages/AboutPage';

type PageId = 'configurator' | 'why' | 'how' | 'about';

export function Layout() {
  const [currentPage, setCurrentPage] = useState<PageId>('configurator');

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 flex flex-col min-h-0">
        {currentPage === 'configurator' && <ConfiguratorPage />}
        {currentPage === 'why' && <WhyASRPage />}
        {currentPage === 'how' && <HowToUsePage />}
        {currentPage === 'about' && <AboutPage />}
      </main>
    </div>
  );
}
