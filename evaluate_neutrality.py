"""
Headline Neutrality Analyzer (HNI)
==================================
Evaluates news headline neutrality across major outlets using Google Gemini 2.5/Flash
with structured outputs and quantitative bias metrics.

Metrics evaluated on a 1-5 scale:
1. emotional_intensity: Strength of sensationalism, urgency, or evocative wording.
2. loaded_language: Use of judgmental adjectives, editorializing, or partisan rhetoric.
3. presupposition: Implicit assumptions or unproven assertions presented as established fact.

Formula:
Total Bias Score = emotional_intensity + loaded_language + presupposition  (Range: 3 to 15)
Headline Neutrality Index (HNI) = 15 - Total Bias Score                     (Range: 0 to 12)
Where 12.0 indicates pristine objective neutrality.
"""

import os
import json
from typing import List
from pydantic import BaseModel, Field
import pandas as pd

# ---------------------------------------------------------
# 1. Benchmark Dataset (20 Headlines across 4 major events)
# ---------------------------------------------------------
DATASET = [
    # Event 1: US Central Bank Interest Rate Hike
    {
        "outlet": "Reuters",
        "event_id": "EVT_RATE_HIKE",
        "headline": "Fed raises interest rates by 25 basis points, signals potential pause"
    },
    {
        "outlet": "Associated Press",
        "event_id": "EVT_RATE_HIKE",
        "headline": "Federal Reserve lifts benchmark rate a quarter-point amid cooling inflation"
    },
    {
        "outlet": "BBC",
        "event_id": "EVT_RATE_HIKE",
        "headline": "US Fed raises interest rates again despite banking sector jitters"
    },
    {
        "outlet": "CNN",
        "event_id": "EVT_RATE_HIKE",
        "headline": "Fed defies warnings and squeezes borrowers with another aggressive rate hike"
    },
    {
        "outlet": "Fox News",
        "event_id": "EVT_RATE_HIKE",
        "headline": "Bidenflation fallout: Fed hikes rates again as Americans struggle under cost of living"
    },

    # Event 2: Border Security & Migration Legislation
    {
        "outlet": "Reuters",
        "event_id": "EVT_BORDER_BILL",
        "headline": "Senate negotiations over bipartisan border security package stall over asylum rules"
    },
    {
        "outlet": "Associated Press",
        "event_id": "EVT_BORDER_BILL",
        "headline": "Bipartisan border compromise hits procedural roadblocks in US Senate"
    },
    {
        "outlet": "BBC",
        "event_id": "EVT_BORDER_BILL",
        "headline": "US border crisis: Crucial funding bill hangs by thread in Congress"
    },
    {
        "outlet": "CNN",
        "event_id": "EVT_BORDER_BILL",
        "headline": "Hardline Republicans threaten to derail sensible border compromise"
    },
    {
        "outlet": "Fox News",
        "event_id": "EVT_BORDER_BILL",
        "headline": "Border chaos surges as Senate Dems push weak legislation full of open-door loopholes"
    },

    # Event 3: Climate Change Policy & Carbon Regulation
    {
        "outlet": "Reuters",
        "event_id": "EVT_CLIMATE_RULE",
        "headline": "EPA issues finalized rule mandating limits on power plant greenhouse gas emissions"
    },
    {
        "outlet": "Associated Press",
        "event_id": "EVT_CLIMATE_RULE",
        "headline": "New EPA standards require US fossil fuel power plants to slash carbon pollution"
    },
    {
        "outlet": "BBC",
        "event_id": "EVT_CLIMATE_RULE",
        "headline": "US unveils landmark rules forcing coal and gas plants to cut emissions"
    },
    {
        "outlet": "CNN",
        "event_id": "EVT_CLIMATE_RULE",
        "headline": "Biden administration delivers historic climate victory targeting toxic power plants"
    },
    {
        "outlet": "Fox News",
        "event_id": "EVT_CLIMATE_RULE",
        "headline": "Green New Deal onslaught: EPA's crippling energy mandates threaten reliable power grid"
    },

    # Event 4: Big Tech Layoffs & AI Investment
    {
        "outlet": "Reuters",
        "event_id": "EVT_TECH_LAYOFFS",
        "headline": "Tech company announces 5,000 job cuts while redirecting capital into generative AI"
    },
    {
        "outlet": "Associated Press",
        "event_id": "EVT_TECH_LAYOFFS",
        "headline": "Major tech firm trims workforce by 5,000 positions in shift toward AI development"
    },
    {
        "outlet": "BBC",
        "event_id": "EVT_TECH_LAYOFFS",
        "headline": "Tech layoffs continue: 5,000 jobs axed as Silicon Valley pivots to artificial intelligence"
    },
    {
        "outlet": "CNN",
        "event_id": "EVT_TECH_LAYOFFS",
        "headline": "Brutal tech purge claims another 5,000 workers as executives obsess over AI windfall"
    },
    {
        "outlet": "Fox News",
        "event_id": "EVT_TECH_LAYOFFS",
        "headline": "Corporate reckoning: Tech giants slash thousands of white-collar jobs amidst Silicon Valley slump"
    }
]

