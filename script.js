// ASR Configurator JavaScript
'use strict';

// --- SECURITY UTILITIES ---
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// --- DATA ---
const ASR_RULES = [
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

const PRESETS = {
    disabled: {},
    basic: { "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 2, "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 2, "D3E037E1-3EB8-44C8-A917-57927947596D": 2, "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 2, "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 2, "C1DB55AB-C21A-4637-BB3F-A12568109D35": 2, "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65": 2 },
    balanced: { "56A863A9-875E-4185-98A7-B882C64B5CE5": 1, "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 1, "D4F940AB-401B-4EFC-AADC-AD5F3C50688A": 2, "9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2": 1, "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 1, "D3E037E1-3EB8-44C8-A917-57927947596D": 1, "3B576869-A4EC-4529-8536-B80A7769E899": 2, "26190899-1602-49E8-8B27-EB1D0A1CE869": 2, "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 1, "D1E49AAC-8F56-4280-B9BA-993A6D77406C": 1, "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 1, "C1DB55AB-C21A-4637-BB3F-A12568109D35": 1, "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65": 1 },
    strict: { "56A863A9-875E-4185-98A7-B882C64B5CE5": 1, "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 1, "D4F940AB-401B-4EFC-AADC-AD5F3C50688A": 1, "9E6C4E1F-7D60-472F-BA1A-A39EF669E4B2": 1, "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 1, "01443614-CD74-433A-B99E-2ECDC07BFC25": 2, "5BEB7EFE-FD9A-4556-801D-275E5FFC04CC": 1, "D3E037E1-3EB8-44C8-A917-57927947596D": 1, "3B576869-A4EC-4529-8536-B80A7769E899": 1, "75668C1F-73B5-4CF0-BB93-3ECF5F35C5F4": 1, "26190899-1602-49E8-8B27-EB1D0A1CE869": 1, "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 1, "D1E49AAC-8F56-4280-B9BA-993A6D77406C": 1, "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 1, "92E97FA1-2EDF-4476-BDD6-9DD0B4DDDC7B": 2, "C1DB55AB-C21A-4637-BB3F-A12568109D35": 1, "33DDEDF1-C6E0-47CB-833E-DE1B90F88F65": 1 },
    developer: { "7674BA52-37EB-4A4F-A9A1-F0F9A1619A2C": 2, "BE9BA2D9-53EA-4CDC-84E5-9B1EEEE46550": 2, "D3E037E1-3EB8-44C8-A917-57927947596D": 2, "E6DB77E5-3DF2-4CF1-B95A-636979351E5B": 2, "B2B3F03D-6A65-4F7B-A9C7-1C7EF76FC7B0": 2, "C1DB55AB-C21A-4637-BB3F-A12568109D35": 2 }
};

// --- STATE ---
let currentRules = {}; // map of GUID -> state (0=Disable, 1=Block, 2=Audit)
let activeRule = null;
let currentUrlTab = 'powershell';

// --- DOM ELEMENTS ---
const rulesListEl = document.getElementById('rules-list');
const detailContainerEl = document.getElementById('rule-detail-container');
const codeOutputEl = document.getElementById('code-output');
const presetSelectEl = document.getElementById('preset-select');
const themeToggleEl = document.getElementById('theme-toggle');
const enableAllCheckbox = document.getElementById('enable-all');

// --- INIT ---
function init() {
    renderRulesList();
    renderEducationalRules();

    // Load Theme (with defensive check)
    let savedTheme = 'dark';
    try {
        savedTheme = localStorage.getItem('theme') || 'dark';
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Load default preset
    loadPreset('basic');
    generateCode();
}

// --- CORE LOGIC ---
function navigate(pageId, e) {
    // Validate pageId to prevent injection
    const validPages = ['configurator', 'why', 'how', 'about'];
    if (!validPages.includes(pageId)) return;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('header nav .nav-link').forEach(l => l.classList.remove('active'));
    if (e && e.target) {
        e.target.classList.add('active');
    }
}

function switchTab(tab, e) {
    currentUrlTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (e && e.currentTarget) {
        e.currentTarget.classList.add('active');
    }
    generateCode();
}

function renderRulesList() {
    rulesListEl.innerHTML = '';
    ASR_RULES.forEach((rule, index) => {
        const item = document.createElement('div');
        item.className = 'rule-item';
        item.onclick = () => selectRule(rule.guid);
        item.id = `rule-item-${rule.guid}`;

        const statusClass = getStatusClass(currentRules[rule.guid] || 0);

        item.innerHTML = `
            <div class="rule-item-header">
                <span class="rule-name">${rule.name}</span>
                <div class="rule-status ${statusClass}" id="status-${rule.guid}"></div>
            </div>
            <small style="color: var(--text-secondary)">${rule.category}</small>
        `;
        rulesListEl.appendChild(item);
    });
}

function renderEducationalRules() {
    const container = document.getElementById('educational-rules-list');
    ASR_RULES.forEach(rule => {
        const card = document.createElement('div');
        card.className = 'card rule-detail-card';
        card.style.cursor = 'default';
        card.innerHTML = `
            <h3>${rule.name}</h3>
            <div style="margin: 0.5rem 0;">
                <span class="badge ${getRiskBadgeClass(rule.risk)}">${rule.risk} RISK</span>
                <span class="badge" style="background: var(--bg-panel); color: var(--text-secondary);">${rule.category}</span>
            </div>
            <p><strong>Description:</strong> ${rule.desc}</p>
            <p><strong>Example:</strong> ${rule.example}</p>
            <code>GUID: ${rule.guid}</code>
        `;
        container.appendChild(card);
    });
}

function selectRule(guid) {
    activeRule = ASR_RULES.find(r => r.guid === guid);

    document.querySelectorAll('.rule-item').forEach(i => i.classList.remove('active'));
    document.getElementById(`rule-item-${guid}`).classList.add('active');

    const currentState = currentRules[guid] || 0;

    detailContainerEl.innerHTML = `
        <h2>${activeRule.name}</h2>
        <div style="margin-bottom: 1.5rem;">
            <span class="badge ${getRiskBadgeClass(activeRule.risk)}">${activeRule.risk} RISK</span>
            <span class="badge" style="background: var(--bg-panel); color: var(--text-secondary);">${activeRule.category}</span>
        </div>
        
        <p>${activeRule.desc}</p>
        <div style="background-color: var(--bg-panel); padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
            <strong>Why it matters:</strong> ${activeRule.example}
        </div>

        <div class="mode-selector">
            <div class="mode-option mode-block">
                <input type="radio" id="mode-block" name="mode" value="1" ${currentState === 1 ? 'checked' : ''} onchange="updateRuleState('${guid}', 1)">
                <label for="mode-block">Block</label>
            </div>
            <div class="mode-option mode-audit">
                <input type="radio" id="mode-audit" name="mode" value="2" ${currentState === 2 ? 'checked' : ''} onchange="updateRuleState('${guid}', 2)">
                <label for="mode-audit">Audit</label>
            </div>
            <div class="mode-option mode-disable">
                <input type="radio" id="mode-disable" name="mode" value="0" ${currentState === 0 ? 'checked' : ''} onchange="updateRuleState('${guid}', 0)">
                <label for="mode-disable">Disabled</label>
            </div>
        </div>

        <small style="color: var(--text-secondary); font-family: monospace;">GUID: ${activeRule.guid}</small>
    `;
}

function updateRuleState(guid, state) {
    currentRules[guid] = parseInt(state);
    const statusIndicator = document.getElementById(`status-${guid}`);
    if (statusIndicator) {
        statusIndicator.className = `rule-status ${getStatusClass(state)}`;
    }
    generateCode();
}

function getStatusClass(state) {
    if (state === 1) return 'status-block';
    if (state === 2) return 'status-audit';
    return 'status-disabled';
}

function getRiskBadgeClass(risk) {
    if (risk === 'LOW') return 'badge-low';
    if (risk === 'MEDIUM') return 'badge-medium';
    return 'badge-high';
}

// --- PRESETS & BULK ACTIONS ---
presetSelectEl.addEventListener('change', (e) => {
    loadPreset(e.target.value);
    enableAllCheckbox.checked = false;
});

function loadPreset(name) {
    const preset = PRESETS[name];
    if (!preset) return;
    currentRules = {};

    ASR_RULES.forEach(rule => {
        currentRules[rule.guid] = preset[rule.guid] || 0;
    });

    renderRulesList();
    if (activeRule) selectRule(activeRule.guid);
    generateCode();
}

enableAllCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        if (confirm("Enable all rules in Block mode? This may break legitimate applications.")) {
            ASR_RULES.forEach(r => currentRules[r.guid] = 1);
            renderRulesList();
            if (activeRule) selectRule(activeRule.guid);
            generateCode();
        } else {
            e.target.checked = false;
        }
    } else {
        if (confirm("Disable all rules?")) {
            ASR_RULES.forEach(r => currentRules[r.guid] = 0);
            renderRulesList();
            if (activeRule) selectRule(activeRule.guid);
            generateCode();
            presetSelectEl.value = 'disabled';
            e.target.checked = false;
        } else {
            e.target.checked = true;
        }
    }
});

