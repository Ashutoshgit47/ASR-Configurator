import { useState, useMemo } from 'react';
import { Menu, X, Shield, Eye, Ban, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useASRConfigurator } from '@/hooks/useASRConfigurator';
import { ASR_RULES, PRESET_OPTIONS, PresetName } from '@/data/asrRules';
import { RuleDetailPanel } from '@/components/RuleDetailPanel';
import { CodePanel } from '@/components/CodePanel';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { useToast } from '@/hooks/use-toast';

type DialogType = 'enableAll' | 'disableAll' | 'clearConfig' | 'bulkBlock' | 'bulkAudit' | 'bulkDisable' | null;

export default function ConfiguratorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const { toast } = useToast();
  const {
    currentRules,
    selectedRule,
    setSelectedRule,
    currentTab,
    setCurrentTab,
    preset,
    loadPreset,
    updateRuleState,
    setSelectedRulesState,
    enableAllRules,
    clearConfig,
    generatedCode,
    allEnabled,
    enabledCount,
  } = useASRConfigurator();

  const categories = useMemo(() => {
    return ['ALL', ...Array.from(new Set(ASR_RULES.map(r => r.category)))];
  }, []);

  const filteredRules = useMemo(() => {
    return ASR_RULES.filter(rule => {
      const matchesCategory = selectedCategory === 'ALL' || rule.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        rule.name.toLowerCase().includes(q) ||
        rule.desc.toLowerCase().includes(q) ||
        rule.guid.toLowerCase().includes(q) ||
        rule.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleEnableAllChange = (checked: boolean) => {
    if (checked) {
      setDialogType('enableAll');
    } else {
      setDialogType('disableAll');
    }
  };

  const handleConfirmEnableAll = () => {
    enableAllRules(true);
    setDialogType(null);
  };

  const handleConfirmDisableAll = () => {
    enableAllRules(false);
    setDialogType(null);
  };

  const handleConfirmClear = () => {
    clearConfig();
    setDialogType(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      toast({
        title: "Copied!",
        description: "Configuration copied to clipboard",
      });
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generatedCode;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      toast({
        title: "Copied!",
        description: "Configuration copied to clipboard",
      });
    }
  };

  const handleSelectRule = (guid: string) => {
    setSelectedRule(guid);
    setSidebarOpen(false);
  };

  // Get all enabled rule GUIDs for bulk actions
  const enabledGuids = ASR_RULES
    .filter(rule => currentRules[rule.guid] !== 0)
    .map(rule => rule.guid);

  const handleBulkBlock = () => setDialogType('bulkBlock');
  const handleBulkAudit = () => setDialogType('bulkAudit');
  const handleBulkDisable = () => setDialogType('bulkDisable');

  const handleConfirmBulkBlock = () => {
    setSelectedRulesState(enabledGuids, 1);
    setDialogType(null);
    toast({ title: "Bulk Action", description: `${enabledGuids.length} rules set to Block` });
  };

  const handleConfirmBulkAudit = () => {
    setSelectedRulesState(enabledGuids, 2);
    setDialogType(null);
    toast({ title: "Bulk Action", description: `${enabledGuids.length} rules set to Audit` });
  };

  const handleConfirmBulkDisable = () => {
    setSelectedRulesState(enabledGuids, 0);
    setDialogType(null);
    toast({ title: "Bulk Action", description: `${enabledGuids.length} rules disabled` });
  };

  const handlePresetChange = (v: string) => {
    if (v !== 'custom') {
      loadPreset(v as PresetName);
    }
  };

  const getRiskClass = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-emerald-500';
      case 'MEDIUM': return 'text-blue-500';
      case 'HIGH': return 'text-orange-500';
      case 'CRITICAL': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskDotClass = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-emerald-500';
      case 'MEDIUM': return 'bg-blue-500';
      case 'HIGH': return 'bg-orange-500';
      case 'CRITICAL': return 'bg-red-600';
      default: return 'bg-muted';
    }
  };

  const getModeBadge = (state: number) => {
    if (state === 1) return <span className="text-[9px] px-1.5 py-0.5 rounded bg-destructive text-destructive-foreground font-bold uppercase">Block</span>;
    if (state === 2) return <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-white font-bold uppercase">Audit</span>;
    return null;
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={dialogType === 'enableAll'}
        onOpenChange={(open) => !open && setDialogType(null)}
        title="Enable All Rules?"
        description={
          <div className="space-y-2" style={{ overflowWrap: 'anywhere' }}>
            <p>This will enable all {ASR_RULES.length} ASR rules and set them to <strong className="text-primary">Block (value: 1)</strong>.</p>
            <div className="bg-muted/50 rounded p-2 text-xs space-y-1">
              <p>• Enabled rules actively protect your system against common attack vectors</p>
              <p>• Consider testing in <strong>Audit mode (2)</strong> first to avoid breaking apps</p>
            </div>
            <p className="text-xs">💡 <strong>PowerShell:</strong> Single machines | <strong>GPO:</strong> Domain devices | <strong>Intune:</strong> Cloud/M365</p>
          </div>
        }
        confirmText="Enable All"
        cancelText="Cancel"
        onConfirm={handleConfirmEnableAll}
      />

      <ConfirmDialog
        open={dialogType === 'disableAll'}
        onOpenChange={(open) => !open && setDialogType(null)}
        title="Disable All Rules?"
        description={
          <div className="space-y-2" style={{ overflowWrap: 'anywhere' }}>
            <p>This will set all {ASR_RULES.length} ASR rules to <strong>Disabled (value: 0)</strong>.</p>
            <div className="bg-muted/50 rounded p-2 text-xs space-y-1">
              <p>• <code className="bg-muted px-1 rounded">0 = Disabled</code> — No blocking, no logging occurs</p>
              <p>• Your system will have <strong className="text-red-500">reduced protection</strong> against common attack vectors</p>
            </div>
            <p className="text-xs">💡 Consider using <strong>Audit mode (2)</strong> instead to keep monitoring without blocking.</p>
          </div>
        }
        confirmText="Disable All"
        cancelText="Cancel"
        onConfirm={handleConfirmDisableAll}
        variant="destructive"
      />

      <ConfirmDialog
        open={dialogType === 'clearConfig'}
        onOpenChange={(open) => !open && setDialogType(null)}
        title="Clear Configuration?"
        description="This will reset all rules to disabled. You will lose your current configuration."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={handleConfirmClear}
        variant="destructive"
      />

      <ConfirmDialog
        open={dialogType === 'bulkBlock'}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={`Block ${enabledGuids.length} Selected Rules?`}
        description={
          <div className="space-y-2" style={{ overflowWrap: 'anywhere' }}>
            <p>This will set {enabledGuids.length} checked rules to <strong className="text-red-500">Block mode</strong>.</p>
            <div className="bg-muted/50 rounded p-2 text-xs space-y-1">
              <p>• <code className="bg-muted px-1 rounded">1 = Block</code> — Matching behavior is actively stopped</p>
              <p>• Events are logged under <strong>Event ID 1121</strong> in Windows Defender logs</p>
              <p>• May cause false positives — test with Audit (2) first if unsure</p>
            </div>
          </div>
        }
        confirmText="Block Selected"
        cancelText="Cancel"
        onConfirm={handleConfirmBulkBlock}
        variant="destructive"
      />

      <ConfirmDialog
        open={dialogType === 'bulkAudit'}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={`Audit ${enabledGuids.length} Selected Rules?`}
        description={
          <div className="space-y-2" style={{ overflowWrap: 'anywhere' }}>
            <p>This will set {enabledGuids.length} checked rules to <strong className="text-amber-500">Audit mode</strong>.</p>
            <div className="bg-muted/50 rounded p-2 text-xs space-y-1">
              <p>• <code className="bg-muted px-1 rounded">2 = Audit</code> — Actions are allowed but logged for review</p>
              <p>• Events are logged under <strong>Event ID 1122</strong> in Windows Defender logs</p>
              <p>• <strong className="text-emerald-500">Recommended first step</strong> before enabling Block mode</p>
            </div>
          </div>
        }
        confirmText="Audit Selected"
        cancelText="Cancel"
        onConfirm={handleConfirmBulkAudit}
      />

      <ConfirmDialog
        open={dialogType === 'bulkDisable'}
        onOpenChange={(open) => !open && setDialogType(null)}
        title={`Disable ${enabledGuids.length} Selected Rules?`}
        description={
          <div className="space-y-2" style={{ overflowWrap: 'anywhere' }}>
            <p>This will set {enabledGuids.length} checked rules to <strong>Disabled</strong>.</p>
            <div className="bg-muted/50 rounded p-2 text-xs space-y-1">
              <p>• <code className="bg-muted px-1 rounded">0 = Disabled</code> — No blocking, no logging</p>
              <p>• These rules will be <strong>removed from the generated script</strong></p>
            </div>
          </div>
        }
        confirmText="Disable Selected"
        cancelText="Cancel"
        onConfirm={handleConfirmBulkDisable}
        variant="destructive"
      />

      {/* Mobile Top Controls Bar */}
      <div className="md:hidden flex items-center justify-between px-3 py-2 bg-card border-b border-border text-xs z-30">
        <Button
          onClick={() => setSidebarOpen(true)}
          variant="outline"
          size="sm"
          className="flex items-center gap-1.5 h-8 text-xs font-semibold min-h-[36px]"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
          <span>Rules ({ASR_RULES.length})</span>
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-muted-foreground uppercase bg-secondary px-2 py-0.5 rounded">
            {preset}
          </span>
          <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {enabledCount}/{ASR_RULES.length} on
          </span>
        </div>
      </div>

      {/* Overlay for mobile drawer */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-background/80 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:relative z-50 md:z-auto
            top-16 md:top-0 left-0
            w-80 max-w-[85vw] md:w-76 lg:w-80
            h-[calc(100dvh-4rem)] md:h-auto
            bg-card border-r border-border
            flex flex-col shadow-xl md:shadow-none
            transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          {/* Preset Selector */}
          <div className="p-3 border-b border-border bg-card">
            <div className="flex items-center justify-between gap-2 mb-2 md:hidden">
              <span className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Configure Rules</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="w-7 h-7 text-muted-foreground hover:text-foreground"
                aria-label="Close rules menu"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Select value={preset} onValueChange={handlePresetChange}>
              <SelectTrigger className="w-full text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-[100]">
                {PRESET_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-xs"
                    disabled={option.value === 'custom'}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search & Category Filter */}
          <div className="p-2.5 border-b border-border bg-card/60 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search rules, GUIDs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/60 text-xs pl-8 pr-7 py-1.5 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {/* Category filter pills */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[10px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-full font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Enable All + Bulk Actions */}
          <div className="px-3 py-2 border-b border-border bg-secondary/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="enable-all"
                  checked={allEnabled}
                  onCheckedChange={handleEnableAllChange}
                  className="w-4 h-4"
                />
                <label htmlFor="enable-all" className="cursor-pointer font-medium text-xs">
                  Enable All Rules
                </label>
              </div>
              <span className="text-[10px] text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                {enabledCount}/{ASR_RULES.length} active
              </span>
            </div>

            {/* Bulk Action Buttons */}
            {enabledCount > 0 && (
              <div className="flex gap-1 pt-0.5">
                <button
                  onClick={handleBulkBlock}
                  className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] font-semibold rounded bg-red-600 text-white hover:bg-red-700 transition-colors min-h-[28px]"
                >
                  <Shield className="w-2.5 h-2.5" />
                  Block
                </button>
                <button
                  onClick={handleBulkAudit}
                  className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] font-semibold rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors min-h-[28px]"
                >
                  <Eye className="w-2.5 h-2.5" />
                  Audit
                </button>
                <button
                  onClick={handleBulkDisable}
                  className="flex-1 flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] font-semibold rounded bg-zinc-600 text-white hover:bg-zinc-700 transition-colors min-h-[28px]"
                >
                  <Ban className="w-2.5 h-2.5" />
                  Off
                </button>
              </div>
            )}
          </div>

          {/* Rules List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredRules.length === 0 ? (
              <div className="p-4 text-center text-xs text-muted-foreground">
                No rules match &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredRules.map((rule) => {
                const ruleState = currentRules[rule.guid];
                const isRuleEnabled = ruleState !== 0;

                return (
                  <div
                    key={rule.guid}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectRule(rule.guid)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectRule(rule.guid); }}
                    className={`
                      w-full text-left p-2.5 rounded-md transition-colors border cursor-pointer
                      ${selectedRule === rule.guid
                        ? 'bg-primary/10 border-primary shadow-sm'
                        : 'bg-card border-transparent hover:bg-secondary/70'
                      }
                    `}
                  >
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={isRuleEnabled}
                        onCheckedChange={(checked) => updateRuleState(rule.guid, checked ? 1 : 0)}
                        className="mt-1 z-10"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Toggle rule ${rule.name}`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1.5 mb-1">
                          <span className="font-semibold text-xs leading-tight line-clamp-2">{rule.name}</span>
                          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                            {getModeBadge(ruleState)}
                            <span className={`w-2.5 h-2.5 rounded-full ${getRiskDotClass(rule.risk)}`} />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <span className={`font-semibold ${getRiskClass(rule.risk)}`}>{rule.risk}</span>
                          <span>•</span>
                          <span>{rule.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 lg:p-8 bg-background min-h-0">
            <RuleDetailPanel
              selectedRule={selectedRule}
              currentRules={currentRules}
              updateRuleState={updateRuleState}
              onOpenSidebar={() => setSidebarOpen(true)}
            />
          </div>

          {/* Code Panel */}
          <CodePanel
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            generatedCode={generatedCode}
            onClear={() => setDialogType('clearConfig')}
            onCopy={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
