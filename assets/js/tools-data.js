/**
 * IHSByte - Central Software Tools Data
 * 
 * Featured Projects from D:\Antigravity:
 * - Firewall Blocker (Released)
 * - Decoy (Released)
 * - WidgetX (Released)
 * - FocusPoint (In Development)
 * - MailSafe (In Development)
 * - Net Mode SMB Monitor (In Development)
 */

const IHSBYTE_TOOLS = [
  {
    id: "firewall-blocker",
    name: "Firewall Blocker",
    iconUrl: "assets/images/tool-firewall-blocker.png",
    shortDescription: "Universal Windows firewall and hosts limiter to disable Adobe Suite & CorelDRAW background telemetry, licensing checks, and update services.",
    description: "Firewall Blocker v3.5 is a specialized, high-performance Windows desktop utility engineered for creative professionals, video editors, and system administrators. It delivers one-click universal inbound and outbound network & firewall isolation for all installed Adobe Creative Cloud apps (Photoshop, Illustrator, Premiere Pro, Acrobat DC, etc.) and CorelDRAW Graphics Suite (all versions). Featuring a distraction-free obsidian dark interface, real-time status indicator, 1-second batch netsh firewall rule injection, deep multi-drive app scanning, automated background service termination (AGSService, ARM, Corel IPM), and 50+ hosts sinkholes.",
    category: "Security & Firewall",
    version: "3.5",
    releaseDate: "November 2026",
    supportedWindows: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 8", "Windows 7 (32/64-bit)"],
    systemRequirements: "Windows 7, 8, 8.1, 10, or 11 (32-bit or 64-bit). Requires Administrator privileges for Windows Firewall and Hosts rules. Standalone portable executable (~190 KB), zero external runtimes needed.",
    features: [
      "Universal dual-suite protection: One-click blocking for both Adobe Creative Cloud & CorelDRAW Graphics Suite",
      "High-speed native netsh batch firewall engine: Injects both Inbound and Outbound blocking rules in under 1 second",
      "Obsidian dark interface: Clean distraction-free layout (#0A101C) with ambient cyan accent line",
      "Breathing Animated Status Badge: Real-time visual indicator reflecting Active (Blocked) vs Inactive protection",
      "Automated hosts sinkholing: Blocks over 50+ Adobe and Corel DRM, telemetry, licensing, and tracking endpoints",
      "Background task & updater killer: Automatically halts AGSService, Adobe ARM updater, and Corel IPM background services",
      "Deep multi-drive scanning: Scans C:, D:, and secondary drives for portable and non-standard suite installations",
      "Safe instant rollback: One-click unblock feature completely removes firewall rules and restores network connectivity",
      "Antivirus friendly & 100% clean: Tested false-positive free on Windows Defender, Kaspersky Standard, and Bitdefender"
    ],
    screenshots: [],
    downloadUrl: "downloads/FirewallBlocker-v3.5.zip",
    fileSize: "77.3 KB",
    sha256: "59AD7E05AF9A469EABF79265BC06A5FCFE49C4352E0CEC0668C0F26313DA1296",
    changelog: [
      {
        version: "3.5",
        date: "November 2026",
        changes: [
          "Rebranded from Adobe Blocker to Firewall Blocker with dual Adobe & CorelDRAW Suite support",
          "Updated high-speed compiled binary with real-time breathing status indicators",
          "CorelDRAW Graphics Suite (all versions) inbound & outbound firewall rules and hosts sinkholing added",
          "Automated termination for Corel IPM and Adobe Genuine Service (AGS)",
          "Zero-latency batch netsh injection engine (executes in < 1 second)",
          "Multi-drive scanning across all connected local drives"
        ]
      },
      {
        version: "2.0",
        date: "October 2026",
        changes: [
          "Complete dark theme redesign (#0B0F17) with glowing status indicators",
          "Universal multi-drive scanning for Adobe apps across C:, D:, and external drives",
          "30x faster batch engine using direct netsh script compilation",
          "Automated sinkhole for Adobe Genuine Service (AGS) and Creative Cloud telemetry"
        ]
      }
    ],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "released",
    isFeatured: true,
    downloads: 0,
    rating: 0,
    ratingCount: 0,
    reviews: []
  },
  {
    id: "decoy",
    name: "Decoy",
    iconUrl: "assets/images/tool-decoy.png",
    shortDescription: "Tamper-proof, password-protected Windows domain and content access control filter with viewer privacy masking.",
    description: "Decoy Enterprise is a hardened Windows domain and web filtering utility designed for offices, workstations, and multi-user family computers. It provides tamper-proof hosts-level domain blocking across all browsers with a master administrator authentication lock (preventing unauthorized user uninstallation or bypass). It also includes a specialized Viewer Mode that conceals adult or sensitive domain names behind clean privacy tags, preserving professional dignity in shared environments.",
    category: "Security & Access Control",
    version: "1.0.0",
    releaseDate: "November 2026",
    supportedWindows: ["Windows 11", "Windows 10", "Windows 8.1", "Windows 7 (32/64-bit)"],
    systemRequirements: "Windows 7, 8, 8.1, 10, or 11. Administrator elevation required for hosts-file protection. Standalone universal installer (~921 KB).",
    features: [
      "Tamper-proof uninstallation and bypass prevention locked by master administrator password",
      "Category-based domain blocking: Social Media, Streaming, Games, Torrents, Explicit Content, and Telemetry",
      "Viewer Privacy Mode with smart domain masking and automated concealment of adult keywords",
      "Direct kernel-level hosts blocking operating across all web browsers without browser extensions",
      "Automated hosts file backup with instant one-click rollback on authorized uninstall",
      "Zero network latency overhead, zero cloud dependency, and ultra-light memory usage",
      "Silent 10-minute session auto-lock to Viewer Mode for shared workstations",
      "Permanent backend audit logging in C:\\ProgramData\\Decoy\\audit.log"
    ],
    screenshots: [],
    downloadUrl: "downloads/Decoy-v1.0.0.zip",
    fileSize: "445 KB",
    sha256: "6CEED64B2A986554B16F11219B836570987A3A900352EA35B26C32F398BB413A",
    changelog: [
      {
        version: "1.0.0",
        date: "November 2026",
        changes: [
          "Official public release with standalone universal installer DecoySetup.exe",
          "Password-protected DecoyUninstall handler registering with Windows Apps & Features",
          "Real-time category filtering and autocomplete domain search across 150+ preset targets",
          "Viewer Privacy Mode with smart domain masking and adult keyword concealment",
          "Permanent administrative audit logging"
        ]
      }
    ],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "released",
    isFeatured: true,
    downloads: 0,
    rating: 0,
    ratingCount: 0,
    reviews: []
  },
  {
    id: "widgetx",
    name: "WidgetX",
    iconUrl: "assets/images/tool-widgetx.png",
    shortDescription: "Minimal lightweight desktop day counter and multi-widget countdown suite with acrylic glass and frameless modes.",
    description: "WidgetX is a modern, ultra-lightweight Windows desktop countdown and day tracking utility built with C# and .NET 8 (WPF). It empowers users to place unlimited independent floating widgets across their desktop for project milestones, event countdowns, and anniversary tracking. Featuring Gregorian leap-year precision (Months, Days, Hours, Minutes, Seconds), modern Acrylic Glass and Frameless transparent themes, click-drag lock protection, clean Windows 11 context menus, and 100% portable JSON configuration backup.",
    category: "Productivity & Workflow",
    version: "1.0.0",
    releaseDate: "November 2026",
    supportedWindows: ["Windows 11", "Windows 10 (64-bit)"],
    systemRequirements: "Windows 10 or Windows 11 (64-bit). Standalone self-contained portable executable (~72 MB), zero external runtimes or installation required.",
    features: [
      "Multiple Independent Widgets: Run unlimited simultaneous countdown & count-up timers anywhere on your desktop",
      "Gregorian Segmented Display: Precise real-time tracking for Months, Days, Hours, Minutes, and Seconds with leap-year awareness",
      "Advanced Glass & Frameless Themes: Acrylic glass, frosted surface, fully transparent, or frameless floating numerals with custom opacity",
      "Widget Drag Lock: Prevent accidental mouse dragging while maintaining live background timekeeping",
      "Clean Windows 11 Context Menu: Zero AI emoji clutter, native menus for rapid editing, duplication, and color presets",
      "100% Portable & Flash Drive Friendly: Local JSON configuration in Data/settings.json without Windows registry pollution",
      "Complete JSON Backup & Restore: One-click export and import of all widget titles, dates, positions, and styling",
      "Single-Instance Mutex Engine: Intelligent window signaling preventing duplicate background processes"
    ],
    screenshots: [],
    downloadUrl: "downloads/WidgetX-v1.0.0.zip",
    fileSize: "63.8 MB",
    sha256: "92565A6336E46BD17A8A61DB9B2E8EDD9E3077F042B3E6659C32A77CA6AFD8D1",
    changelog: [
      {
        version: "1.0.0",
        date: "November 2026",
        changes: [
          "Official public release of WidgetX desktop day counter suite",
          "Multi-widget manager supporting unlimited simultaneous desktop timers",
          "Acrylic glass, frosted glass, and frameless transparent visual styles",
          "Widget position locking and Always-on-Top desktop integration",
          "Standalone self-contained executable with zero external dependency"
        ]
      }
    ],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "released",
    isFeatured: true,
    downloads: 0,
    rating: 0,
    ratingCount: 0,
    reviews: []
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
    isFeatured: true,
    downloads: 0,
    rating: 0,
    ratingCount: 0,
    reviews: []
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
    isFeatured: true,
    downloads: 0,
    rating: 0,
    ratingCount: 0,
    reviews: []
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
    isFeatured: true,
    downloads: 0,
    rating: 0,
    ratingCount: 0,
    reviews: []
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
  const cleanId = id.trim().toLowerCase();
  if (cleanId === "adobe-blocker") {
    return IHSBYTE_TOOLS.find(tool => tool.id === "firewall-blocker") || null;
  }
  return IHSBYTE_TOOLS.find(tool => tool.id.toLowerCase() === cleanId) || null;
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
