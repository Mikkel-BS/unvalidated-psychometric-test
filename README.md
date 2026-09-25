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
- Neutral and identical responses are described explicitly instead of being treated as evidence of a balanced personality
- Results include each scale's six original answers and a way to edit them
- No ranking across traits: identical numbers on different scales do not have an established common meaning
- No backend, analytics, cookies, or external dependencies

All questionnaire items and scale descriptions in this repository are original to this project. The model uses only broad, non-proprietary concepts from trait psychology.

## Local use

Open `index.html` directly, or serve the directory with any static web server.

Answers exist only in memory in the current tab and are cleared on reload. Copying a summary is optional. If automatic clipboard access is unavailable (including in some local-file contexts), the summary appears as selectable text.

## Checks

Run `node --test tests/*.test.cjs` with Node.js 18 or newer. The suite checks all 15,625 answer combinations for one six-item scale, both score endpoints, reversal direction for every item, isolated trait changes, range boundaries, incomplete input, uniform answers, item-order independence, result wording, and clipboard success/failure handling. These are software checks, not psychometric validation. The Pages workflow runs the tests and JavaScript syntax checks before deployment. See [QA.md](QA.md) for the review findings and testing limits.

## Questionnaire version 0.2.0

The labels “Willingness to Compromise” and “Emotional Attention” narrow the former Cooperativeness and Empathic Attention labels to the content being asked about. Influence describes a wish to steer, not persuasive ability; Analytical Curiosity and Imagination describe interests rather than tested abilities. Several items were revised to reduce construct overlap and loaded wording. Scores from older question sets should not be treated as directly comparable.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the repository as a static GitHub Pages site whenever `main` changes. The deployment uses GitHub Actions and the official Pages actions. It can also be run manually from the Actions tab.

## Conceptual notes

The 12 scales are narrow, informal themes rather than a claim of 12 independent psychological factors. Some constructs can overlap (for example social boldness and influence); no factor analysis or item calibration has been performed. Items are mixed across pages, with three reverse-keyed items per trait. Reverse wording is not a lie detector or a guarantee against response bias. Agreeing with statements is not evidence that the words capture a stable trait. Context, mood, wording, and response habits can affect scores. Avoid using these results for consequential decisions.
