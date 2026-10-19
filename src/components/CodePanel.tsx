
import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle, GripHorizontal, ChevronDown, ChevronUp, Copy, Check, Terminal } from 'lucide-react';
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
  { id: 'powershell', label: 'PowerShell', tooltip: 'Run in elevated PowerShell. Best for standalone devices.' },
  { id: 'gpo', label: 'Group Policy', tooltip: 'Import .reg into Group Policy. Best for Active Directory domains.' },
  { id: 'intune', label: 'Intune', tooltip: 'Import JSON or OMA-URI to Microsoft Intune. Best for cloud & M365.' },
];

export function CodePanel({ currentTab, setCurrentTab, generatedCode, onClear, onCopy }: CodePanelProps) {
  const [height, setHeight] = useState(260);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const isResizing = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isCollapsed) return;
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  }, [isCollapsed]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;

    const windowHeight = window.innerHeight;
    const newHeight = windowHeight - e.clientY;

    const minHeight = 140;
    const maxHeight = windowHeight * 0.7;

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      setHeight(newHeight);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const h = isCollapsed ? 44 : height;
    document.documentElement.style.setProperty('--code-panel-height', `${h}px`);
    return () => {
      document.documentElement.style.removeProperty('--code-panel-height');
    };
  }, [height, isCollapsed]);

  return (
    <div
      ref={panelRef}
      className="bg-card border-t border-border flex flex-col flex-shrink-0 transition-all duration-200"
      style={{ height: isCollapsed ? 'auto' : `${height}px`, minHeight: isCollapsed ? 'auto' : '140px', maxHeight: '70vh' }}
    >
      {/* Resizer Handle - Desktop only when not collapsed */}
      {!isCollapsed && (
        <div
          onMouseDown={handleMouseDown}
          className="hidden md:flex h-2.5 w-full cursor-ns-resize items-center justify-center bg-secondary/80 hover:bg-accent transition-colors border-b border-border group"
          title="Drag to resize code panel"
        >
          <GripHorizontal className="w-5 h-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border flex-shrink-0 bg-card">
        {/* Tabs row */}
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <div className="flex items-center gap-1 mr-1 text-muted-foreground">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold hidden sm:inline">Export:</span>
          </div>
          <div className="flex gap-1 min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  if (isCollapsed) setIsCollapsed(false);
                }}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-medium transition-colors rounded-md whitespace-nowrap ${currentTab === tab.id
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
              >
                {tab.id === 'gpo' ? (
                  <>
                    <span className="hidden sm:inline">Group Policy</span>
                    <span className="sm:hidden">GPO</span>
                  </>
                ) : (
                  tab.label
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 text-muted-foreground hidden sm:inline" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover border border-border">
                    <p className="text-xs">{tab.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive text-xs px-2.5 h-7 min-h-[30px]"
          >
            Clear
          </Button>
          <Button
            size="sm"
            onClick={handleCopyClick}
            className={`text-xs px-3 h-7 min-h-[30px] flex items-center gap-1 transition-all ${copied ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 min-w-[28px] text-muted-foreground hover:text-foreground"
            aria-label={isCollapsed ? 'Expand code panel' : 'Collapse code panel'}
            title={isCollapsed ? 'Expand code panel' : 'Collapse code panel'}
          >
            {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Code Content */}
      {!isCollapsed && (
        <div className="flex-1 p-2 sm:p-3 overflow-hidden bg-background/50">
          <div
            className="code-scroll bg-muted/40 border border-border rounded-md overflow-auto h-full"
          >
            <pre className="p-3 text-[11px] sm:text-xs md:text-sm font-mono whitespace-pre-wrap break-all text-foreground leading-relaxed">
              {generatedCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
