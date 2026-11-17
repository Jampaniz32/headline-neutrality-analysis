import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Generate Boxplot SVG
const boxplotSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%">
  <rect width="900" height="500" fill="#ffffff" rx="8"/>
  <text x="450" y="45" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#2c3e50">
    Exhibit 1: Headline Neutrality Index (HNI) Distribution Across Outlets
  </text>
  <text x="450" y="70" font-family="Arial, sans-serif" font-size="13" text-anchor="middle" fill="#7f8c8d">
    Benchmark Sample: 20 Headlines across 4 Controlled Socio-Economic Events
  </text>

  <!-- Y-Axis Grid Lines & Labels -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="120" y1="110" x2="840" y2="110"/>
    <line x1="120" y1="165" x2="840" y2="165"/>
    <line x1="120" y1="220" x2="840" y2="220"/>
    <line x1="120" y1="275" x2="840" y2="275"/>
    <line x1="120" y1="330" x2="840" y2="330"/>
    <line x1="120" y1="385" x2="840" y2="385"/>
  </g>

  <!-- Y-Axis Labels -->
  <g font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="end">
    <text x="110" y="115">12.0</text>
    <text x="110" y="170">9.6</text>
    <text x="110" y="225">7.2</text>
    <text x="110" y="280">4.8</text>
    <text x="110" y="335">2.4</text>
    <text x="110" y="390">0.0</text>
  </g>
  <text x="50" y="250" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#334155" transform="rotate(-90 50 250)" text-anchor="middle">
    Headline Neutrality Index (HNI)
  </text>

  <!-- Threshold Lines -->
  <line x1="120" y1="133" x2="840" y2="133" stroke="#10b981" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="835" y="127" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#10b981" text-anchor="end">
    Wire Factual Threshold (HNI ≥ 11.0)
  </text>

  <line x1="120" y1="225" x2="840" y2="225" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="835" y="219" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#f59e0b" text-anchor="end">
    Moderate Narrative Threshold (HNI ≥ 7.0)
  </text>

  <!-- Box 1: Reuters (Mean 12.0) -->
  <g transform="translate(190, 0)">
    <line x1="0" y1="110" x2="0" y2="110" stroke="#059669" stroke-width="2"/>
    <rect x="-35" y="105" width="70" height="10" fill="#a7f3d0" stroke="#059669" stroke-width="2" rx="4"/>
    <circle cx="0" cy="110" r="6" fill="#047857"/>
    <text x="0" y="420" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Reuters</text>
    <text x="0" y="440" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">12.00</text>
  </g>

  <!-- Box 2: Associated Press (Mean 12.0) -->
  <g transform="translate(330, 0)">
    <line x1="0" y1="110" x2="0" y2="110" stroke="#059669" stroke-width="2"/>
    <rect x="-35" y="105" width="70" height="10" fill="#a7f3d0" stroke="#059669" stroke-width="2" rx="4"/>
    <circle cx="0" cy="110" r="6" fill="#047857"/>
    <text x="0" y="420" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Assoc. Press</text>
    <text x="0" y="440" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#059669" text-anchor="middle">12.00</text>
  </g>

  <!-- Box 3: BBC (Mean 9.0) -->
  <g transform="translate(470, 0)">
    <line x1="0" y1="179" x2="0" y2="179" stroke="#2563eb" stroke-width="2"/>
    <rect x="-35" y="174" width="70" height="10" fill="#bfdbfe" stroke="#2563eb" stroke-width="2" rx="4"/>
    <circle cx="0" cy="179" r="6" fill="#1d4ed8"/>
    <text x="0" y="420" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">BBC News</text>
    <text x="0" y="440" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">9.00</text>
  </g>

  <!-- Box 4: CNN (Mean 4.5) -->
  <g transform="translate(610, 0)">
    <line x1="0" y1="247" x2="0" y2="316" stroke="#ea580c" stroke-width="2"/>
    <line x1="-15" y1="247" x2="15" y2="247" stroke="#ea580c" stroke-width="2"/>
    <line x1="-15" y1="316" x2="15" y2="316" stroke="#ea580c" stroke-width="2"/>
    <rect x="-35" y="270" width="70" height="24" fill="#fed7aa" stroke="#ea580c" stroke-width="2" rx="4"/>
    <circle cx="0" cy="282" r="6" fill="#c2410c"/>
    <text x="0" y="420" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">CNN</text>
    <text x="0" y="440" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#ea580c" text-anchor="middle">4.50</text>
  </g>

  <!-- Box 5: Fox News (Mean 1.5) -->
  <g transform="translate(750, 0)">
    <line x1="0" y1="316" x2="0" y2="385" stroke="#dc2626" stroke-width="2"/>
    <line x1="-15" y1="316" x2="15" y2="316" stroke="#dc2626" stroke-width="2"/>
    <line x1="-15" y1="385" x2="15" y2="385" stroke="#dc2626" stroke-width="2"/>
    <rect x="-35" y="335" width="70" height="35" fill="#fecaca" stroke="#dc2626" stroke-width="2" rx="4"/>
    <circle cx="0" cy="350" r="6" fill="#b91c1c"/>
    <text x="0" y="420" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">Fox News</text>
    <text x="0" y="440" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#dc2626" text-anchor="middle">1.50</text>
  </g>
