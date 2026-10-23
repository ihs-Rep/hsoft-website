/**
 * IHSByte - Central Software Tools Data
 * 
 * Featured Projects from D:\Antigravity:
 * - Adobe Blocker
 * - Decoy
 * - FocusPoint
 * - MailSafe
 * - Net Mode SMB Monitor
 */

const IHSBYTE_TOOLS = [
  {
    id: "adobe-blocker",
    name: "Adobe Blocker",
    iconUrl: "assets/images/tool-adobe-blocker.png",
    shortDescription: "Ultra-fast Windows firewall and hosts blocking utility to disable Adobe background telemetry, licensing checks, and update services.",
    description: "Adobe Blocker is a specialized, lightweight Windows utility built for power users, creatives, and IT administrators. It instantly prevents background network and firewall access for all installed Adobe applications—including Photoshop, Illustrator, Acrobat DC, Premiere Pro, InDesign, After Effects, and Lightroom. Equipped with an ultra-fast batch firewall injection engine (1–2 seconds execution), automated sinkholing of 40+ Adobe telemetry endpoints, and one-click Adobe Genuine Service (AGS) disabling.",
    category: "Security & Firewall",
    version: "2.0 (Dark Edition)",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7 (32/64-bit)"],
    systemRequirements: "Windows 7, 8, 8.1, 10, or 11 (32-bit or 64-bit). Requires Administrator privileges for Windows Firewall and Hosts rules. Standalone executable (~127 KB), zero external runtimes needed.",
    features: [
      "One-click universal blocking for Photoshop, Illustrator, Acrobat, Premiere Pro, and Creative Cloud apps",
      "High-speed batch firewall rule generation powered by native netsh batch injection in under 2 seconds",
      "Automatic sinkholing of 40+ Adobe licensing and telemetry endpoints via Windows hosts file",
      "Terminates and disables Adobe Genuine Service (AGSService), ARM updater, and scheduled background tasks",
      "Safe one-click restore functionality to unblock all applications and revert firewall rules",
      "Modern dark-themed standalone GUI (#0B0F17) with zero background processes"
    ],
    screenshots: [],
    downloadUrl: "",
    fileSize: "127 KB",
    sha256: "",
    changelog: [
      {
        version: "2.0",
        date: "October 2026",
        changes: [
          "Complete dark theme redesign (#0B0F17) with high-contrast glowing status indicators",
          "Universal multi-drive scanning for Adobe apps across C:, D:, and external drives",
          "30x faster batch engine using direct netsh script compilation",
          "Automated sinkhole for Adobe Genuine Service (AGS) and Creative Cloud telemetry"
        ]
      }
    ],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "coming-soon",
    isFeatured: true
  },
  {
    id: "decoy",
    name: "Decoy",
    iconUrl: "assets/images/tool-decoy.png",
    shortDescription: "Tamper-proof, password-protected Windows domain and content access control filter with viewer privacy masking.",
    description: "Decoy is a hardened Windows domain and web filtering utility designed for offices, workstations, and multi-user family computers. It provides tamper-proof hosts-level domain blocking across all browsers with a master administrator authentication lock (preventing unauthorized user uninstallation or bypass). It also includes a specialized Viewer Mode that conceals adult or sensitive domain names behind clean privacy tags, preserving professional dignity in shared environments.",
    category: "Security & Access Control",
    version: "1.0.0",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7"],
    systemRequirements: "Windows 7, 8, 10, or 11. Administrator elevation required for hosts-file protection.",
    features: [
      "Tamper-proof uninstallation and bypass prevention locked by master administrator password",
      "Category-based domain blocking: Social Media, Streaming, Games, Torrents, Explicit Content, and Telemetry",
      "Viewer Privacy Mode with smart domain masking and automated concealment of adult keywords",
      "Direct kernel-level hosts blocking operating across all web browsers without browser extensions",
      "Automated hosts file backup with instant one-click rollback on authorized uninstall",
      "Zero network latency overhead, zero cloud dependency, and ultra-light memory usage"
    ],
    screenshots: [],
    downloadUrl: "",
    fileSize: "170 KB",
    sha256: "",
    changelog: [
      {
        version: "1.0.0",
        date: "October 2026",
        changes: [
          "Standalone universal installer with Desktop and Start Menu shortcuts",
          "Password-protected DecoyUninstall handler registering with Windows Apps & Features",
          "Real-time category filtering and autocomplete domain search"
        ]
      }
    ],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "coming-soon",
    isFeatured: true
  },
  {
    id: "focuspoint",
    name: "FocusPoint",
    iconUrl: "assets/images/tool-focuspoint.svg",
    shortDescription: "Distraction-free desktop reminder and smart productivity scheduler built natively for Windows.",
    description: "FocusPoint is a clean, modern Windows productivity and reminder utility designed to help professionals, software engineers, and office workers maintain focus without complex task managers. It features rapid reminder creation via floating hotkey windows, recurring schedule automation, and non-intrusive notification toasts that respect fullscreen workflows.",
    category: "Productivity & Workflow",
    version: "1.0.0",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10 (64-bit)"],
    systemRequirements: "Windows 10 or 11 (64-bit). Built with high-performance .NET WPF.",
    features: [
      "Quick-Add floating window for instant reminder creation without breaking active workflow",
      "Smart scheduling engine supporting recurring daily routines, custom intervals, and timed alerts",
      "Unobtrusive native Windows desktop toasts designed to prevent focus disruption",
      "Lightweight system tray agent with instant status summary and one-click quick actions",
      "100% offline local storage with zero cloud accounts, zero ads, and zero telemetry",
      "Minimal system footprint engineered for continuous 24/7 background execution"
    ],
    screenshots: [],
    downloadUrl: "",
    fileSize: "",
    sha256: "",
    changelog: [],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "coming-soon",
    isFeatured: true
  },
  {
    id: "mailsafe",
    name: "MailSafe",
    iconUrl: "assets/images/tool-mailsafe.png",
    shortDescription: "Automated desktop backup tool for Outlook email archives (PST/OST), sensitive documents, and critical folders.",
    description: "MailSafe is an automated Windows data protection and backup utility tailored for office workstations, accounting PCs, and Outlook power users. It safeguards Outlook PST/OST data files, documents, and business directories with automated interval or daily schedules to local drives, external USB disks, or mapped network storage with background tray monitoring.",
    category: "Backup & Data Protection",
    version: "1.0.0",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7 SP1"],
    systemRequirements: "Windows 7 SP1, 8, 10, or 11. .NET Framework 4.6.1 or later. Local or network write permissions for backup targets.",
    features: [
      "Automated interval and scheduled background backups for Outlook PST/OST archives and documents",
      "Multi-destination redundancy: local drives, removable USB storage, and mapped SMB network shares",
      "Background system tray agent with real-time status updates and execution progress notifications",
      "Smart incremental copying to minimize network bandwidth usage and disk wear",
      "Comprehensive backup audit logs, failure tracking, and error reporting",
      "Zero cloud reliance — your critical business data stays 100% on-premise"
    ],
    screenshots: [],
    downloadUrl: "",
    fileSize: "",
    sha256: "",
    changelog: [],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "coming-soon",
    isFeatured: true
  },
  {
    id: "netmode-smb-monitor",
    name: "Net Mode SMB Monitor",
    iconUrl: "assets/images/tool-netmode-smb.png",
    shortDescription: "Dual-purpose network management utility: Instant QB/Internet mode switcher and real-time SMB share monitor.",
    description: "Net Mode SMB Monitor is a dedicated network management suite engineered for IT support technicians, multi-user QuickBooks networks, and office file server administrators. It combines a one-click Network Mode Switcher (toggling network adapters between local-only QB mode and full internet access) with OmniPulse SMB Monitor for live file share throughput, active connection metrics, and failure auditing.",
    category: "Network & IT Support",
    version: "1.0.0",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10", "Windows Server 2016-2022"],
    systemRequirements: "Windows 10, 11, or Windows Server. Network Administrator privileges for gateway toggling.",
    features: [
      "One-click network isolation switch: toggle instantly between Local/QB Mode and Internet Mode",
      "Real-time SMB traffic, active connection sessions, and file share throughput monitoring",
      "Multi-path connection monitoring with instant alerts on network drops or latency spikes",
      "System tray quick-action controller with color-coded status badges (Blue for Local, Green for Internet)",
      "Detailed failure logging and access-denied audit tracking for SMB shares",
      "Purpose-built for accounting networks and high-reliability office file sharing"
    ],
    screenshots: [],
    downloadUrl: "",
    fileSize: "",
    sha256: "",
    changelog: [],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "coming-soon",
    isFeatured: true
  }
];

// Compatibility alias
const HSOFT_TOOLS = IHSBYTE_TOOLS;

// Helper functions for accessing tool data
function getAllTools() {
  return IHSBYTE_TOOLS;
}

function getToolById(id) {
  if (!id) return null;
  return IHSBYTE_TOOLS.find(tool => tool.id.toLowerCase() === id.trim().toLowerCase()) || null;
}

function getFeaturedTools() {
  return IHSBYTE_TOOLS.filter(tool => tool.isFeatured);
}

function getReleasedTools() {
  return IHSBYTE_TOOLS.filter(tool => tool.status === "released");
}

function getCategories() {
  const categories = new Set(IHSBYTE_TOOLS.map(tool => tool.category).filter(Boolean));
  return Array.from(categories);
}
