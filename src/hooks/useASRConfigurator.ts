import { useState, useCallback, useMemo } from 'react';
import { ASR_RULES, PRESETS, PresetName, RuleState } from '@/data/asrRules';

export type TabType = 'powershell' | 'gpo' | 'intune';

function detectPreset(rules: Record<string, RuleState>): PresetName | 'custom' {
  const presetNames: PresetName[] = ['disabled', 'basic', 'balanced', 'strict', 'developer'];
  for (const name of presetNames) {
    const presetRules = PRESETS[name];
    const matches = ASR_RULES.every(rule => {
      const current = rules[rule.guid] || 0;
      const expected = presetRules[rule.guid] || 0;
      return current === expected;
    });
    if (matches) return name;
  }
  return 'custom';
}

export function useASRConfigurator() {
  const [currentRules, setCurrentRules] = useState<Record<string, RuleState>>(() => {
    // Initialize with basic preset
    const initial: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      initial[rule.guid] = PRESETS.basic[rule.guid] || 0;
    });
    return initial;
  });

  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<TabType>('powershell');
  const [preset, setPreset] = useState<PresetName | 'custom'>('basic');

  const loadPreset = useCallback((presetName: PresetName) => {
    const presetRules = PRESETS[presetName];
    const newRules: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      newRules[rule.guid] = presetRules[rule.guid] || 0;
    });
    setCurrentRules(newRules);
    setPreset(presetName);
  }, []);

  const updateRuleState = useCallback((guid: string, state: RuleState) => {
    setCurrentRules(prev => {
      const next = { ...prev, [guid]: state };
      setPreset(detectPreset(next));
      return next;
    });
  }, []);

  const setSelectedRulesState = useCallback((guids: string[], state: RuleState) => {
    setCurrentRules(prev => {
      const next = { ...prev };
      guids.forEach(g => { next[g] = state; });
      setPreset(detectPreset(next));
      return next;
    });
  }, []);

  const enableAllRules = useCallback((enable: boolean) => {
    const newRules: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      newRules[rule.guid] = enable ? 1 : 0;
    });
    setCurrentRules(newRules);
    setPreset(enable ? 'strict' : 'disabled');
  }, []);

  const clearConfig = useCallback(() => {
    const newRules: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      newRules[rule.guid] = 0;
    });
    setCurrentRules(newRules);
    setPreset('disabled');
  }, []);

  const generatedCode = useMemo(() => {
    const activeGuids = Object.keys(currentRules).filter(g => currentRules[g] !== 0);

    if (activeGuids.length === 0) {
      return "# No rules enabled.";
    }

    if (currentTab === 'powershell') {
      const ids = activeGuids.map(g => `"${g}"`).join(',\n    ');
      const actions = activeGuids.map(g => currentRules[g]).join(', ');

      return `# ASR Rules Configuration - PowerShell
$asrIds = @(
    ${ids}
)
$asrActions = @(${actions})

Set-MpPreference -AttackSurfaceReductionRules_Ids $asrIds -AttackSurfaceReductionRules_Actions $asrActions
Write-Host "ASR Rules Applied" -ForegroundColor Green`;

    } else if (currentTab === 'gpo') {
      let rulesReg = "";
      activeGuids.forEach(g => {
        rulesReg += `"${g}"="${currentRules[g]}"\n`;
      });

      return `Windows Registry Editor Version 5.00

; ASR Rules
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\ASR\\Rules]
${rulesReg}`;

    } else {
      const rulesList = activeGuids.map(g => ({
        id: g,
        state: currentRules[g] === 1 ? "block" : "audit"
      }));

      const json = {
        displayName: "ASR Configuration",
        "@odata.type": "#microsoft.graph.windows10EndpointProtectionConfiguration",
        defenderAttackSurfaceReductionRulesList: rulesList
      };

      return JSON.stringify(json, null, 2);
    }
  }, [currentRules, currentTab]);

  const allEnabled = useMemo(() => {
    return ASR_RULES.every(rule => currentRules[rule.guid] === 1);
  }, [currentRules]);

  const enabledCount = useMemo(() => {
    return ASR_RULES.filter(rule => currentRules[rule.guid] !== 0).length;
  }, [currentRules]);

  return {
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
  };
}
