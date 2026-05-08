# 🛡️ ASR Configurator

A modern, interactive web tool to help you understand, configure, and deploy Microsoft Defender Attack Surface Reduction (ASR) rules with confidence.

🌐 **Live Demo:** https://ashutoshgit47.github.io/ASR-Configurator ,
https://asrconfigurator.pages.dev

---

## ✨ Features

- **Full ASR Rule Coverage** — Browse and configure all major Microsoft Defender ASR rules with clear explanations and examples
- **Security Presets** — Start quickly with predefined postures:
  - Disabled (All Off)
  - Basic Protection
  - Balanced (Recommended)
  - Strict Protection
  - Developer-Friendly
- **Per-Rule Control** — Switch each rule between Block, Audit, or Disabled
- **Instant Code Generation** — Export ready-to-use configuration in:
  - PowerShell (local machines)
  - Group Policy (GPO)
  - Microsoft Intune (JSON)
- **One-Click Copy** — Copy generated config directly to clipboard
- **Responsive UI** — Works on desktop, tablet, and mobile
- **Light & Dark Mode** — Theme preference saved locally

---

## 🧠 Why ASR Matters

Attack Surface Reduction rules help prevent:

- Macro-based malware
- Credential theft
- Ransomware behavior
- Script-based attacks
- Living-off-the-land techniques (LOLBins)

Misconfiguration can break applications — this tool emphasizes education first, audit before block, and safe defaults.

---

## 🛠️ Tech Stack

- **React** with TypeScript
- **Vite** — fast build and development
- **Tailwind CSS** — styling
- **shadcn/ui** — UI components
- Fully client-side — no backend, no tracking, no data collection

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Ashutoshgit47/ASR-Configurator.git

# Navigate to the project directory
cd ASR-Configurator

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Usage

1. **Select a Preset** — Choose from Basic, Balanced, Strict, or Developer-Friendly
2. **Customize Rules** — Toggle individual ASR rules between Block, Audit, or Disabled
3. **Export Configuration** — Pick PowerShell, Group Policy, or Intune format and copy the code
4. **Apply Carefully** — Always test in Audit mode before enabling Block in production

---

## 🔒 Security & Privacy

- Fully client-side
- No tracking, analytics, or cookies
- No data is sent to any server
- All configuration is generated locally in your browser

---

## ⚠️ Disclaimer

This tool is for educational and configuration assistance purposes only.
Always test ASR rules in Audit mode before deploying them in production environments.

The author is not responsible for any system instability, application breakage, or data loss caused by improper ASR configuration.

---

## 🤝 Contributing & Support

If you find ASR Configurator useful:

- ⭐ **Star this repository** — It helps others discover this tool
- 🐛 **[Report bugs](https://github.com/Ashutoshgit47/ASR-Configurator/issues)** — Found something broken? Let us know
- 💡 **[Suggest features](https://github.com/Ashutoshgit47/ASR-Configurator/issues)** — Have an idea? Open an issue
- 🔀 **Submit a PR** — Fork, improve, and submit a pull request
- 🔁 **Share** — Know someone interested in Windows security? Spread the word!

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ☕ Support the Project

If this tool saved you time or helped secure your systems, consider supporting the project — it keeps things alive and motivates future updates!

<a href="https://buymeachai.ezee.li/ashutosh47"><img src="https://buymeachai.ezee.li/assets/images/buymeachai-button.png" alt="Buy Me A Chai" height="36"></a>&nbsp;&nbsp;<a href="https://ko-fi.com/Y8Y11V9RQ2"><img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Buy Me A Coffee" height="36"></a>

---

## 📚 Resources

- [Microsoft ASR Overview](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction)
- [ASR Rules Reference](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference)
- [Enable ASR Rules](https://learn.microsoft.com/en-us/defender-endpoint/enable-attack-surface-reduction)
- [ASR Deployment Guide](https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-deployment)

---

## 📄 License

MIT

---

## 👤 Author

**Ashutosh Gautam** — Cybersecurity Enthusiast & Developer

- [GitHub](https://github.com/Ashutoshgit47)
- [Portfolio](https://ashutosh47.pages.dev)
