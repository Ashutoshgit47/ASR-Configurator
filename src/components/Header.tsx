import { useState } from 'react';
import { Sun, Moon, Menu, X, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type PageId = 'configurator' | 'why' | 'how' | 'about';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const navItems: { id: PageId; label: string }[] = [
  { id: 'configurator', label: 'Configurator' },
  { id: 'why', label: 'Why ASR Matters' },
  { id: 'how', label: 'How to Use' },
  { id: 'about', label: 'About' },
];

function SupportPopupContent() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground text-center">
        If you find this tool helpful, consider supporting the developer!
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <a href="https://buymeachai.ezee.li/ashutosh47" target="_blank" rel="noopener noreferrer" className="inline-block">
          <img src="https://buymeachai.ezee.li/assets/images/buymeachai-button.png" alt="Buy Me A Chai" className="rounded-md hover:opacity-90 transition-opacity h-10 w-auto" />
        </a>
        <a href="https://ko-fi.com/Y8Y11V9RQ2" target="_blank" rel="noopener noreferrer" className="inline-block">
          <img src="https://storage.ko-fi.com/cdn/kofi3.png?v=6" alt="Buy Me a Coffee at ko-fi.com" className="hover:opacity-90 transition-opacity h-10 w-auto" />
        </a>
      </div>
    </div>
  );
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Layers className="w-8 h-8 text-primary" strokeWidth={2} />
          <span className="text-lg md:text-xl font-bold tracking-tight">ASR Configurator</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors relative rounded-md ${currentPage === item.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://github.com/Ashutoshgit47/ASR-Configurator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors inline-flex items-center justify-center min-w-[36px] min-h-[36px]"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors min-h-[36px]">
                Support
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>❤️ Support This Project</DialogTitle>
              </DialogHeader>
              <SupportPopupContent />
            </DialogContent>
          </Dialog>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground w-10 h-10 min-w-[40px] min-h-[40px]"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 min-w-[40px] min-h-[40px]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            className="bg-card border-b border-border shadow-lg p-3 space-y-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full px-4 py-3 min-h-[44px] text-left font-medium transition-colors rounded-md text-base ${currentPage === item.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://github.com/Ashutoshgit47/ASR-Configurator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-4 py-3 min-h-[44px] text-left font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md text-base transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub Repository
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full px-4 py-3 min-h-[44px] text-left font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md text-base transition-colors">
                  ❤️ Support Developer
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>❤️ Support This Project</DialogTitle>
                </DialogHeader>
                <SupportPopupContent />
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      )}
    </>
  );
}
