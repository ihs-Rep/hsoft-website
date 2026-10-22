/**
 * HSoft - Central Software Tools Data
 * 
 * Instructions for adding a new tool:
 * 1. Duplicate one of the tool objects below.
 * 2. Fill in the tool details (id, name, description, category, etc.).
 * 3. Set `status` to "released" or "coming-soon".
 * 4. Add a real `downloadUrl` only when the binary/installer is published (e.g., GitHub Releases).
 * 5. Do not invent fake download links or fake version numbers.
 */

const HSOFT_TOOLS = [
  {
    id: "quick-hash-verifier",
    name: "Quick Hash Verifier",
    shortDescription: "Fast, lightweight Windows utility to compute and verify MD5, SHA-1, and SHA-256 file checksums.",
    description: "Quick Hash Verifier is a lightweight Windows utility designed for IT technicians, system administrators, and security-conscious PC users. It allows instant drag-and-drop file hashing, comparison against expected checksums, and clipboard copying with zero bloat.",
    category: "Security & Files",
    version: "", // Left blank until officially released
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10 (64-bit)"],
    systemRequirements: "Windows 10/11 64-bit, No additional runtimes required.",
    features: [
      "Instant drag-and-drop hashing for single and multiple files",
      "Calculates SHA-256, SHA-1, and MD5 algorithms simultaneously",
      "One-click comparison with clipboard or supplier checksums",
      "Lightweight standalone executable with zero background services",
      "Clean, modern UI adhering to native Windows design standards"
    ],
    screenshots: [],
    downloadUrl: "", // No fake download URL
    fileSize: "",
    sha256: "",
    changelog: [],
    knownIssues: [],
    supportUrl: "contact.html",
    status: "coming-soon",
    isFeatured: true
  },
  {
    id: "port-ping-scanner",
    name: "Port & Ping Scanner",
    shortDescription: "A minimalist network diagnostic tool for quick socket reachability and ping monitoring.",
    description: "Designed for IT support professionals and home lab administrators, this tool provides a rapid, straightforward way to verify whether internal or external host ports are responding without needing complex command-line arguments.",
    category: "Network & IT Support",
    version: "",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10"],
    systemRequirements: "Windows 10/11 (32-bit or 64-bit)",
    features: [
      "Quick TCP port reachability checks for common services (HTTP, HTTPS, RDP, SSH, SMB)",
      "Continuous ping latency graphs with minimal CPU overhead",
      "Export scan reports in clean plain text format",
      "Portable design — runs directly without installation"
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
    id: "disk-space-inspector",
    name: "Disk Space Inspector",
    shortDescription: "Simple, rapid folder size breakdown utility to help free up cluttered Windows storage drives.",
    description: "An intuitive drive visualization utility tailored for office and home users struggling with low disk space. It identifies hidden large folders, cache remnants, and temporary files in seconds without scanning unnecessary system files.",
    category: "System Utilities",
    version: "",
    releaseDate: "",
    supportedWindows: ["Windows 11", "Windows 10"],
    systemRequirements: "Windows 10 or Windows 11",
    features: [
      "High-speed multi-threaded folder size calculation",
      "Clean visual tree representation sorted by size",
      "Safe direct navigation to Windows File Explorer",
      "Zero telemetry and zero data collection"
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

// Helper functions for accessing tool data
function getAllTools() {
  return HSOFT_TOOLS;
}

function getToolById(id) {
  if (!id) return null;
  return HSOFT_TOOLS.find(tool => tool.id.toLowerCase() === id.trim().toLowerCase()) || null;
}

function getFeaturedTools() {
  return HSOFT_TOOLS.filter(tool => tool.isFeatured);
}

function getReleasedTools() {
  return HSOFT_TOOLS.filter(tool => tool.status === "released");
}

function getCategories() {
  const categories = new Set(HSOFT_TOOLS.map(tool => tool.category).filter(Boolean));
  return Array.from(categories);
}