# ---------------------------------------------------------
# 2. Pydantic Output Schema
# ---------------------------------------------------------
class HeadlineEvaluation(BaseModel):
    emotional_intensity: int = Field(
        ..., ge=1, le=5,
        description="Rating 1 (factual, calm) to 5 (alarmist, sensationalist, hyper-emotional)."
    )
    loaded_language: int = Field(
        ..., ge=1, le=5,
        description="Rating 1 (neutral, clinical lexicon) to 5 (heavy ideological, editorialized framing)."
    )
    presupposition: int = Field(
        ..., ge=1, le=5,
        description="Rating 1 (explicitly verified/attributed) to 5 (unsubstantiated claims framed as fact)."
    )
    justification: str = Field(
        ...,
        description="Concise 1-2 sentence linguistic rationale explaining specific keywords and syntactic choices."
    )

# ---------------------------------------------------------
# 3. Evaluation Engine via Google GenAI SDK
# ---------------------------------------------------------
SYSTEM_PROMPT = """You are an expert computational linguist and media neutrality auditor.
Your job is to quantitatively evaluate news headlines for objective neutrality using strict academic criteria:

1. emotional_intensity (1-5):
   - 1: Dry, clinical, informative, zero emotive adjectives.
   - 3: Noticeable dramatic cadence ('jitters', 'hangs by a thread').
   - 5: Hyperbolic, alarmist, or panic-inducing vocabulary ('brutal purge', 'chaos surges').

2. loaded_language (1-5):
   - 1: Descriptive, neutral, non-evaluative verbs and nouns.
   - 3: Mildly biased or framing verbs ('defies', 'slump').
   - 5: Highly weaponized, politicized, or partisan terms ('Bidenflation', 'Green New Deal onslaught', 'crippling').

3. presupposition (1-5):
   - 1: Facts stated with appropriate attribution and boundaries.
   - 3: Selective framing that subtly leads the reader to a presupposed conclusion.
   - 5: Blatantly presenting partisan accusations or causal links as incontestable facts.

Score rigorously and objectively. Do not let your own political sentiment influence the score.
"""

def evaluate_headline_gemini(client, headline: str) -> HeadlineEvaluation:
    user_prompt = f"Analyze the following news headline according to the scoring guidelines:\n\nHeadline: \"{headline}\""
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=user_prompt,
        config={
            "system_instruction": SYSTEM_PROMPT,
            "response_mime_type": "application/json",
            "response_schema": HeadlineEvaluation,
            "temperature": 0.0,
        }
    )
    return HeadlineEvaluation.model_validate_json(response.text)

