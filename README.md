# Unvalidated Personality Test

A deliberately **unvalidated**, browser-only personality questionnaire made for fun with friends.

The site contains 72 original Likert-style statements scored across 12 traits. It does **not** claim to be a validated psychological instrument, diagnostic tool, employment assessment, or population-normed test.

## How it works

- 5-point response scale from Strongly disagree to Strongly agree
- 12 traits × 6 items each
- Mix of regular and reverse-keyed items
- Each trait is scored from the mean item response and linearly rescaled to 0–100
- 50 is the midpoint of the response scale; it is **not** a population average or percentile
- Result ranges (below 40, 40–60, above 60) are arbitrary editorial aids, not validated cutoffs
- The prose describes possible tendencies and tradeoffs, and offers conversation prompts; no score indicates a better personality
- No backend, analytics, cookies, or external dependencies

All questionnaire items and scale descriptions in this repository are original to this project. The model uses only broad, non-proprietary concepts from trait psychology.

## Local use

Open `index.html` directly, or serve the directory with any static web server.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the repository as a static GitHub Pages site whenever `main` changes. The deployment uses GitHub Actions and the official Pages actions. It can also be run manually from the Actions tab.

## Conceptual notes

The 12 scales are narrow, informal themes rather than a claim of 12 independent psychological factors. Some constructs can overlap (for example social boldness and influence); no factor analysis or item calibration has been performed. Items are mixed across pages, with three reverse-keyed items per trait. Agreeing with statements is not evidence that the words capture a stable trait. Context, mood, wording, and response habits can affect scores. Avoid using these results for consequential decisions.
