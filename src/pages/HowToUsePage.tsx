import { ExternalLink } from 'lucide-react';

export default function HowToUsePage() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">How to Use ASR Configurator</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Configure, customize, and deploy ASR rules in three simple steps.
        </p>

        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Step 1: Select a Preset
          </h3>
          <p className="text-muted-foreground mb-4">
            Start by choosing a preset that matches your environment from the dropdown menu in the sidebar.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Disabled:</strong> All rules turned off. Use as a clean starting point.</li>
            <li><strong className="text-foreground">Basic:</strong> Minimal impact, safe for all users. Enables common rules in Audit mode.</li>
            <li><strong className="text-foreground">Balanced (Recommended):</strong> Good security posture with low risk of breaking apps.</li>
            <li><strong className="text-foreground">Strict:</strong> Maximum security, blocks most attack vectors. Higher risk of false positives.</li>
            <li><strong className="text-foreground">Developer-Friendly:</strong> Light protection that avoids blocking development tools.</li>
          </ul>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Step 2: Customize Rules
          </h3>
          <p className="text-muted-foreground mb-4">
            Use the <strong className="text-foreground">checkboxes</strong> in the sidebar to quickly enable/disable individual rules,
            or click on a rule to view its details and set a specific mode:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-destructive">Block (value: 1):</strong> The action is actively stopped. Provides maximum protection for that rule.</li>
            <li><strong className="text-chart-4">Audit (value: 2):</strong> Monitoring only. The action is allowed but logged for review. Use this to test rules before enforcing.</li>
            <li><strong className="text-muted-foreground">Disabled (value: 0):</strong> The rule is completely turned off. No blocking or logging occurs.</li>
          </ul>
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">💡 Bulk Actions:</strong> Use the <strong className="text-foreground">Block All</strong>,{' '}
              <strong className="text-foreground">Audit All</strong>, or <strong className="text-foreground">Disable</strong> buttons
              to change all checked rules at once. The preset dropdown will show <strong className="text-foreground">"Custom"</strong> when
              your configuration doesn't match any predefined preset.
            </p>
          </div>
        </div>

        {/* Script Values Explained */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Understanding Script Values
          </h3>
          <p className="text-muted-foreground mb-4">
            When you configure rules, the generated scripts use numeric values to represent each rule's state.
            These values are defined by Microsoft and used across all deployment methods:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="p-3 text-left font-semibold border-b border-border">Value</th>
                  <th className="p-3 text-left font-semibold border-b border-border">Mode</th>
                  <th className="p-3 text-left font-semibold border-b border-border">In PowerShell</th>
                  <th className="p-3 text-left font-semibold border-b border-border">Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3"><code className="px-2 py-0.5 bg-muted rounded font-mono font-bold">0</code></td>
                  <td className="p-3 font-medium text-muted-foreground">Disabled</td>
                  <td className="p-3 text-muted-foreground"><code className="text-xs bg-muted px-1 rounded">Not Configured</code></td>
                  <td className="p-3 text-muted-foreground">Rule is off — no blocking, no logging</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3"><code className="px-2 py-0.5 bg-destructive/20 rounded text-destructive font-mono font-bold">1</code></td>
                  <td className="p-3 font-medium text-destructive">Block</td>
                  <td className="p-3 text-muted-foreground"><code className="text-xs bg-muted px-1 rounded">Enabled</code></td>
                  <td className="p-3 text-muted-foreground">Action is blocked + Event ID 1121 logged</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3"><code className="px-2 py-0.5 bg-chart-4/20 rounded text-chart-4 font-mono font-bold">2</code></td>
                  <td className="p-3 font-medium text-chart-4">Audit</td>
                  <td className="p-3 text-muted-foreground"><code className="text-xs bg-muted px-1 rounded">AuditMode</code></td>
                  <td className="p-3 text-muted-foreground">Action is allowed + Event ID 1122 logged</td>
                </tr>
                <tr>
                  <td className="p-3"><code className="px-2 py-0.5 bg-orange-500/20 rounded text-orange-500 font-mono font-bold">6</code></td>
                  <td className="p-3 font-medium text-orange-500">Warn</td>
                  <td className="p-3 text-muted-foreground"><code className="text-xs bg-muted px-1 rounded">Warn</code></td>
                  <td className="p-3 text-muted-foreground">User gets a bypass dialog (select rules only)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-secondary/30 border border-border rounded-md">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">📖 Example PowerShell:</strong> The script{' '}
              <code className="px-1 py-0.5 bg-muted rounded text-xs">$asrActions = @(1, 2, 1)</code>{' '}
              means the first rule is set to <strong>Block</strong>, the second to <strong>Audit</strong>, and the third to <strong>Block</strong>.
              Each action value corresponds positionally to the GUID in <code className="px-1 py-0.5 bg-muted rounded text-xs">$asrIds</code>.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Step 3: Generate &amp; Apply Code
          </h3>
          <p className="text-muted-foreground mb-4">
            Select your deployment method from the bottom tabs. The script updates in <strong className="text-foreground">real-time</strong> as
            you change rule configurations:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-border rounded-lg text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="p-3 text-left font-semibold border-b border-border">Method</th>
                  <th className="p-3 text-left font-semibold border-b border-border">Best For</th>
                  <th className="p-3 text-left font-semibold border-b border-border">How to Apply</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">PowerShell</td>
                  <td className="p-3 text-muted-foreground">Single Machines / Testing</td>
                  <td className="p-3 text-muted-foreground">Open PowerShell as Admin, paste the code, and run.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">Group Policy</td>
                  <td className="p-3 text-muted-foreground">Active Directory Domains</td>
                  <td className="p-3 text-muted-foreground">Save as .reg file and import, or configure in GPO Editor under Computer Configuration &gt; Admin Templates &gt; Windows Defender.</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">Intune</td>
                  <td className="p-3 text-muted-foreground">Cloud / M365 Devices</td>
                  <td className="p-3 text-muted-foreground">Copy JSON and import into Endpoint Security &gt; ASR Policy in Intune portal.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile-friendly stacked view */}
          <div className="md:hidden mt-4 space-y-3">
            <div className="bg-secondary/30 border border-border rounded-md p-3">
              <div className="font-bold mb-1 text-foreground">PowerShell</div>
              <div className="text-xs text-muted-foreground">Best for: Single Machines / Testing</div>
              <div className="text-xs text-muted-foreground mt-1">Open PowerShell as Admin, paste the code, and run.</div>
            </div>
            <div className="bg-secondary/30 border border-border rounded-md p-3">
              <div className="font-bold mb-1 text-foreground">Group Policy</div>
              <div className="text-xs text-muted-foreground">Best for: Active Directory Domains</div>
              <div className="text-xs text-muted-foreground mt-1">Save as .reg file and import, or manually configure in GPO Editor.</div>
            </div>
            <div className="bg-secondary/30 border border-border rounded-md p-3">
              <div className="font-bold mb-1 text-foreground">Intune</div>
              <div className="text-xs text-muted-foreground">Best for: Cloud / M365 Devices</div>
              <div className="text-xs text-muted-foreground mt-1">Copy JSON and import into Endpoint Security &gt; ASR Policy.</div>
            </div>
          </div>
        </div>

        {/* Verifying ASR Rules */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Verifying Your Configuration
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            After applying ASR rules, verify they are active using the method you deployed with:
          </p>

          {/* PowerShell Verification */}
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded">PowerShell</span>
          </h4>
          <div className="bg-muted/50 border border-border rounded-md p-4 mb-4 overflow-x-auto">
            <pre className="text-xs font-mono text-foreground whitespace-pre">
              {`# Check current ASR rule status
Get-MpPreference | Select-Object -ExpandProperty AttackSurfaceReductionRules_Ids

# Check actions
Get-MpPreference | Select-Object -ExpandProperty AttackSurfaceReductionRules_Actions

# View ASR events in Event Viewer
Get-WinEvent -LogName "Microsoft-Windows-Windows Defender/Operational" | Where-Object { $_.Id -in 1121,1122 } | Select-Object -First 10`}
            </pre>
          </div>

          {/* Group Policy Verification */}
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">Group Policy</span>
          </h4>
          <div className="bg-muted/50 border border-border rounded-md p-4 mb-2 overflow-x-auto">
            <pre className="text-xs font-mono text-foreground whitespace-pre">
              {`# Verify registry keys are applied
reg query "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\ASR\\Rules"

# Force Group Policy update on target machines
gpupdate /force

# Check applied GPO results
gpresult /r /scope:computer`}
            </pre>
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground mb-4 ml-2" style={{ overflowWrap: 'anywhere' }}>
            <li>• You can also verify via <strong className="text-foreground">GPO Editor</strong>: Computer Configuration → Admin Templates → Windows Components → Microsoft Defender Antivirus → Microsoft Defender Exploit Guard → Attack Surface Reduction</li>
            <li>• After importing the .reg file, run <code className="px-1 py-0.5 bg-muted rounded">gpupdate /force</code> to apply immediately</li>
          </ul>

          {/* Intune Verification */}
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-purple-500/10 text-purple-500 border border-purple-500/20 rounded">Intune</span>
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4 ml-2">
            <li>1. Go to <strong className="text-foreground">Microsoft Intune Admin Center</strong> → Endpoint Security → Attack Surface Reduction</li>
            <li>2. Open your ASR policy and check the <strong className="text-foreground">Device Status</strong> tab to see deployment status per device</li>
            <li>3. Check <strong className="text-foreground">Monitor → Device configuration</strong> for per-profile compliance</li>
            <li>4. On the client device, verify with PowerShell:
              <div className="bg-muted/50 border border-border rounded-md p-3 mt-2 overflow-x-auto">
                <pre className="text-xs font-mono text-foreground whitespace-pre">
                  {`# Verify Intune-managed ASR rules on client
Get-MpPreference | Select-Object AttackSurfaceReductionRules_Ids, AttackSurfaceReductionRules_Actions

# Check MDM diagnostics log
mdmdiagnosticstool.exe -area DeviceEnrollment;DeviceProvisioning;Autopilot -cab c:\\temp\\intune_diag.cab`}
                </pre>
              </div>
            </li>
          </ul>

          {/* Event IDs */}
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
            <p className="text-xs text-muted-foreground" style={{ overflowWrap: 'anywhere' }}>
              <strong className="text-foreground">📋 Event IDs (all methods):</strong>{' '}
              <strong className="text-foreground">1121</strong> = ASR rule fired in Block mode,{' '}
              <strong className="text-foreground">1122</strong> = ASR rule fired in Audit mode. Check in{' '}
              <code className="px-1 py-0.5 bg-muted rounded text-xs">Event Viewer → Applications and Services → Microsoft → Windows → Windows Defender → Operational</code>
            </p>
          </div>
        </div>

        {/* Microsoft Docs Links */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 border-b border-border pb-2 text-primary">
            Official Microsoft Resources
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-secondary/30 border border-border rounded-md hover:bg-secondary/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <div className="font-medium text-sm text-foreground">ASR Overview</div>
                <div className="text-xs text-muted-foreground">Overview of Attack Surface Reduction capabilities</div>
              </div>
            </a>
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-secondary/30 border border-border rounded-md hover:bg-secondary/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <div className="font-medium text-sm text-foreground">Rules Reference</div>
                <div className="text-xs text-muted-foreground">Detailed reference for all ASR rules and GUIDs</div>
              </div>
            </a>
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/enable-attack-surface-reduction"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-secondary/30 border border-border rounded-md hover:bg-secondary/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <div className="font-medium text-sm text-foreground">Enable ASR Rules</div>
                <div className="text-xs text-muted-foreground">Step-by-step guide to enable rules via PowerShell, GPO, and Intune</div>
              </div>
            </a>
            <a
              href="https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-deployment"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 bg-secondary/30 border border-border rounded-md hover:bg-secondary/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <div className="font-medium text-sm text-foreground">Deployment Guide</div>
                <div className="text-xs text-muted-foreground">Best practices for testing and deploying ASR rules</div>
              </div>
            </a>
          </div>
        </div>

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
