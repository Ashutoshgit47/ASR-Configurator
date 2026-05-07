export interface ASRRule {
  guid: string;
  name: string;
  category: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  desc: string;
  example: string;
}

export type RuleState = 0 | 1 | 2; // 0=Disable, 1=Block, 2=Audit

export const ASR_RULES: ASRRule[] = [
  { guid: "56A863A9-875E-4185-98A7-B882C64B5CE5", name: "Block abuse of exploited vulnerable signed drivers", category: "System", risk: "LOW", desc: "Prevents malicious drivers from loading even if signed.", example: "Prevents kernel exploits using vulnerable drivers." },
  { guid: "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C", name: "Block Adobe Reader from creating child processes", category: "App", risk: "MEDIUM", desc: "Stops Adobe Reader from spawning other programs.", example: "Prevents malware using PDF as attack vector." },
  { guid: "D4F940AB-401B-4EFC-AADC-AD5F3C50688A", name: "Block all Office applications from creating child processes", category: "Office", risk: "HIGH", desc: "Prevents Word/Excel/PPT from launching other programs.", example: "Prevents macro-based malware execution." },
  { guid: "9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2", name: "Block credential stealing from LSASS", category: "Credential", risk: "LOW", desc: "Protects Windows authentication process from memory dumping.", example: "Blocks tools like Mimikatz." },
  { guid: "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550", name: "Block executable content from email client and webmail", category: "Email", risk: "LOW", desc: "Prevents running executables directly from email.", example: "Prevents email-based malware infections." },
  { guid: "01443614-CD74-433A-B99E-2ECDC07BFC25", name: "Block executable files unless they meet prevalence/age/trusted list", category: "App", risk: "CRITICAL", desc: "Only allows execution of reputable files.", example: "Zero-day malware prevention." },
  { guid: "5BEB7EFE-FD9A-4556-801D-275E5FFC04CC", name: "Block execution of potentially obfuscated scripts", category: "Script", risk: "MEDIUM", desc: "Detects and blocks scripts using obfuscation.", example: "Prevents disguised malware scripts." },
  { guid: "D3E037E1-3EB8-44C8-A917-57927947596D", name: "Block JavaScript/VBScript from launching downloaded executables", category: "Web", risk: "LOW", desc: "Prevents scripts from downloading and running programs.", example: "Blocks drive-by downloads." },
  { guid: "3B576869-A4EC-4529-8536-B80A7769E899", name: "Block Office applications from creating executable content", category: "Office", risk: "MEDIUM", desc: "Stops Office from creating .exe, .dll, or script files.", example: "Prevents malware creation via documents." },
  { guid: "75668C1F-73B5-4CF0-BB93-3ECF5F35C5F4", name: "Block Office apps from injecting code into other processes", category: "Office", risk: "MEDIUM", desc: "Prevents Office from modifying other running programs.", example: "Blocks process injection attacks." },
  { guid: "26190899-1602-49E8-8B27-EB1D0A1CE869", name: "Block Office communication apps from creating child processes", category: "Email", risk: "MEDIUM", desc: "Prevents Outlook from launching other programs.", example: "Prevents email-triggered malware." },
  { guid: "E6DB77E5-3DF2-4CF1-B95A-636979351E5B", name: "Block persistence through WMI event subscription", category: "System", risk: "LOW", desc: "Prevents malware from using WMI for persistence.", example: "Prevents long-term malware establishment." },
  { guid: "D1E49AAC-8F56-4280-B9BA-993A6D77406C", name: "Block process creations from PSExec and WMI commands", category: "Remote", risk: "MEDIUM", desc: "Blocks remote process execution tools.", example: "Prevents lateral movement in network." },
  { guid: "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0", name: "Block untrusted and unsigned processes from USB", category: "USB", risk: "LOW", desc: "Prevents unsigned programs from running off USB.", example: "Prevents USB-based malware spread." },
  { guid: "92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B", name: "Block Win32 API calls from Office macros", category: "Office", risk: "HIGH", desc: "Prevents Office macros from accessing Windows APIs.", example: "Blocks sophisticated macro-based attacks." },
  { guid: "C1DB55AB-C21A-4637-BB3F-A12568109D35", name: "Use advanced protection against ransomware", category: "Ransomware", risk: "LOW", desc: "Monitors and blocks ransomware-like behavior.", example: "Ransomware prevention." },
  { guid: "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65", name: "Block rebooting machine in Safe Mode", category: "System", risk: "LOW", desc: "Prevents attackers from forcing Safe Mode boot.", example: "Prevents Safe Mode bypass techniques." }
];

export type PresetName = 'disabled' | 'basic' | 'balanced' | 'strict' | 'developer';

export const PRESETS: Record<PresetName, Record<string, RuleState>> = {
  disabled: {},
  basic: {
    "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 2,
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 2,
    "D3E037E1-3EB8-44C8-A917-57927947596D": 2,
    "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 2,
    "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 2,
    "C1DB55AB-C21A-4637-BB3F-A12568109D35": 2,
    "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65": 2
  },
  balanced: {
    "56A863A9-875E-4185-98A7-B882C64B5CE5": 1,
    "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 1,
    "D4F940AB-401B-4EFC-AADC-AD5F3C50688A": 2,
    "9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2": 1,
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 1,
    "D3E037E1-3EB8-44C8-A917-57927947596D": 1,
    "3B576869-A4EC-4529-8536-B80A7769E899": 2,
    "26190899-1602-49E8-8B27-EB1D0A1CE869": 2,
    "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 1,
    "D1E49AAC-8F56-4280-B9BA-993A6D77406C": 1,
    "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 1,
    "C1DB55AB-C21A-4637-BB3F-A12568109D35": 1,
    "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65": 1
  },
  strict: {
    "56A863A9-875E-4185-98A7-B882C64B5CE5": 1,
    "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 1,
    "D4F940AB-401B-4EFC-AADC-AD5F3C50688A": 1,
    "9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2": 1,
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 1,
    "01443614-CD74-433A-B99E-2ECDC07BFC25": 2,
    "5BEB7EFE-FD9A-4556-801D-275E5FFC04CC": 1,
    "D3E037E1-3EB8-44C8-A917-57927947596D": 1,
    "3B576869-A4EC-4529-8536-B80A7769E899": 1,
    "75668C1F-73B5-4CF0-BB93-3ECF5F35C5F4": 1,
    "26190899-1602-49E8-8B27-EB1D0A1CE869": 1,
    "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 1,
    "D1E49AAC-8F56-4280-B9BA-993A6D77406C": 1,
    "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 1,
    "92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B": 2,
    "C1DB55AB-C21A-4637-BB3F-A12568109D35": 1,
    "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65": 1
  },
  developer: {
    "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 2,
    "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 2,
    "D3E037E1-3EB8-44C8-A917-57927947596D": 2,
    "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 2,
    "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 2,
    "C1DB55AB-C21A-4637-BB3F-A12568109D35": 2
  }
};

export const PRESET_OPTIONS: { value: PresetName | 'custom'; label: string }[] = [
  { value: 'disabled', label: 'Preset: Disabled (All Off)' },
  { value: 'basic', label: 'Preset: Basic Protection' },
  { value: 'balanced', label: 'Preset: Balanced (Recommended)' },
  { value: 'strict', label: 'Preset: Strict Protection' },
  { value: 'developer', label: 'Preset: Developer-Friendly' },
  { value: 'custom', label: 'Preset: Custom' },
];
