import { useState } from 'react';
import { ASR_RULES, ASRRule, RuleState } from '@/data/asrRules';
import { Shield, Eye, Ban, Copy, Check } from 'lucide-react';

interface RuleDetailPanelProps {
  selectedRule: string | null;
  currentRules: Record<string, RuleState>;
  updateRuleState: (guid: string, state: RuleState) => void;
  onOpenSidebar?: () => void;
}

export function RuleDetailPanel({ selectedRule, currentRules, updateRuleState, onOpenSidebar }: RuleDetailPanelProps) {
  const [copiedGuid, setCopiedGuid] = useState(false);

  if (!selectedRule) {
    return (
      <div className="w-full max-w-2xl m-auto px-2 sm:px-0 py-4">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 text-center shadow-md">
          <Shield className="w-12 h-12 text-primary mx-auto mb-3 opacity-80" />
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Select an ASR Rule</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">Choose a rule from the list to view its behavior, risk profile, and configure its deployment mode.</p>
          {onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="md:hidden inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground min-h-[44px]"
            >
              Browse {ASR_RULES.length} Rules
            </button>
          )}
        </div>
      </div>
    );
  }

  const rule = ASR_RULES.find(r => r.guid === selectedRule);
  if (!rule) return null;

  const currentState = currentRules[rule.guid] || 0;

  const getRiskBadgeClass = (risk: ASRRule['risk']) => {
    switch (risk) {
      case 'LOW': return 'bg-emerald-600 text-white';
      case 'MEDIUM': return 'bg-blue-600 text-white';
      case 'HIGH': return 'bg-orange-600 text-white';
      case 'CRITICAL': return 'bg-red-700 text-white';
    }
  };

  const copyGuid = async () => {
    try {
      await navigator.clipboard.writeText(rule.guid);
      setCopiedGuid(true);
      setTimeout(() => setCopiedGuid(false), 2000);
    } catch {
      setCopiedGuid(true);
      setTimeout(() => setCopiedGuid(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-2xl m-auto px-2 sm:px-0 py-1 sm:py-2">
      <div className="bg-card border border-border rounded-xl p-3.5 sm:p-6 shadow-md">
        {/* Title */}
        <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-2.5 leading-tight tracking-tight text-foreground">
          {rule.name}
        </h2>

        {/* Badges & Copy GUID */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3.5">
          <span className={`inline-flex items-center px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase rounded-md tracking-wider ${getRiskBadgeClass(rule.risk)}`}>
            {rule.risk} RISK
          </span>
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] sm:text-xs font-semibold uppercase rounded-md bg-secondary text-secondary-foreground border border-border">
            {rule.category}
          </span>
          <button
            onClick={copyGuid}
            className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-md bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors ml-auto min-h-[26px] sm:min-h-[28px]"
            title="Click to copy rule GUID"
          >
            {copiedGuid ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>{copiedGuid ? 'Copied GUID' : 'Copy GUID'}</span>
          </button>
        </div>

        {/* Description & Scenario */}
        <div className="space-y-1 sm:space-y-1.5 mb-2.5 sm:mb-3.5 text-xs sm:text-sm">
          <p className="leading-snug sm:leading-relaxed">
            <span className="font-semibold text-foreground">Description: </span>
            <span className="text-muted-foreground">{rule.desc}</span>
          </p>
          <p className="leading-snug sm:leading-relaxed">
            <span className="font-semibold text-foreground">Attack Scenario: </span>
            <span className="text-muted-foreground">{rule.example}</span>
          </p>
        </div>

        {/* GUID Info Bar */}
        <div className="mb-3 sm:mb-4 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-muted/40 rounded-lg border border-border/70 flex items-center justify-between text-xs font-mono">
          <span className="text-muted-foreground text-[10px] sm:text-xs break-all">
            GUID: <span className="text-foreground select-all font-semibold">{rule.guid}</span>
          </span>
        </div>

        {/* Mode Selector */}
        <div className="space-y-1.5 sm:space-y-2 pt-2 border-t border-border/60">
          <label className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Select Enforcement Mode
          </label>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <button
              onClick={() => updateRuleState(rule.guid, 1)}
              className={`min-h-[38px] sm:min-h-[42px] py-1.5 sm:py-2 px-2 sm:px-3 font-semibold text-xs sm:text-sm border rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${currentState === 1
                ? 'border-destructive bg-destructive text-destructive-foreground shadow-sm ring-1 ring-destructive'
                : 'border-input bg-background hover:bg-destructive/10 hover:text-destructive'
                }`}
            >
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Block</span>
            </button>
            <button
              onClick={() => updateRuleState(rule.guid, 2)}
              className={`min-h-[38px] sm:min-h-[42px] py-1.5 sm:py-2 px-2 sm:px-3 font-semibold text-xs sm:text-sm border rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${currentState === 2
                ? 'border-amber-500 bg-amber-500 text-white shadow-sm ring-1 ring-amber-500'
                : 'border-input bg-background hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Audit</span>
            </button>
            <button
              onClick={() => updateRuleState(rule.guid, 0)}
              className={`min-h-[38px] sm:min-h-[42px] py-1.5 sm:py-2 px-2 sm:px-3 font-semibold text-xs sm:text-sm border rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${currentState === 0
                ? 'border-muted-foreground/60 bg-secondary text-foreground shadow-sm ring-1 ring-muted-foreground'
                : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
            >
              <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Disabled</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-1.5">
            {currentState === 1 && (
              <>
                <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                <span><strong className="text-foreground">Block mode:</strong> Prevents matching behavior. Generates Windows Defender Event ID 1121.</span>
              </>
            )}
            {currentState === 2 && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <span><strong className="text-foreground">Audit mode:</strong> Permits actions while logging under Windows Defender Event ID 1122.</span>
              </>
            )}
            {currentState === 0 && (
              <>
                <span className="w-2 h-2 rounded-full bg-muted-foreground/60 flex-shrink-0" />
                <span><strong className="text-foreground">Disabled:</strong> Rule is completely inactive and not evaluated by Windows Defender.</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
