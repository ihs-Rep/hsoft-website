#!/usr/bin/env python3
"""
IHSByte Automated IT News Aggregator
Fetches real-time tech and IT news from authoritative industry RSS/Atom feeds:
- Cybersecurity & Zero-Days (The Hacker News, BleepingComputer, KrebsOnSecurity)
- Cloud, Enterprise IT & Networking (The Register, Ars Technica)
- Linux & Open Source Systems (Phoronix)
Updates assets/js/news-data.js with validated, structured content.
"""

import os
import re
import html
import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from email.utils import parsedate_to_datetime

FEED_SOURCES = [
    {
        "name": "The Hacker News",
        "url": "https://feeds.feedburner.com/TheHackersNews",
        "default_category": "Cybersecurity",
        "location": "San Francisco, California, USA",
        "limit": 4
    },
    {
        "name": "BleepingComputer",
        "url": "https://www.bleepingcomputer.com/feed/",
        "default_category": "Cybersecurity",
        "location": "New York City, New York, USA",
        "limit": 4
    },
    {
        "name": "The Register",
        "url": "https://www.theregister.com/headlines.atom",
        "default_category": "Cloud & Enterprise IT",
        "location": "London, United Kingdom",
        "limit": 4
    },
    {
        "name": "Ars Technica IT",
        "url": "https://feeds.arstechnica.com/arstechnica/technology-lab",
        "default_category": "IT Infrastructure",
        "location": "Boston, Massachusetts, USA",
        "limit": 4
    },
    {
        "name": "Phoronix",
        "url": "https://www.phoronix.com/rss.php",
        "default_category": "Linux & Open Source",
        "location": "Chicago, Illinois, USA",
        "limit": 3
    },
    {
        "name": "Krebs on Security",
        "url": "https://krebsonsecurity.com/feed/",
        "default_category": "Cybersecurity",
        "location": "Washington, D.C., USA",
        "limit": 2
    }
]

def clean_html(raw_html):
    if not raw_html:
        return ""
    # Strip HTML tags
    clean = re.sub(r'<[^>]+>', ' ', raw_html)
    # Unescape HTML entities
    clean = html.unescape(clean)
    # Normalize whitespaces
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def detect_category(title, summary, default_cat):
    text = (title + " " + summary).lower()
    if any(k in text for k in ["linux", "kernel", "ubuntu", "debian", "open-source", "gnome", "wayland", "phoronix"]):
        return "Linux & Open Source"
    if any(k in text for k in ["ransomware", "vulnerability", "malware", "zero-day", "hacked", "breach", "cve-", "exploit", "phishing", "ddos"]):
        return "Cybersecurity"
    if any(k in text for k in ["cloud", "azure", "aws", "kubernetes", "devops", "datacenter", "server", "docker", "sysadmin"]):
        return "Cloud & Enterprise IT"
    if any(k in text for k in ["windows", "microsoft 365", "copilot", "windows 11", "powershell", "active directory", "smb"]):
        return "Windows & Systems"
    if any(k in text for k in ["router", "switch", "vpn", "firewall", "dns", "bgp", "ethernet", "wi-fi", "tcp", "ssh"]):
        return "Networking & IT"
    if any(k in text for k in ["ai", "llm", "nvidia", "intel", "amd", "gpu", "quantum", "chip"]):
        return "AI & Hardware"
    return default_cat

def estimate_read_time(text):
    words = len(text.split())
    minutes = max(2, round(words / 45))
    return f"{minutes} min read"

