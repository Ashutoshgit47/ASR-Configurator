import { ASR_RULES, ASRRule, RuleState } from '@/data/asrRules';

interface RuleDetailPanelProps {
  selectedRule: string | null;
  currentRules: Record<string, RuleState>;
  updateRuleState: (guid: string, state: RuleState) => void;
}

export function RuleDetailPanel({ selectedRule, currentRules, updateRuleState }: RuleDetailPanelProps) {
  if (!selectedRule) {
    return (
      <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
        <div className="bg-card border border-border rounded-lg p-6 sm:p-8 text-center shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold mb-2">Select a rule to configure</h2>
          <p className="text-sm sm:text-base text-muted-foreground">Choose a rule from the sidebar to view details and set its mode.</p>
        </div>
      </div>
    );
  }

  const rule = ASR_RULES.find(r => r.guid === selectedRule);
  if (!rule) return null;

  const currentState = currentRules[rule.guid] || 0;

  const getRiskBadgeClass = (risk: ASRRule['risk']) => {
    switch (risk) {
      case 'LOW': return 'bg-emerald-500 text-white';
      case 'MEDIUM': return 'bg-blue-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'CRITICAL': return 'bg-red-600 text-white';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-sm">
        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 leading-tight">
          {rule.name}
        </h2>

        {/* Badges - always in a row */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
          <span className={`inline-flex px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap ${getRiskBadgeClass(rule.risk)}`}>
            {rule.risk} RISK
          </span>
          <span className="inline-flex px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap bg-secondary text-secondary-foreground border border-foreground">
            {rule.category}
          </span>
        </div>

        {/* Description */}
        <div className="space-y-1 mb-4 sm:mb-5">
          <p className="text-sm sm:text-base">
            <span className="font-semibold text-foreground">Description: </span>
            <span className="text-muted-foreground">{rule.desc}</span>
          </p>
        </div>

        {/* Example */}
        <div className="space-y-1 mb-4 sm:mb-5">
          <p className="text-sm sm:text-base">
            <span className="font-semibold text-foreground">Example: </span>
            <span className="text-muted-foreground">{rule.example}</span>
          </p>
        </div>

        {/* GUID */}
        <div className="mb-5 sm:mb-6">
          <code className="text-[10px] sm:text-xs text-muted-foreground font-mono block break-all">
            GUID: {rule.guid}
          </code>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => updateRuleState(rule.guid, 1)}
            className={`py-2.5 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm border rounded-md transition-all ${currentState === 1
              ? 'border-destructive bg-destructive text-destructive-foreground shadow-sm'
              : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            Block
          </button>
          <button
            onClick={() => updateRuleState(rule.guid, 2)}
            className={`py-2.5 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm border rounded-md transition-all ${currentState === 2
              ? 'border-chart-4 bg-chart-4 text-foreground shadow-sm'
              : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            Audit
          </button>
          <button
            onClick={() => updateRuleState(rule.guid, 0)}
            className={`py-2.5 sm:py-3 px-2 sm:px-4 font-semibold text-xs sm:text-sm border rounded-md transition-all ${currentState === 0
              ? 'border-muted-foreground bg-secondary text-secondary-foreground shadow-sm'
              : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
              }`}
          >
            Disabled
          </button>
        </div>
      </div>
    </div>
  );
}