function clearConfig() {
    if (confirm("Clear all configuration?")) {
        currentRules = {};
        ASR_RULES.forEach(r => currentRules[r.guid] = 0);
        renderRulesList();
        if (activeRule) selectRule(activeRule.guid);
        generateCode();
        presetSelectEl.value = 'disabled';
        enableAllCheckbox.checked = false;
    }
}

// --- CODE GENERATION ---
function generateCode() {
    const activeGuids = Object.keys(currentRules).filter(g => currentRules[g] !== 0);

    if (activeGuids.length === 0) {
        codeOutputEl.textContent = "# No rules enabled.";
        return;
    }

    if (currentUrlTab === 'powershell') {
        const ids = activeGuids.map(g => `"${g}"`).join(',\n    ');
        const actions = activeGuids.map(g => currentRules[g]).join(', ');

        codeOutputEl.textContent = `# ASR Rules Configuration - PowerShell
$asrIds = @(
    ${ids}
)
$asrActions = @(${actions})

Set-MpPreference -AttackSurfaceReductionRules_Ids $asrIds -AttackSurfaceReductionRules_Actions $asrActions
Write-Host "ASR Rules Applied" -ForegroundColor Green`;

    } else if (currentUrlTab === 'gpo') {
        let rulesReg = "";
        activeGuids.forEach(g => {
            rulesReg += `"${g}"="${currentRules[g]}"\n`;
        });

        codeOutputEl.textContent = `Windows Registry Editor Version 5.00

; ASR Rules
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows Defender\\Windows Defender Exploit Guard\\ASR\\Rules]
${rulesReg}`;

    } else if (currentUrlTab === 'intune') {
        const rulesList = activeGuids.map(g => ({
            id: g,
            state: currentRules[g] === 1 ? "block" : "audit"
        }));

        const json = {
            displayName: "ASR Configuration",
            "@odata.type": "#microsoft.graph.windows10EndpointProtectionConfiguration",
            defenderAttackSurfaceReductionRulesList: rulesList
        };

        codeOutputEl.textContent = JSON.stringify(json, null, 2);
    }
}

