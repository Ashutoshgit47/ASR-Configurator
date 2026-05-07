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
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
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
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden fixed top-16 left-0 right-0 bg-card border-b border-border z-40 shadow-md">
          <div className="flex flex-col p-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-4 py-3 text-left font-medium transition-colors rounded-md ${currentPage === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-3 text-left font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
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
          </div>
        </nav>
      )}
    </>
  );
}
