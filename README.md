# 🛡️ ASR Configurator

A modern, interactive web tool to inspect, configure, and export Microsoft Defender Attack Surface Reduction (ASR) rules with confidence.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-asrconfigurator.pages.dev-emerald?style=for-the-badge&logo=cloudflare)](https://asrconfigurator.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Ashutoshgit47/ASR-Configurator/pulls)

---

## ✨ Features

- **All 19 Official Microsoft Defender Rules** — Complete catalog up to date with Microsoft Learn specifications (including rule #19 *Block use of copied or impersonated system tools* and the standard USB GUID).
- **Security Baseline Presets**:
  - `Disabled (All Off)` — Reset all rules to disabled state.
  - `Basic Protection` — Low-risk rules safe for general business environments.
  - `Balanced (Recommended)` — Strong protection against ransomware, LSASS credential theft, and macros with low false positives.
  - `Strict Protection` — High-security baseline for sensitive workloads.
  - `Developer-Friendly` — Tailored baseline that avoids blocking legitimate developer tools and compilers.
- **Granular Per-Rule Enforcement** — Switch each rule individually between:
  - 🛡️ **Block (`1`)** — Block offending processes and log Event ID `1121`.
  - 👁️ **Audit (`2`)** — Allow execution while generating Event ID `1122` for telemetry and testing.
  - ⚪ **Disabled (`0`)** — Rule is inactive.
- **Multi-Format Export**:
  - **PowerShell** — Ready-to-run elevated `Set-MpPreference` script with error handling and status query.
  - **Group Policy (GPO)** — `.reg` file with master switch `ExploitGuard_ASR_Rules=dword:00000001` and `Windows Defender Exploit Guard\ASR\Rules` keys.
  - **Microsoft Intune** — Validated Settings Catalog JSON payload (`defenderAttackSurfaceReductionRules` with `ruleId`) and OMA-URI policy string.
- **Security & Privacy First** — 100% client-side application. No servers, no telemetry, no tracking cookies.
- **Responsive & Accessible** — Dark/Light themes, full keyboard navigation, and mobile-friendly layouts.

---

## 📋 Microsoft Defender ASR Rules Catalog (19 Rules)

| # | Rule Name | Category | Risk | GUID |
|---|---|---|---|---|
| 1 | Block abuse of exploited vulnerable signed drivers | System | Low | `56A863A9-875E-4185-98A7-B882C64B5CE5` |
| 2 | Block Adobe Reader from creating child processes | App | Medium | `7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C` |
| 3 | Block all Office applications from creating child processes | Office | High | `D4F940AB-401B-4EFC-AADC-AD5F3C50688A` |
| 4 | Block credential stealing from the Windows local security authority subsystem (lsass.exe) | Credential | Low | `9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2` |
| 5 | Block executable content from email client and webmail | Email | Low | `BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550` |
| 6 | Block executable files from running unless they meet a prevalence, age, or trusted list criterion | App | High | `01443614-cd74-433a-b99e-2ecdc07bfc25` |
| 7 | Block execution of potentially obfuscated scripts | Script | Medium | `5BEB8E28-82E8-438B-B3CB-CF2A24A8D3A8` |
| 8 | Block JavaScript or VBScript from launching downloaded executable content | Script | Low | `D3E037E1-3EB8-44C8-A917-57927947596D` |
| 9 | Block Office applications from creating executable content | Office | Low | `3B576C7A-47EA-41A2-9883-516FD60F770E` |
| 10 | Block Office applications from injecting code into other processes | Office | Low | `75668C1F-73B5-4CF0-BB93-3ECF5CB7CC84` |
| 11 | Block Office communication application from creating child processes | Office | Low | `26190899-1602-49e8-8b27-eb1d0a1ce869` |
| 12 | Block persistence through WMI event subscription | System | Low | `e6db77e5-3df2-4cf1-b95a-636979351e5b` |
| 13 | Block process creations originating from PSExec and WMI commands | Remote | Low | `d1e49aac-8f56-4280-b9ba-993a6d77406c` |
| 14 | Block untrusted and unsigned processes that run from USB | USB | Medium | `b2b3f03d-6a65-4f7b-a9c7-1c7ef74a9ba4` |
| 15 | Block Win32 API calls from Office macros | Office | High | `92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B` |
| 16 | Use advanced protection against ransomware | Ransomware | Low | `c1db55ab-c21a-4637-bb3f-a12568109d35` |
| 17 | Block rebooting machine in Safe Mode | System | Medium | `33ddedf1-c6e0-47cb-833e-de6133960387` |
| 18 | Block Webshell creation for Servers | Server | Low | `a8f5898e-1dc8-49a9-9878-85004b8a61e6` |
| 19 | Block use of copied or impersonated system tools | System | Low | `c0033c00-d16d-4114-a5a0-dc9b3a7d2ceb` |

---

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5.4
- **Styling**: Tailwind CSS & Vanilla CSS Design System
- **Components**: Radix UI Primitives & Lucide Icons
- **Deployment**: Cloudflare Pages

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested on Node 20 & 24)
- npm 9+

### Installation & Local Run

```bash
# Clone the repository
git clone https://github.com/Ashutoshgit47/ASR-Configurator.git

# Enter project directory
cd ASR-Configurator

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:8080` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Deployment Guides

### 1. PowerShell Deployment
1. Select your desired preset or customize rule states.
2. Select **PowerShell** tab in the bottom code drawer.
3. Click **Copy** and paste into an elevated Administrator PowerShell console.
4. Verify active rules:
   ```powershell
   Get-MpPreference | Select-Object -ExpandProperty AttackSurfaceReductionRules_Ids
   ```

### 2. Group Policy (GPO) Deployment
1. Select the **Group Policy** tab and copy the generated `.reg` contents.
2. Save as `ASR-Config.reg` and import via:
   `Computer Configuration → Administrative Templates → Windows Components → Microsoft Defender Antivirus → Microsoft Defender Exploit Guard → Attack Surface Reduction`.
3. The generated script includes the essential `ExploitGuard_ASR_Rules=dword:00000001` master activation key.

### 3. Microsoft Intune Deployment
1. Select the **Intune** tab and copy the Settings Catalog JSON or OMA-URI payload.
2. In Microsoft Intune admin center:
   `Endpoint security → Attack surface reduction → Create Policy → Windows 10 and later → Attack Surface Reduction rules`.

---

## ⚠️ Disclaimer

This tool is for educational and configuration assistance purposes only.
Always test Attack Surface Reduction rules in **Audit mode** before enforcing **Block mode** in enterprise production environments.

The author and contributors accept no responsibility for system instability, software incompatibility, or operational downtime caused by improper ASR deployment.

---

## 🤝 Contributing

Contributions, feedback, and issue reports are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## ☕ Support the Project

If ASR Configurator saved you time or hardened your infrastructure, consider supporting ongoing maintenance:

<a href="https://buymeachai.ezee.li/ashutosh47"><img src="https://buymeachai.ezee.li/assets/images/buymeachai-button.png" alt="Buy Me A Chai" height="38"></a>&nbsp;&nbsp;
<a href="https://ko-fi.com/Y8Y11V9RQ2"><img src="https://storage.ko-fi.com/cdn/kofi3.png?v=6" alt="Buy Me A Coffee" height="38"></a>


---

## 📚 Official Microsoft Documentation

- [Overview of Attack Surface Reduction](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction)
- [Attack Surface Reduction Rules Reference](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference)
- [Enable Attack Surface Reduction Rules](https://learn.microsoft.com/en-us/defender-endpoint/enable-attack-surface-reduction)
- [ASR Rules Deployment Guide](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-deployment)

---

## 📄 License

Distributed under the [MIT License](LICENSE).

---

## 👤 Author

**Ashutosh Gautam** — Cybersecurity Researcher & Developer  
*Building tools. Solving problems. Securing systems.*

- 🌐 [Website](https://ashutosh47.pages.dev/)
- 💻 [GitHub](https://github.com/Ashutoshgit47)