function copyCode() {
    const textToCopy = codeOutputEl ? codeOutputEl.textContent : '';
    if (!textToCopy) return;

    // Modern clipboard API with fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast();
        }).catch(() => {
            fallbackCopyText(textToCopy);
        });
    } else {
        fallbackCopyText(textToCopy);
    }
}

function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showToast();
    } catch (e) {
        console.error('Copy failed:', e);
    }
    document.body.removeChild(textarea);
}

function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// --- THEME & RESIZING ---
if (themeToggleEl) {
    themeToggleEl.addEventListener('click', () => {
        const root = document.documentElement;
        const current = root.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.warn('localStorage not available:', e);
        }
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggleEl) {
        themeToggleEl.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Resizer Logic (with touch support)
const resizer = document.getElementById('resizer');
const codePanel = document.getElementById('code-panel');
let isResizing = false;

if (resizer && codePanel) {
    // Mouse events
    resizer.addEventListener('mousedown', startResize);

    // Touch events for mobile
    resizer.addEventListener('touchstart', (e) => {
        startResize(e);
    }, { passive: false });
}

function startResize(e) {
    e.preventDefault();
    isResizing = true;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('touchmove', resizeTouch, { passive: false });
    document.addEventListener('touchend', stopResize);
    document.body.style.userSelect = 'none';
}

function resize(e) {
    if (!isResizing || !codePanel) return;
    const newHeight = window.innerHeight - e.clientY;
    if (newHeight > 100 && newHeight < window.innerHeight * 0.6) {
        codePanel.style.height = `${newHeight}px`;
    }
}

function resizeTouch(e) {
    if (!isResizing || !codePanel || !e.touches[0]) return;
    e.preventDefault();
    const newHeight = window.innerHeight - e.touches[0].clientY;
    if (newHeight > 100 && newHeight < window.innerHeight * 0.6) {
        codePanel.style.height = `${newHeight}px`;
    }
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
    document.removeEventListener('touchmove', resizeTouch);
    document.removeEventListener('touchend', stopResize);
    document.body.style.userSelect = '';
}

// --- STARTUP ---
init();

// --- MOBILE NAVIGATION ---
function toggleMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');

        // Update aria-expanded state
        const isOpen = mobileNav.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

function navigateMobile(pageId) {
    toggleMobileNav();

    // Validate pageId to prevent injection
    const validPages = ['configurator', 'why', 'how', 'about'];
    if (!validPages.includes(pageId)) return;

    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        targetPage.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => {
        if (l.getAttribute('onclick')?.includes(`'${pageId}'`)) {
            l.classList.add('active');
        }
    });
}

// --- SIDEBAR TOGGLE (Mobile) ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (sidebar && overlay) {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');

        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close sidebar when selecting a rule on mobile
const originalSelectRule = selectRule;
selectRule = function (guid) {
    originalSelectRule(guid);

    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Reset on window resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobile-nav');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');

        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
        if (mobileNav) mobileNav.classList.remove('open');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
});