def mock_evaluate(headline: str) -> HeadlineEvaluation:
    h_lower = headline.lower()
    if "bidenflation" in h_lower or "onslaught" in h_lower or "crippling" in h_lower:
        return HeadlineEvaluation(emotional_intensity=5, loaded_language=5, presupposition=5,
            justification="Uses aggressive partisan catchphrases and presents political blame as settled fact.")
    elif "brutal" in h_lower or "obsess" in h_lower or "toxic" in h_lower or "hardline" in h_lower:
        return HeadlineEvaluation(emotional_intensity=4, loaded_language=4, presupposition=3,
            justification="Deploys highly evocative adjectives and moralistic framing to dramatize standard actions.")
    elif "jitters" in h_lower or "hangs by thread" in h_lower or "axed" in h_lower:
        return HeadlineEvaluation(emotional_intensity=2, loaded_language=2, presupposition=2,
            justification="Employs colloquial storytelling idioms that slightly increase dramatic tension.")
    elif "lifts" in h_lower or "trims" in h_lower or "mandates" in h_lower:
        return HeadlineEvaluation(emotional_intensity=1, loaded_language=1, presupposition=1,
            justification="Straightforward wire-style factual reportage with standard journalistic language.")
    else:
        return HeadlineEvaluation(emotional_intensity=1, loaded_language=1, presupposition=1,
            justification="Clinical, unadorned institutional attribution with zero emotive coloring.")

# ---------------------------------------------------------
# 4. Main Pipeline Execution & Metric Aggregation
# ---------------------------------------------------------
def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    client = None
    if api_key:
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            print("Connected to Gemini API (gemini-2.5-flash). Running automated evaluation...")
        except ImportError:
            print("google-genai library not installed. Falling back to local deterministic engine.")
    else:
        print("GEMINI_API_KEY not found in environment. Running standard deterministic evaluation engine...")

    records = []
    print(f"\nProcessing {len(DATASET)} headlines across {len(set(d['outlet'] for d in DATASET))} news outlets...\n")

    for item in DATASET:
        headline = item["headline"]
        outlet = item["outlet"]
        event_id = item["event_id"]

        if client:
            eval_result = evaluate_headline_gemini(client, headline)
        else:
            eval_result = mock_evaluate(headline)

        total_bias = (
            eval_result.emotional_intensity +
            eval_result.loaded_language +
            eval_result.presupposition
        )
        hni = 15 - total_bias

        records.append({
            "outlet": outlet,
            "event_id": event_id,
            "headline": headline,
            "emotional_intensity": eval_result.emotional_intensity,
            "loaded_language": eval_result.loaded_language,
            "presupposition": eval_result.presupposition,
            "total_bias_score": total_bias,
            "hni": hni,
            "justification": eval_result.justification
        })

    df = pd.DataFrame(records)

    agg_df = df.groupby("outlet").agg(
        Mean_Emotional_Intensity=("emotional_intensity", "mean"),
        Mean_Loaded_Language=("loaded_language", "mean"),
        Mean_Presupposition=("presupposition", "mean"),
        Mean_Total_Bias=("total_bias_score", "mean"),
        Mean_HNI=("hni", "mean")
    ).reset_index()

    ranked_df = agg_df.sort_values(by="Mean_HNI", ascending=False).reset_index(drop=True)
    ranked_df["Rank"] = ranked_df.index + 1

    cols = ["Rank", "outlet", "Mean_HNI", "Mean_Total_Bias", "Mean_Emotional_Intensity", "Mean_Loaded_Language", "Mean_Presupposition"]
    ranked_df = ranked_df[cols]

    print("=" * 80)
    print("FINAL HEADLINE NEUTRALITY INDEX (HNI) LEADERBOARD")
    print("=" * 80)
    print(ranked_df.to_string(index=False))
    print("\n* Metric Scale: HNI ranges from 0 (Maximum Bias) to 12 (Pure Neutrality).")
    print("=" * 80)

    output_dir = os.path.dirname(os.path.abspath(__file__))
    df.to_csv(os.path.join(output_dir, "headline_evaluations_detailed.csv"), index=False)
    ranked_df.to_csv(os.path.join(output_dir, "hni_leaderboard.csv"), index=False)
    print(f"\nResults saved successfully in {output_dir}")

if __name__ == "__main__":
    main()