</svg>`;

// 2. Generate Hierarchical Dendrogram SVG
const dendrogramSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 480" width="100%" height="100%">
  <rect width="850" height="480" fill="#ffffff" rx="8"/>
  <text x="425" y="45" font-family="Arial, sans-serif" font-size="19" font-weight="bold" text-anchor="middle" fill="#1e293b">
    Exhibit 2: Hierarchical Clustering Dendrogram of Media Outlets
  </text>
  <text x="425" y="70" font-family="Arial, sans-serif" font-size="13" text-anchor="middle" fill="#64748b">
    Unsupervised Ward Linkage across Emotional Intensity, Loaded Language &amp; Presupposition
  </text>

  <!-- Axes -->
  <line x1="120" y1="370" x2="760" y2="370" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="120" y1="370" x2="120" y2="100" stroke="#cbd5e1" stroke-width="2"/>

  <!-- Y Distance Axis -->
  <g font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="end">
    <text x="110" y="375">0.0</text>
    <text x="110" y="300">2.0</text>
    <text x="110" y="230">4.0</text>
    <text x="110" y="160">6.0</text>
    <text x="110" y="105">8.0</text>
  </g>
  <text x="55" y="240" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#334155" transform="rotate(-90 55 240)" text-anchor="middle">
    Euclidean Cluster Distance (Ward Linkage)
  </text>

  <!-- Cut line -->
  <line x1="120" y1="210" x2="760" y2="210" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="750" y="202" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ef4444" text-anchor="end">
    k = 3 Archetype Cut (Distance = 4.5)
  </text>

  <!-- Tree Structure -->
  <!-- Reuters (x=200) & AP (x=320) connect at d=0.2 (y=362) -->
  <line x1="200" y1="370" x2="200" y2="362" stroke="#059669" stroke-width="3"/>
  <line x1="320" y1="370" x2="320" y2="362" stroke="#059669" stroke-width="3"/>
  <line x1="200" y1="362" x2="320" y2="362" stroke="#059669" stroke-width="3"/>

  <!-- CNN (x=580) & Fox News (x=700) connect at d=2.4 (y=285) -->
  <line x1="580" y1="370" x2="580" y2="285" stroke="#dc2626" stroke-width="3"/>
  <line x1="700" y1="370" x2="700" y2="285" stroke="#dc2626" stroke-width="3"/>
  <line x1="580" y1="285" x2="700" y2="285" stroke="#dc2626" stroke-width="3"/>

  <!-- Wire Cluster (x=260) connects with BBC (x=450) at d=4.0 (y=230) -->
  <line x1="260" y1="362" x2="260" y2="230" stroke="#2563eb" stroke-width="3"/>
  <line x1="450" y1="370" x2="450" y2="230" stroke="#2563eb" stroke-width="3"/>
  <line x1="260" y1="230" x2="450" y2="230" stroke="#2563eb" stroke-width="3"/>

  <!-- Factual/Narrative Branch (x=355) joins Cable News Branch (x=640) at root d=7.5 (y=110) -->
  <line x1="355" y1="230" x2="355" y2="110" stroke="#475569" stroke-width="3"/>
  <line x1="640" y1="285" x2="640" y2="110" stroke="#475569" stroke-width="3"/>
  <line x1="355" y1="110" x2="640" y2="110" stroke="#475569" stroke-width="3"/>

  <!-- Leaf Labels -->
  <g font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">
    <text x="200" y="400">Reuters</text>
    <text x="200" y="420" font-size="11" fill="#059669">Cluster 1 (Wire)</text>

    <text x="320" y="400">Assoc. Press</text>
    <text x="320" y="420" font-size="11" fill="#059669">Cluster 1 (Wire)</text>

    <text x="450" y="400">BBC News</text>
    <text x="450" y="420" font-size="11" fill="#2563eb">Cluster 2 (Public)</text>

    <text x="580" y="400">CNN</text>
    <text x="580" y="420" font-size="11" fill="#dc2626">Cluster 3 (Cable)</text>

    <text x="700" y="400">Fox News</text>
    <text x="700" y="420" font-size="11" fill="#dc2626">Cluster 3 (Cable)</text>
  </g>
</svg>`;

