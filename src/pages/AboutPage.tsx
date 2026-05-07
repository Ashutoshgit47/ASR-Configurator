import { Github, UserCircle, BookOpen, Shield, Laptop, GraduationCap, AlertTriangle } from 'lucide-react';

export default function AboutPage() {


  const audience = [
    { icon: UserCircle, title: "IT Administrators", desc: "Quickly deploy ASR configurations across enterprise environments" },
    { icon: Shield, title: "Security Professionals", desc: "Harden Windows endpoints against common attack vectors" },
    { icon: Laptop, title: "Home Users", desc: "Enhance personal computer security with guided presets" },
    { icon: GraduationCap, title: "Students & Learners", desc: "Understand ASR rules and their impact on system security" },
  ];

  const steps = [
    "Select a Preset: Start with a baseline configuration that matches your security needs",
    "Customize Rules: Fine-tune individual rules by setting them to Block, Audit, or Disabled",
    "Choose Export Format: Select PowerShell for single machines, Group Policy for domains, or Intune for cloud-managed devices",
    "Copy & Deploy: Copy the generated code and apply it using your preferred method"
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">About ASR Configurator</h1>

        {/* What is ASR Configurator */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            <Shield className="w-5 h-5" />
            What is ASR Configurator?
          </h3>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            ASR Configurator is a powerful, user-friendly tool designed to help IT administrators, security
            professionals, and Windows users configure Microsoft Defender's Attack Surface Reduction (ASR)
            rules with ease.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The tool simplifies the complex process of managing ASR rules by providing an intuitive visual
            interface, preset configurations, and export options for multiple deployment methods.
          </p>
        </div>



        {/* Who Is This For */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            🎯 Who Is This Tool For?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {audience.map((item, i) => (
              <div key={i} className="bg-secondary/50 border border-border rounded-lg p-4 text-center hover:bg-secondary/80 hover:shadow-sm transition-all">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <strong className="block mb-1 text-foreground">{item.title}</strong>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            ⚙️ How It Works
          </h3>
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground border-b border-border pb-3 last:border-0">
                <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span><strong className="text-foreground">{step.split(':')[0]}:</strong>{step.split(':')[1]}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-600 dark:text-amber-500">
            <AlertTriangle className="w-5 h-5" />
            Important Disclaimer
          </h3>
          <p className="text-muted-foreground mb-3">
            This tool is provided for <strong className="text-foreground">educational and informational purposes only</strong>. Before
            deploying ASR rules in a production environment:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside ml-4">
            <li>Always test rules in <strong className="text-foreground">Audit mode</strong> first to identify potential compatibility issues</li>
            <li>Review Microsoft's official documentation for the latest updates on ASR rules</li>
            <li>Ensure you have proper backups and recovery procedures in place</li>
            <li>No responsibility is accepted for system issues caused by improper configuration</li>
          </ul>
        </div>

        {/* Developer */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            <BookOpen className="w-5 h-5" />
            Developer
          </h3>
          <div className="text-center">
            <p className="font-bold text-lg">Ashutosh Gautam</p>
            <p className="text-muted-foreground mb-4">Cybersecurity Enthusiast & Developer</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a
                href="https://github.com/Ashutoshgit47"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-md hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Support This Project */}
        <div className="bg-card border border-border rounded-lg p-6 mt-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
            ❤️ Support This Project
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            If you find ASR Configurator helpful, consider supporting the developer! Your support helps keep this tool free and maintained.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a href="https://buymeachai.ezee.li/ashutosh47" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="https://buymeachai.ezee.li/assets/images/buymeachai-button.png" alt="Buy Me A Chai" className="rounded-md hover:opacity-90 transition-opacity h-10 w-auto" />
            </a>
            <a href="https://ko-fi.com/Y8Y11V9RQ2" target="_blank" rel="noopener noreferrer" className="inline-block">
              <img src="https://storage.ko-fi.com/cdn/kofi3.png?v=6" alt="Buy Me a Coffee at ko-fi.com" className="hover:opacity-90 transition-opacity h-10 w-auto" />
            </a>
          </div>
        </div>

        {/* Microsoft Documentation Link */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <a
            href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Official Microsoft ASR Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
