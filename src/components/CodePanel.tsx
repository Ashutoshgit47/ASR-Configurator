import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, GripHorizontal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { TabType } from '@/hooks/useASRConfigurator';

interface CodePanelProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  generatedCode: string;
  onClear: () => void;
  onCopy: () => void;
}

const tabs: { id: TabType; label: string; tooltip: string }[] = [
  { id: 'powershell', label: 'PowerShell', tooltip: 'Run in elevated PowerShell. Best for single machines.' },
  { id: 'gpo', label: 'Group Policy', tooltip: 'Import into Group Policy. Best for domains.' },
  { id: 'intune', label: 'Intune', tooltip: 'Import JSON to Intune. Best for cloud/M365.' },
];

export function CodePanel({ currentTab, setCurrentTab, generatedCode, onClear, onCopy }: CodePanelProps) {
  const [height, setHeight] = useState(280);
  const isResizing = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;

    const windowHeight = window.innerHeight;
    const newHeight = windowHeight - e.clientY;

    const minHeight = 150;
    const maxHeight = windowHeight * 0.6;

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setHeight(newHeight);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  const handleTouchStart = useCallback(() => {
    isResizing.current = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isResizing.current || !e.touches[0]) return;

    const windowHeight = window.innerHeight;
    const newHeight = windowHeight - e.touches[0].clientY;

    const minHeight = 150;
    const maxHeight = windowHeight * 0.6;

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setHeight(newHeight);
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isResizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={panelRef}
      className="bg-card border-t border-border flex flex-col flex-shrink-0"
      style={{ height: `${height}px`, minHeight: '200px', maxHeight: '60vh' }}
    >
      {/* Resizer Handle - Desktop only */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="hidden md:flex h-3 w-full cursor-ns-resize items-center justify-center bg-secondary hover:bg-accent transition-colors border-b border-border group"
      >
        <GripHorizontal className="w-6 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2 p-2 sm:p-3 border-b border-border flex-shrink-0">
        {/* Tabs row */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex gap-0.5 sm:gap-1 min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${currentTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
              >
                {tab.label}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground hidden sm:block" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover border border-border">
                    <p className="text-xs sm:text-sm">{tab.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-9"
            >
              <span className="hidden sm:inline">Clear</span>
              <span className="sm:hidden">×</span>
            </Button>
            <Button
              size="sm"
              onClick={onCopy}
              className="text-xs sm:text-sm px-2 sm:px-3 h-7 sm:h-9"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>

      {/* Code Content - with explicit overflow scroll */}
      <div className="flex-1 p-2 sm:p-3 overflow-hidden">
        <div
          className="code-scroll bg-muted/50 border border-border rounded-md"
          style={{ height: '100%', maxHeight: '100%' }}
        >
          <pre className="p-2 sm:p-4 text-[10px] sm:text-xs md:text-sm font-mono whitespace-pre-wrap break-all text-foreground">
            {generatedCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