// 3. Generate Decision Tree Flowchart SVG
const treeSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 480" width="100%" height="100%">
  <rect width="920" height="480" fill="#ffffff" rx="8"/>
  <text x="460" y="40" font-family="Arial, sans-serif" font-size="19" font-weight="bold" text-anchor="middle" fill="#1e293b">
    Exhibit 3: Explainable Decision Tree for Newsroom Neutrality Auditing
  </text>
  <text x="460" y="65" font-family="Arial, sans-serif" font-size="13" text-anchor="middle" fill="#64748b">
    Auditable Rules for Non-Technical Editors (Gini Impurity Splits, max_depth = 2)
  </text>

  <!-- Root Node -->
  <g transform="translate(360, 95)">
    <rect x="0" y="0" width="200" height="70" rx="8" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
    <text x="100" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#0369a1" text-anchor="middle">Loaded Language ≤ 2.5</text>
    <text x="100" y="42" font-family="Arial, sans-serif" font-size="11" fill="#334155" text-anchor="middle">Samples = 20 | Gini = 0.62</text>
    <text x="100" y="58" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#0c4a6e" text-anchor="middle">Split Decision</text>
  </g>

  <!-- Left Branch (True) -->
  <line x1="410" y1="165" x2="230" y2="225" stroke="#64748b" stroke-width="2"/>
  <text x="300" y="185" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#059669">True (Low Bias)</text>

  <!-- Right Branch (False) -->
  <line x1="510" y1="165" x2="690" y2="225" stroke="#64748b" stroke-width="2"/>
  <text x="610" y="185" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#dc2626">False (High Bias)</text>

  <!-- Node 2 (Left child) -->
  <g transform="translate(130, 225)">
    <rect x="0" y="0" width="200" height="70" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="100" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#15803d" text-anchor="middle">Emotional Intensity ≤ 1.5</text>
    <text x="100" y="42" font-family="Arial, sans-serif" font-size="11" fill="#334155" text-anchor="middle">Samples = 12 | Gini = 0.44</text>
    <text x="100" y="58" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#14532d" text-anchor="middle">Split Decision</text>
  </g>

  <!-- Node 3 (Right child) -->
  <g transform="translate(590, 225)">
    <rect x="0" y="0" width="200" height="70" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="100" y="24" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#b91c1c" text-anchor="middle">Presupposition ≥ 3.5</text>
    <text x="100" y="42" font-family="Arial, sans-serif" font-size="11" fill="#334155" text-anchor="middle">Samples = 8 | Gini = 0.38</text>
    <text x="100" y="58" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#7f1d1d" text-anchor="middle">Split Decision</text>
  </g>

  <!-- Leaf Connectors -->
  <line x1="180" y1="295" x2="100" y2="355" stroke="#64748b" stroke-width="1.5"/>
  <line x1="280" y1="295" x2="340" y2="355" stroke="#64748b" stroke-width="1.5"/>
  <line x1="640" y1="295" x2="570" y2="355" stroke="#64748b" stroke-width="1.5"/>
  <line x1="740" y1="295" x2="810" y2="355" stroke="#64748b" stroke-width="1.5"/>

  <!-- Leaf 1: Wire Factual -->
  <g transform="translate(15, 355)">
    <rect x="0" y="0" width="170" height="65" rx="6" fill="#10b981" stroke="#047857" stroke-width="2"/>
    <text x="85" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Wire Factual</text>
    <text x="85" y="42" font-family="Arial, sans-serif" font-size="11" fill="#ecfdf5" text-anchor="middle">HNI: 11 - 12 (100% Pure)</text>
    <text x="85" y="56" font-family="Arial, sans-serif" font-size="10" fill="#a7f3d0" text-anchor="middle">Reuters &amp; AP Outlets</text>
  </g>

  <!-- Leaf 2: Moderate Narrative -->
  <g transform="translate(255, 355)">
    <rect x="0" y="0" width="170" height="65" rx="6" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
    <text x="85" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Moderate Narrative</text>
    <text x="85" y="42" font-family="Arial, sans-serif" font-size="11" fill="#eff6ff" text-anchor="middle">HNI: 8 - 10 (Mild Drama)</text>
    <text x="85" y="56" font-family="Arial, sans-serif" font-size="10" fill="#bfdbfe" text-anchor="middle">BBC News (Idioms)</text>
  </g>

  <!-- Leaf 3: Commercial Affective -->
  <g transform="translate(490, 355)">
    <rect x="0" y="0" width="170" height="65" rx="6" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
    <text x="85" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Affective Framing</text>
    <text x="85" y="42" font-family="Arial, sans-serif" font-size="11" fill="#fff7ed" text-anchor="middle">HNI: 4 - 6 (Polarized)</text>
    <text x="85" y="56" font-family="Arial, sans-serif" font-size="10" fill="#fed7aa" text-anchor="middle">CNN (Sensational)</text>
  </g>

  <!-- Leaf 4: Partisan Polemic -->
  <g transform="translate(730, 355)">
    <rect x="0" y="0" width="170" height="65" rx="6" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
    <text x="85" y="24" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Partisan Polemic</text>
    <text x="85" y="42" font-family="Arial, sans-serif" font-size="11" fill="#fef2f2" text-anchor="middle">HNI: 0 - 3 (High Presupp.)</text>
    <text x="85" y="56" font-family="Arial, sans-serif" font-size="10" fill="#fecaca" text-anchor="middle">Fox News (Catchphrases)</text>
  </g>
</svg>`;

// Write the files
fs.writeFileSync(path.join(__dirname, "eda_hni_distribution.svg"), boxplotSvg);
fs.writeFileSync(path.join(__dirname, "hierarchical_clustering_dendrogram.svg"), dendrogramSvg);
fs.writeFileSync(path.join(__dirname, "decision_tree_managerial.svg"), treeSvg);

console.log("✓ All presentation graphics generated in SVG format successfully!");
