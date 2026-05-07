import { ASR_RULES } from '@/data/asrRules';
import { ExternalLink } from 'lucide-react';

export default function WhyASRPage() {
  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-emerald-500 text-white';
      case 'MEDIUM': return 'bg-blue-500 text-white';
      case 'HIGH': return 'bg-orange-500 text-white';
      case 'CRITICAL': return 'bg-red-600 text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Why ASR Matters</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Understanding Attack Surface Reduction and its role in modern cybersecurity.
        </p>

        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            What is Attack Surface Reduction?
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Attack surfaces are all the places where your organization is vulnerable to cyber threats and
            attacks. Attack Surface Reduction (ASR) rules target software behaviors that are often abused
            by attackers, such as:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Launching executable files and scripts that attempt to download or run files</li>
            <li>Running obfuscated or otherwise suspicious scripts</li>
            <li>Performing behaviors that apps don't usually initiate during normal day-to-day work</li>
          </ul>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            ASR rules are part of <strong className="text-foreground">Microsoft Defender for Endpoint</strong> and
            are available on Windows 10 (version 1709+), Windows 11, and Windows Server 2016+. They
            work by restricting specific behaviors that malware commonly exploits, significantly reducing
            the attack surface without requiring third-party tools.
          </p>
        </div>

        {/* ASR Action Values */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Understanding ASR Action Values
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Each ASR rule can be set to a numeric action value that determines its behavior.
            These values are used in PowerShell scripts, Group Policy, and Intune configurations:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="p-3 text-left font-semibold border-b border-border w-20">Value</th>
                  <th className="p-3 text-left font-semibold border-b border-border w-32">Mode</th>
                  <th className="p-3 text-left font-semibold border-b border-border">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3">
                    <code className="px-2 py-0.5 bg-muted rounded text-foreground font-mono font-bold">0</code>
                  </td>
                  <td className="p-3 font-medium text-muted-foreground">Disabled</td>
                  <td className="p-3 text-muted-foreground">The ASR rule is turned off. No actions are blocked or logged.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">
                    <code className="px-2 py-0.5 bg-destructive/20 rounded text-destructive font-mono font-bold">1</code>
                  </td>
                  <td className="p-3 font-medium text-destructive">Block</td>
                  <td className="p-3 text-muted-foreground">The ASR rule is active. Matching behavior is blocked and an event is logged.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">
                    <code className="px-2 py-0.5 bg-chart-4/20 rounded text-chart-4 font-mono font-bold">2</code>
                  </td>
                  <td className="p-3 font-medium text-chart-4">Audit</td>
                  <td className="p-3 text-muted-foreground">The ASR rule monitors only. The action is allowed but an event is logged. Use this to test rules before enforcing.</td>
                </tr>
                <tr>
                  <td className="p-3">
                    <code className="px-2 py-0.5 bg-orange-500/20 rounded text-orange-500 font-mono font-bold">6</code>
                  </td>
                  <td className="p-3 font-medium text-orange-500">Warn</td>
                  <td className="p-3 text-muted-foreground">The ASR rule shows a warning dialog to the user, who can choose to bypass the block. Available for select rules only.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
            <p className="text-xs text-muted-foreground" style={{ overflowWrap: 'anywhere' }}>
              <strong className="text-foreground">💡 Tip from Microsoft:</strong> Microsoft recommends
              enabling ASR rules in <strong className="text-foreground">Audit mode (2)</strong> first
              to see how they affect your organization before switching to <strong className="text-foreground">Block mode (1)</strong>.
              Audit events can be reviewed in the Windows Event Viewer under{' '}
              <code className="px-1 py-0.5 bg-muted rounded text-xs">Applications and Services Logs &gt; Microsoft &gt; Windows &gt; Windows Defender &gt; Operational</code>.
            </p>
          </div>
        </div>

        {/* Official Microsoft Docs Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            From Microsoft Official Documentation
          </h3>
          <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 text-muted-foreground italic">
            "Attack surface reduction rules target certain software behaviors, such as: launching executables and scripts
            that attempt to download or run files; running scripts that seem obfuscated or otherwise suspicious;
            behaviors that apps don't usually initiate during normal day-to-day work. Such software behaviors
            are sometimes seen in legitimate applications. However, these behaviors are often considered risky
            because they are commonly abused by attackers through malware."
          </blockquote>
          <p className="text-sm text-muted-foreground mb-4">
            — <a href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground inline-flex items-center gap-1">Microsoft Learn: ASR Rules Reference <ExternalLink className="w-3 h-3" /></a>
          </p>

          <h4 className="font-semibold text-foreground mb-2 mt-4">Key Points from Microsoft Docs:</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-4">
            <li>ASR rules require <strong className="text-foreground">Microsoft Defender Antivirus</strong> to be the primary antivirus solution and <strong className="text-foreground">real-time protection</strong> must be enabled.</li>
            <li>Some rules may <strong className="text-foreground">affect legitimate applications</strong>. Always test in Audit mode before deploying in Block mode.</li>
            <li>You can create <strong className="text-foreground">exclusions</strong> for specific files and folders if a rule blocks a trusted application.</li>
            <li>ASR rules work alongside other Defender features like <strong className="text-foreground">Network Protection</strong>, <strong className="text-foreground">Controlled Folder Access</strong>, and <strong className="text-foreground">Exploit Protection</strong>.</li>
            <li>Events from ASR rules are logged under <strong className="text-foreground">Event ID 1121</strong> (Block) and <strong className="text-foreground">Event ID 1122</strong> (Audit) in Windows Event Viewer.</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              ASR Overview
            </a>
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Rules Reference
            </a>
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-deployment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Deployment Guide
            </a>
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/enable-attack-surface-reduction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-md hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Enable ASR Rules
            </a>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 tracking-tight">Rule Reference</h2>

        <div className="space-y-4">
          {ASR_RULES.map((rule) => (
            <div
              key={rule.guid}
              className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold mb-2 text-lg">{rule.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-md uppercase ${getRiskBadgeClass(rule.risk)}`}>
                  {rule.risk} RISK
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md uppercase bg-secondary text-secondary-foreground">
                  {rule.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Description:</strong> {rule.desc}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Example:</strong> {rule.example}
              </p>
              <div className="mt-3 bg-muted/50 p-2 rounded border border-border">
                <code className="text-xs text-muted-foreground font-mono">
                  GUID: {rule.guid}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Microsoft Documentation Link */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
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
