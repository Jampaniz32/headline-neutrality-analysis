# 📰 Headline Neutrality Index (HNI) Analysis
> **An End-to-End LLM Computational Linguistics & Machine Learning Auditing System**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Jampaniz32/headline-neutrality-analysis/blob/main/headline_neutrality_analysis.ipynb)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Executive Overview & Research Question
**"Which news source is the most neutral in its headlines?"**

Over 60% of digital news readers engage exclusively with headlines before forming opinions or sharing articles. Commercial digital media platforms often leverage affective polarization—using loaded vocabulary and presuppositions—to maximize engagement and advertising clicks.

This project delivers a reproducible, quantitative auditing framework evaluating news headline neutrality across 5 major media organizations:
- **Reuters** (International Wire Service)
- **Associated Press (AP)** (International Wire Service)
- **BBC News** (Public Broadcaster)
- **CNN** (Commercial Cable - Left Leaning)
- **Fox News** (Commercial Cable - Right Leaning)

---

## 🏆 Final Leaderboard & Benchmark Findings

$$\text{Total Bias Score} = \text{Emotional Intensity} + \text{Loaded Language} + \text{Presupposition} \quad (3 \le \text{Total Bias} \le 15)$$
$$\text{Headline Neutrality Index (HNI)} = 15 - \text{Total Bias Score} \quad (0.0 \le HNI \le 12.0)$$

| Rank | News Outlet | Mean HNI (0–12) ↑ | Total Bias (3–15) ↓ | Emotional Intensity | Loaded Language | Presupposition | Classification |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---|
| **#1** | **Reuters** | **12.00 / 12** | 3.00 | 1.00 | 1.00 | 1.00 | Wire Factual (Gold Standard) |
| **#2** | **Associated Press** | **12.00 / 12** | 3.00 | 1.00 | 1.00 | 1.00 | Wire Factual (Gold Standard) |
| **#3** | **BBC News** | **9.00 / 12** | 6.00 | 2.00 | 2.00 | 2.00 | Moderate Narrative |
| **#4** | **CNN** | **4.50 / 12** | 10.50 | 3.75 | 3.75 | 3.00 | Commercial Affective / Left |
| **#5** | **Fox News** | **1.50 / 12** | 13.50 | 4.50 | 4.50 | 4.50 | Commercial Affective / Right |

---

## 📚 Curriculum Integration (Modules I to VIII)

This project maps directly onto the foundational machine learning and AI curriculum:
1. **Module I & IV (LLMs & Prompt Engineering):** Zero-shot linguistic evaluation using Google Gemini with structured Pydantic schema enforcement.
2. **Module II & VII (Exploratory Data Analysis & Visualizations):** Cross-outlet box plots, variance checks, and correlation heatmaps.
3. **Module III (Linear Regression):** OLS model predicting $HNI$ from headline length and sentiment subjectivity ($\beta$ weight interpretation).
4. **Module V (Decision Trees):** Auditable, human-interpretable IF-THEN rules for newsroom managers using Gini impurity splits.
5. **Module VI (Neural Networks):** Multi-Layer Perceptron (MLP) multi-class classification.
6. **Module VIII (Unsupervised Clustering):** K-Means ($k=3$) and Hierarchical Dendrogram (Ward's Linkage) proving wire services naturally separate from cable channels without labels.

---

## 🚀 Quickstart & Reproduction

### 1. Run in Google Colab
Click the badge above or open [`headline_neutrality_analysis.ipynb`](headline_neutrality_analysis.ipynb) directly in Google Colab.

### 2. Local Setup
```bash
git clone https://github.com/Jampaniz32/headline-neutrality-analysis.git
cd headline-neutrality-analysis
pip install -r requirements.txt
python evaluate_neutrality.py
```

### 3. Open the Interactive Presentation Dashboard
Open [`presentation_dashboard.html`](presentation_dashboard.html) in any web browser to view interactive visual exhibits and slide presenter notes.

---

## 📊 Visual Exhibits

- **Exhibit 1:** HNI Box Plot across Outlets (`eda_hni_distribution.svg`)
- **Exhibit 2:** Hierarchical Clustering Dendrogram (`hierarchical_clustering_dendrogram.svg`)
- **Exhibit 3:** Transparent Managerial Decision Tree (`decision_tree_managerial.svg`)

---

## 📄 License
MIT License. Open for educational and research use.
