# Quality review — 25 September 2026

Scope: questionnaire version 0.2.0. This is an editorial and software review, not psychometric validation.

This first review did not include a dedicated academic literature review. A subsequent [literature-informed design review](ACADEMIC_REVIEW.md) covers all 72 items, construct boundaries, research sources, scoring assumptions, and interpretation limits.

## Findings fixed

| Finding | Resolution |
| --- | --- |
| The top/bottom-three summary arbitrarily separated tied scores and implied comparability across scales. | Removed rankings; summaries describe each scale's own direction and handle a flat profile explicitly. |
| A neutral midpoint was called a “mixed response pattern.” | All-neutral, identical-response, and other midpoint patterns now receive different explanations. |
| Agreeing with every statement yielded 50s that could be mistaken for balance. | Results explain cancellation across opposite item directions without labelling the respondent dishonest or invalid. |
| Some names suggested broader traits or abilities than the items support. | Narrowed Cooperativeness to Willingness to Compromise and Empathic Attention to Emotional Attention. Revised ability-implying endpoint labels and descriptions. |
| Some items blurred task switching with adaptability, interest with ability, and advocacy with social boldness. | Revised the affected wording, reduced loaded language, and clarified the response frame. Overlap is still possible and unmeasured. |
| Mobile CSS removed the meanings of the response numbers. | Response labels remain visible; radio controls also have explicit accessible names. |
| Page navigation left keyboard focus at the bottom. | Focus moves to the new section heading, with the section number as its accessible description. |
| The old clipboard fallback could report success even if copying failed. | Unavailable or rejected clipboard access exposes selectable text. Success is reported only after the copy promise resolves. |
| Results did not reveal their supporting answers. | Each trait now includes an expandable answer review; completed answers can be edited without clearing them. |
| Reduced-motion preference and dark validation text needed attention. | Page scrolling follows CSS motion preferences; focus outlines and dark-mode validation text were strengthened. |

## Verification performed

- **14 automated tests passed.** The suite covers all 15,625 combinations for one six-item scale, both endpoints, reversal direction and score isolation for every item, invalid/incomplete input, item-order independence, interpretation branches, summary content, and successful/unavailable/rejected clipboard paths.
- **JavaScript syntax checks passed** for the model, scoring, and application files.
- **Live browser:** completed all 72 items using neutral answers, highest-keyed answers, lowest-keyed answers, and identical Strongly agree answers. All twelve scores and their interpretations matched the expected patterns.
- **Live browser:** checked unanswered-page validation, keyboard selection, Back retention, focus after navigation, expanded answer review, editing a completed answer, and clearing answers. Changing one neutral response to Strongly agree moved only its trait from 50 to 58.
- **Live browser:** the copy action displayed its success status. The browser automation's clipboard reader did not expose the copied text; full content and failure handling were checked in unit tests.
- **Live browser:** no site-origin JavaScript errors appeared in the inspected log. Browser-extension errors were excluded.
- **Colour calculations:** tested muted text, accent text, and validation text against panel backgrounds in both themes. Contrast ratios were at least 5.02:1. This is not a complete WCAG assessment.
- **Deployment:** GitHub Pages runs JavaScript syntax checks and the test suite before publishing.

## Limits and remaining evidence needs

- Responsive CSS was inspected, but an actual narrow viewport and mobile touch interaction could not be verified in this browser environment. There was no real-device or assistive-technology audit, and the dark theme was checked by source/colour calculation rather than a rendered device test.
- Automated tests verify code behaviour; they do not measure reliability, factor structure, predictive validity, or fairness. Those would require participant data and a separate study design.
- Original wording can still contain ambiguities and socially desirable responses. The six-item scales are informal themes, not established independent dimensions. Friends' feedback on ambiguous items would inform further editorial revisions.
- The three result ranges are arbitrary writing aids. A one-step answer change moves a trait about four points, so small differences and changes between questionnaire versions should not be overinterpreted.

Run the automated checks with `node --test tests/*.test.cjs`.
