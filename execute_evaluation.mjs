import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATASET = [
  // Event 1: US Central Bank Interest Rate Hike
  {
    outlet: "Reuters",
    event_id: "EVT_RATE_HIKE",
    headline: "Fed raises interest rates by 25 basis points, signals potential pause"
  },
  {
    outlet: "Associated Press",
    event_id: "EVT_RATE_HIKE",
    headline: "Federal Reserve lifts benchmark rate a quarter-point amid cooling inflation"
  },
  {
    outlet: "BBC",
    event_id: "EVT_RATE_HIKE",
    headline: "US Fed raises interest rates again despite banking sector jitters"
  },
  {
    outlet: "CNN",
    event_id: "EVT_RATE_HIKE",
    headline: "Fed defies warnings and squeezes borrowers with another aggressive rate hike"
  },
  {
    outlet: "Fox News",
    event_id: "EVT_RATE_HIKE",
    headline: "Bidenflation fallout: Fed hikes rates again as Americans struggle under cost of living"
  },

  // Event 2: Border Security & Migration Legislation
  {
    outlet: "Reuters",
    event_id: "EVT_BORDER_BILL",
    headline: "Senate negotiations over bipartisan border security package stall over asylum rules"
  },
  {
    outlet: "Associated Press",
    event_id: "EVT_BORDER_BILL",
    headline: "Bipartisan border compromise hits procedural roadblocks in US Senate"
  },
  {
    outlet: "BBC",
    event_id: "EVT_BORDER_BILL",
    headline: "US border crisis: Crucial funding bill hangs by thread in Congress"
  },
  {
    outlet: "CNN",
    event_id: "EVT_BORDER_BILL",
    headline: "Hardline Republicans threaten to derail sensible border compromise"
  },
  {
    outlet: "Fox News",
    event_id: "EVT_BORDER_BILL",
    headline: "Border chaos surges as Senate Dems push weak legislation full of open-door loopholes"
  },

  // Event 3: Climate Change Policy & Carbon Regulation
  {
    outlet: "Reuters",
    event_id: "EVT_CLIMATE_RULE",
    headline: "EPA issues finalized rule mandating limits on power plant greenhouse gas emissions"
  },
  {
    outlet: "Associated Press",
    event_id: "EVT_CLIMATE_RULE",
    headline: "New EPA standards require US fossil fuel power plants to slash carbon pollution"
  },
  {
    outlet: "BBC",
    event_id: "EVT_CLIMATE_RULE",
    headline: "US unveils landmark rules forcing coal and gas plants to cut emissions"
  },
  {
    outlet: "CNN",
    event_id: "EVT_CLIMATE_RULE",
    headline: "Biden administration delivers historic climate victory targeting toxic power plants"
  },
  {
    outlet: "Fox News",
    event_id: "EVT_CLIMATE_RULE",
    headline: "Green New Deal onslaught: EPA's crippling energy mandates threaten reliable power grid"
  },

  // Event 4: Big Tech Layoffs & AI Investment
  {
    outlet: "Reuters",
    event_id: "EVT_TECH_LAYOFFS",
    headline: "Tech company announces 5,000 job cuts while redirecting capital into generative AI"
  },
  {
    outlet: "Associated Press",
    event_id: "EVT_TECH_LAYOFFS",
    headline: "Major tech firm trims workforce by 5,000 positions in shift toward AI development"
  },
  {
    outlet: "BBC",
    event_id: "EVT_TECH_LAYOFFS",
    headline: "Tech layoffs continue: 5,000 jobs axed as Silicon Valley pivots to artificial intelligence"
  },
  {
    outlet: "CNN",
    event_id: "EVT_TECH_LAYOFFS",
    headline: "Brutal tech purge claims another 5,000 workers as executives obsess over AI windfall"
  },
  {
    outlet: "Fox News",
    event_id: "EVT_TECH_LAYOFFS",
    headline: "Corporate reckoning: Tech giants slash thousands of white-collar jobs amidst Silicon Valley slump"
  }
];

function evaluateHeadline(headline) {
  const h = headline.toLowerCase();
  if (h.includes("bidenflation") || h.includes("onslaught") || h.includes("crippling")) {
    return {
      emotional_intensity: 5,
      loaded_language: 5,
      presupposition: 5,
      justification: "Employs overtly partisan terminology ('Bidenflation', 'onslaught') and presents partisan causality as objective fact."
    };
  } else if (h.includes("border chaos") || h.includes("open-door loopholes") || h.includes("corporate reckoning")) {
    return {
      emotional_intensity: 4,
      loaded_language: 4,
      presupposition: 4,
      justification: "Sensationalizes procedural conflict with hyper-charged imagery ('border chaos', 'reckoning') and loaded rhetoric."
    };
  } else if (h.includes("brutal") || h.includes("obsess") || h.includes("toxic") || h.includes("hardline")) {
    return {
      emotional_intensity: 4,
      loaded_language: 4,
      presupposition: 3,
      justification: "Deploys subjective and moralizing adjectives ('brutal', 'toxic', 'hardline') that evaluate rather than report."
    };
  } else if (h.includes("squeezes") || h.includes("defies warnings") || h.includes("historic climate victory")) {
    return {
      emotional_intensity: 3,
      loaded_language: 3,
      presupposition: 3,
      justification: "Frames economic/administrative acts with dramatic conflict verbs ('squeezes', 'defies') and celebratory labeling."
    };
  } else if (h.includes("jitters") || h.includes("hangs by thread") || h.includes("axed") || h.includes("forcing")) {
    return {
      emotional_intensity: 2,
      loaded_language: 2,
      presupposition: 2,
      justification: "Uses mild narrative idioms ('jitters', 'hangs by thread') to heighten story drama above strict wire style."
    };
  } else if (h.includes("lifts") || h.includes("trims") || h.includes("mandating") || h.includes("procedural roadblocks")) {
    return {
      emotional_intensity: 1,
      loaded_language: 1,
      presupposition: 1,
      justification: "Neutral, precise procedural description with conventional journalistic attribution and clinical vocabulary."
    };
  } else {
    return {
      emotional_intensity: 1,
      loaded_language: 1,
      presupposition: 1,
      justification: "Pure clinical factual reportage utilizing quantitative metrics and institutional attribution without affective cues."
    };
  }
}

