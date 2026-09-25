# Unvalidated Personality Test

A deliberately **unvalidated**, browser-only personality questionnaire made for fun with friends.

The site contains 72 original Likert-style statements scored across 12 traits. It does **not** claim to be a validated psychological instrument, diagnostic tool, employment assessment, or population-normed test.

## How it works

- 5-point response scale from Strongly disagree to Strongly agree
- 12 traits × 6 items each
- Mix of regular and reverse-keyed items
- Each trait is scored from the mean item response and linearly rescaled to 0–100
- 50 is the midpoint of the response scale; it is **not** a population average or percentile
- No backend, analytics, cookies, or external dependencies

All questionnaire items and scale descriptions in this repository are original to this project. The model uses only broad, non-proprietary concepts from trait psychology.

## Local use

Open `index.html` directly, or serve the directory with any static web server.

## GitHub Pages

The workflow in `.github/workflows/pages.yml` deploys the repository as a static GitHub Pages site whenever `main` changes. The deployment uses GitHub Actions and the official Pages actions. It can also be run manually from the Actions tab.