def fetch_feed_items(source):
    items = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 IHSByteNews/1.0'
    }
    
    try:
        req = urllib.request.Request(source['url'], headers=headers)
        with urllib.request.urlopen(req, timeout=12) as response:
            content = response.read()
            
        root = ET.fromstring(content)
        
        # Check if RSS or Atom
        is_atom = 'atom' in root.tag.lower()
        
        entries = root.findall('.//{http://www.w3.org/2005/Atom}entry') if is_atom else root.findall('.//item')
        if not entries and is_atom:
            entries = root.findall('.//entry')
            
        for entry in entries[:source['limit']]:
            try:
                # Title
                title_elem = entry.find('{http://www.w3.org/2005/Atom}title') if is_atom else entry.find('title')
                title = clean_html(title_elem.text) if title_elem is not None and title_elem.text else ""
                if not title:
                    continue
                
                # Link
                link = ""
                if is_atom:
                    link_elem = entry.find('{http://www.w3.org/2005/Atom}link')
                    if link_elem is not None:
                        link = link_elem.attrib.get('href', '')
                else:
                    link_elem = entry.find('link')
                    link = link_elem.text if link_elem is not None and link_elem.text else ""
                
                # Summary / Content
                desc_elem = entry.find('{http://www.w3.org/2005/Atom}summary') if is_atom else entry.find('description')
                if desc_elem is None and is_atom:
                    desc_elem = entry.find('{http://www.w3.org/2005/Atom}content')
                
                raw_desc = desc_elem.text if desc_elem is not None and desc_elem.text else ""
                clean_desc = clean_html(raw_desc)
                if len(clean_desc) > 320:
                    clean_desc = clean_desc[:317] + "..."
                if not clean_desc:
                    clean_desc = f"Latest technology analysis and IT sector intelligence published by {source['name']}."
                
                # Date
                date_elem = entry.find('{http://www.w3.org/2005/Atom}published') if is_atom else entry.find('pubDate')
                if date_elem is None and is_atom:
                    date_elem = entry.find('{http://www.w3.org/2005/Atom}updated')
                
                pub_dt = datetime.now()
                date_str = pub_dt.strftime("%B %d, %Y")
                iso_str = pub_dt.strftime("%Y-%m-%d")
                
                if date_elem is not None and date_elem.text:
                    try:
                        # Try RFC 2822
                        dt = parsedate_to_datetime(date_elem.text)
                        date_str = dt.strftime("%B %d, %Y")
                        iso_str = dt.strftime("%Y-%m-%d")
                        pub_dt = dt
                    except Exception:
                        try:
                            # Try ISO 8601
                            iso_cleaned = date_elem.text.replace('Z', '+00:00')
                            dt = datetime.fromisoformat(iso_cleaned)
                            date_str = dt.strftime("%B %d, %Y")
                            iso_str = dt.strftime("%Y-%m-%d")
                            pub_dt = dt
                        except Exception:
                            pass
                
                category = detect_category(title, clean_desc, source['default_category'])
                slug_id = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')[:60]
                
                # Detailed full content for modal reader
                full_body = f"""
                  <p>{html.escape(clean_desc)}</p>
                  <h3>Key Takeaways &amp; Technical Analysis</h3>
                  <p>This report highlights critical shifts in the modern enterprise and computing ecosystem. Organizations and IT specialists should review existing configurations, audit dependency chains, and monitor official advisories to mitigate operational risks.</p>
                  <p><strong>Primary Source:</strong> Published by <em>{html.escape(source['name'])}</em> in {html.escape(source['location'])}. For technical documentation and direct updates, consult the original bulletin.</p>
                  <div style="margin-top: 1.5rem;">
                    <a href="{html.escape(link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                      Visit Original Source at {html.escape(source['name'])} &rarr;
                    </a>
                  </div>
                """
                
                items.append({
                    "id": slug_id,
                    "title": title,
                    "category": category,
                    "date": date_str,
                    "isoDate": iso_str,
                    "readTime": estimate_read_time(clean_desc + " " + title),
                    "author": source['name'] + " Editorial",
                    "source": source['name'],
                    "location": source['location'],
                    "sourceUrl": link,
                    "featured": False,
                    "summary": clean_desc,
                    "tags": [category, source['name'], "IT Intelligence"],
                    "content": full_body,
                    "_timestamp": pub_dt.timestamp() if hasattr(pub_dt, 'timestamp') else 0
                })
            except Exception as item_err:
                continue
                
        print(f"[{source['name']}] Successfully fetched {len(items)} articles.")
    except Exception as e:
        print(f"[{source['name']}] Warning - Failed to fetch feed: {e}")
        
    return items

def main():
    print("=" * 60)
    print("IHSByte - Automated IT & Tech News Fetcher Starting")
    print(f"Execution Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    all_articles = []
    for source in FEED_SOURCES:
        all_articles.extend(fetch_feed_items(source))
        
    if not all_articles:
        print("Error: No articles could be fetched from any source. Keeping existing catalog.")
        return
        
    # Sort articles by publication timestamp descending
    all_articles.sort(key=lambda x: x.get('_timestamp', 0), reverse=True)
    
    # Deduplicate by title similarity
    unique_articles = []
    seen_titles = set()
    for art in all_articles:
        normalized = re.sub(r'\W+', '', art['title'].lower()[:40])
        if normalized not in seen_titles:
            seen_titles.add(normalized)
            unique_articles.append(art)
            
    # Limit to top 15 most important fresh articles across all IT sectors
    final_articles = unique_articles[:15]
    if final_articles:
        final_articles[0]['featured'] = True
        
    # Remove temporary timestamp key before writing
    for art in final_articles:
        art.pop('_timestamp', None)
        
    # Generate JavaScript file content
    js_output = f"""/**
 * IHSByte - Automated Tech & IT Industry News Catalog
 * Automatically aggregated from global authoritative sources:
 * - Cybersecurity (The Hacker News, BleepingComputer, KrebsOnSecurity)
 * - Cloud, Enterprise IT & Networking (The Register, Ars Technica)
 * - Linux, Kernel & Open Source (Phoronix)
 * 
 * Last Automated Sync: {datetime.now().strftime('%B %d, %Y %H:%M:%S UTC')}
 */

const NEWS_DATA = {json.dumps(final_articles, indent=2)};

if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{ NEWS_DATA }};
}}
"""

    output_path = os.path.join(os.path.dirname(__file__), "..", "assets", "js", "news-data.js")
    output_path = os.path.abspath(output_path)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_output)
        
    print("=" * 60)
    print(f"Success! {len(final_articles)} live IT news stories saved to {output_path}")
    print("=" * 60)

if __name__ == "__main__":
    main()
