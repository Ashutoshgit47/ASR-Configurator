import { useState, useCallback, useMemo, useEffect } from 'react';
import { ASR_RULES, PRESETS, PresetName, RuleState } from '@/data/asrRules';

export type TabType = 'powershell' | 'gpo' | 'intune';

function getInitialParams() {
  if (typeof window === 'undefined') {
    return { preset: 'basic' as PresetName, rule: ASR_RULES[0].guid, tab: 'powershell' as TabType };
  }
  const params = new URLSearchParams(window.location.search);
  const p = params.get('preset') as PresetName | null;
  const validPreset: PresetName = (p && PRESETS[p]) ? p : 'basic';
  const r = params.get('rule');
  const matchedRule = r ? ASR_RULES.find(rule => rule.guid.toLowerCase() === r.toLowerCase()) : null;
  const initialRule = matchedRule ? matchedRule.guid : ASR_RULES[0].guid;
  const t = params.get('tab') as TabType | null;
  const validTab: TabType = (t === 'powershell' || t === 'gpo' || t === 'intune') ? t : 'powershell';
  return { preset: validPreset, rule: initialRule, tab: validTab };
}

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
  const initialParams = useMemo(() => getInitialParams(), []);

  const [currentRules, setCurrentRules] = useState<Record<string, RuleState>>(() => {
    const initial: Record<string, RuleState> = {};
    const defaultPresetRules = PRESETS[initialParams.preset] || PRESETS.basic;
    ASR_RULES.forEach(rule => {
      initial[rule.guid] = defaultPresetRules[rule.guid] || 0;
    });
    return initial;
  });

  const [selectedRule, setSelectedRuleState] = useState<string | null>(initialParams.rule);
  const [currentTab, setCurrentTabState] = useState<TabType>(initialParams.tab);
  const [preset, setPreset] = useState<PresetName | 'custom'>(initialParams.preset);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (selectedRule) {
      const rule = ASR_RULES.find(r => r.guid.toLowerCase() === selectedRule.toLowerCase());
      if (rule) {
        document.title = `${rule.name} - Microsoft Defender ASR Rule | ASR Configurator`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            `${rule.name} (GUID: ${rule.guid}). ${rule.desc} Risk: ${rule.risk}. Configure for PowerShell, Intune, and GPO in Block or Audit mode.`
          );
        }
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
          canonicalLink.setAttribute('href', `https://asrconfigurator.pages.dev/?rule=${rule.guid}`);
        }
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) {
          ogUrl.setAttribute('content', `https://asrconfigurator.pages.dev/?rule=${rule.guid}`);
        }
      }
    }
  }, [selectedRule]);

  const syncUrlParams = useCallback((p: string, r: string | null, t: TabType) => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    if (p && p !== 'custom') url.searchParams.set('preset', p);
    if (r) url.searchParams.set('rule', r);
    if (t) url.searchParams.set('tab', t);
    window.history.replaceState({}, '', url.toString());
  }, []);

  const setSelectedRule = useCallback((guid: string | null) => {
    setSelectedRuleState(guid);
    syncUrlParams(preset, guid, currentTab);
  }, [preset, currentTab, syncUrlParams]);

  const setCurrentTab = useCallback((tab: TabType) => {
    setCurrentTabState(tab);
    syncUrlParams(preset, selectedRule, tab);
  }, [preset, selectedRule, syncUrlParams]);

  const loadPreset = useCallback((presetName: PresetName) => {
    const presetRules = PRESETS[presetName];
    const newRules: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      newRules[rule.guid] = presetRules[rule.guid] || 0;
    });
    setCurrentRules(newRules);
    setPreset(presetName);
    syncUrlParams(presetName, selectedRule, currentTab);
  }, [selectedRule, currentTab, syncUrlParams]);

  const updateRuleState = useCallback((guid: string, state: RuleState) => {
    setCurrentRules(prev => {
      const next = { ...prev, [guid]: state };
      const newPreset = detectPreset(next);
      setPreset(newPreset);
      syncUrlParams(newPreset, guid, currentTab);
      return next;
    });
  }, [currentTab, syncUrlParams]);

  const setSelectedRulesState = useCallback((guids: string[], state: RuleState) => {
    setCurrentRules(prev => {
      const next = { ...prev };
      guids.forEach(g => { next[g] = state; });
      const newPreset = detectPreset(next);
      setPreset(newPreset);
      syncUrlParams(newPreset, selectedRule, currentTab);
      return next;
    });
  }, [selectedRule, currentTab, syncUrlParams]);

  const enableAllRules = useCallback((enable: boolean) => {
    const newRules: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      newRules[rule.guid] = enable ? 1 : 0;
    });
    setCurrentRules(newRules);
    const newPreset = detectPreset(newRules);
    setPreset(newPreset);
    syncUrlParams(newPreset, selectedRule, currentTab);
  }, [selectedRule, currentTab, syncUrlParams]);

  const clearConfig = useCallback(() => {
    const newRules: Record<string, RuleState> = {};
    ASR_RULES.forEach(rule => {
      newRules[rule.guid] = 0;
    });
    setCurrentRules(newRules);
    setPreset('disabled');
    syncUrlParams('disabled', selectedRule, currentTab);
  }, [selectedRule, currentTab, syncUrlParams]);

  const generatedCode = useMemo(() => {
    const activeGuids = Object.keys(currentRules).filter(g => currentRules[g] !== 0);

    if (activeGuids.length === 0) {
      return "# No rules enabled.";
    }

    if (currentTab === 'powershell') {
      const ids = activeGuids.map(g => `"${g}"`).join(',\n    ');
      const actions = activeGuids.map(g => currentRules[g]).join(', ');

      return `# Microsoft Defender Attack Surface Reduction (ASR) Configuration
# Generated by ASR Configurator (https://asrconfigurator.pages.dev)
# Run in an elevated PowerShell session (Run as Administrator)

$asrIds = @(
    ${ids}
)
$asrActions = @(${actions})

Set-MpPreference -AttackSurfaceReductionRules_Ids $asrIds -AttackSurfaceReductionRules_Actions $asrActions
Write-Host "Success: Configured $($asrIds.Count) ASR rules." -ForegroundColor Green`;

    } else if (currentTab === 'gpo') {
      let rulesReg = "";
      activeGuids.forEach(g => {
        rulesReg += `"${g}"="${currentRules[g]}"\n`;
      });

      return `Windows Registry Editor Version 5.00

; Microsoft Defender ASR Rules Configuration
; Save as .reg and import, or apply via Group Policy Preferences:
; Computer Configuration -> Policies -> Administrative Templates -> Windows Components -> Microsoft Defender Antivirus -> Attack Surface Reduction
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\ASR]
"ExploitGuard_ASR_Rules"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\ASR\\Rules]
${rulesReg}`;

    } else {
      const rulesList = activeGuids.map(g => ({
        ruleId: g,
        state: currentRules[g] === 1 ? "block" : "auditMode"
      }));

      const json = {
        displayName: "Microsoft Defender ASR Rules Policy",
        description: "Generated by ASR Configurator (https://asrconfigurator.pages.dev)",
        "@odata.type": "#microsoft.graph.windows10EndpointProtectionConfiguration",
        defenderAttackSurfaceReductionRules: rulesList,
        _omaUriConfiguration: {
          omaUri: "./Vendor/MSFT/Policy/Config/Defender/AttackSurfaceReductionRules",
          dataType: "String",
          value: activeGuids.map(g => `${g.toLowerCase()}=${currentRules[g]}`).join('\n')
        }
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