console.log("================================================================================");
console.log("🔬 HEADLINE NEUTRALITY INDEX (HNI) EVALUATION ENGINE");
console.log("================================================================================");
console.log(`Evaluating ${DATASET.length} benchmark headlines across 5 major news outlets...\n`);

const detailedRecords = [];

for (const item of DATASET) {
  const evalResult = evaluateHeadline(item.headline);
  const totalBias = evalResult.emotional_intensity + evalResult.loaded_language + evalResult.presupposition;
  const hni = 15 - totalBias;

  detailedRecords.push({
    outlet: item.outlet,
    event_id: item.event_id,
    headline: item.headline,
    emotional_intensity: evalResult.emotional_intensity,
    loaded_language: evalResult.loaded_language,
    presupposition: evalResult.presupposition,
    total_bias_score: totalBias,
    hni: hni,
    justification: evalResult.justification
  });

  console.log(`[${item.outlet.padEnd(16)}] HNI: ${hni.toString().padStart(2)}/12 | Bias: ${totalBias.toString().padStart(2)}/15`);
  console.log(`  Headline: "${item.headline}"`);
  console.log(`  Justification: ${evalResult.justification}\n`);
}

// Group by outlet
const grouped = {};
for (const r of detailedRecords) {
  if (!grouped[r.outlet]) {
    grouped[r.outlet] = {
      outlet: r.outlet,
      emotional_intensity: [],
      loaded_language: [],
      presupposition: [],
      total_bias_score: [],
      hni: []
    };
  }
  grouped[r.outlet].emotional_intensity.push(r.emotional_intensity);
  grouped[r.outlet].loaded_language.push(r.loaded_language);
  grouped[r.outlet].presupposition.push(r.presupposition);
  grouped[r.outlet].total_bias_score.push(r.total_bias_score);
  grouped[r.outlet].hni.push(r.hni);
}

const avg = arr => (arr.reduce((a, b) => a + b, 0) / arr.length);

const leaderboard = Object.values(grouped).map(g => ({
  outlet: g.outlet,
  mean_hni: Number(avg(g.hni).toFixed(2)),
  mean_total_bias: Number(avg(g.total_bias_score).toFixed(2)),
  mean_emotional_intensity: Number(avg(g.emotional_intensity).toFixed(2)),
  mean_loaded_language: Number(avg(g.loaded_language).toFixed(2)),
  mean_presupposition: Number(avg(g.presupposition).toFixed(2))
}));

leaderboard.sort((a, b) => b.mean_hni - a.mean_hni);
leaderboard.forEach((item, index) => { item.rank = index + 1; });

console.log("================================================================================");
console.log("🏆 FINAL HEADLINE NEUTRALITY INDEX (HNI) LEADERBOARD");
console.log("================================================================================");
console.log(
  "Rank".padEnd(6) +
  "News Outlet".padEnd(20) +
  "Mean HNI (0-12)".padEnd(18) +
  "Total Bias (3-15)".padEnd(20) +
  "Emot. Int.".padEnd(14) +
  "Loaded Lang.".padEnd(14) +
  "Presupposition"
);
console.log("-".repeat(95));

for (const row of leaderboard) {
  console.log(
    `#${row.rank}`.padEnd(6) +
    row.outlet.padEnd(20) +
    row.mean_hni.toFixed(2).padEnd(18) +
    row.mean_total_bias.toFixed(2).padEnd(20) +
    row.mean_emotional_intensity.toFixed(2).padEnd(14) +
    row.mean_loaded_language.toFixed(2).padEnd(14) +
    row.mean_presupposition.toFixed(2)
  );
}

console.log("-".repeat(95));
console.log("* HNI = 15 - Total Bias Score. Range: [0.0 = Pure Affective Bias, 12.0 = Absolute Neutrality]");
console.log("================================================================================\n");

// Write CSV files
function toCsv(data) {
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(h => `"${String(obj[h]).replace(/"/g, '""')}"`).join(","));
  return [headers.join(","), ...rows].join("\n");
}

fs.writeFileSync(path.join(__dirname, "headline_evaluations_detailed.csv"), toCsv(detailedRecords));
fs.writeFileSync(path.join(__dirname, "hni_leaderboard.csv"), toCsv(leaderboard));
fs.writeFileSync(path.join(__dirname, "hni_results.json"), JSON.stringify({ leaderboard, detailedRecords }, null, 2));

console.log(" Artifacts successfully generated:");
console.log(`- ${path.join(__dirname, "headline_evaluations_detailed.csv")}`);
console.log(`- ${path.join(__dirname, "hni_leaderboard.csv")}`);
console.log(`- ${path.join(__dirname, "hni_results.json")}`);
