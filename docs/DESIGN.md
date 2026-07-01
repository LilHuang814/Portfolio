# Portfolio Design System — Lily Huang

A reference for translating the home page's visual language into new pages. Distilled from the hero, contact card, resume card, and four featured-project sections.

---

## 1. Design Principles

These are the ideas the whole site is built on. When a new page feels "off," check it against these first.

- **Warm minimalism.** Lots of off-white space, one idea per section, nothing fights for attention. The gradients supply the warmth so the layout can stay quiet.
- **Gradient as signature.** The blue → peach → orange gradient is the throughline that ties every section together. It shows up full-bleed (hero, contact), as a soft corner glow (project intros), and as a thin accent line or bar. It always carries a fine grain texture (see §2) rather than a smooth blend. If a new page has no gradient, it will feel disconnected.
- **One language at a time.** A `中文 | English` toggle in the top nav switches the whole page between fully Chinese and fully English — the two never mix within a view. Product names, brand terms, and the UI in mockups may stay in English regardless, but all page copy follows the active language. This means every piece of text needs both a Chinese and an English version.
- **Editorial, not templated.** Big confident headlines, generous margins, restrained color. Reads more like a magazine spread than a SaaS landing page.
- **Calm confidence.** Muted supporting text, no exclamation-heavy marketing tone anywhere — even the contact headline stays plain (`contact me`). Let the work speak.

---

## 2. Color

### Core palette
| Role | Description | Where it appears |
|------|-------------|------------------|
| Background | Warm off-white / bone | Page canvas, cards |
| Ink | Near-black, slightly warm | Headlines, primary text |
| Muted ink | Soft gray | Body copy, captions, labels |
| Signature gradient | Periwinkle blue → lavender → peach → warm orange | Full-bleed hero, accent lines, glows |

### Accent hues (pulled from the gradient)
- **Periwinkle / indigo** — links, active states, the WisdomPlan & JPMorgan projects lean into this cool end.
- **Warm orange / coral** — "FEATURED PROJECT" dots, the Payment Ticker project, contact card top.
- **Soft gold / amber** — Payment Ticker's UI accents (toggles, buttons, table highlights).

### Rules of thumb
- Backgrounds stay neutral; **color enters through the gradient, never through flat color blocks.**
- Each featured project can bias toward one end of the gradient (cool for enterprise/AI, warm for games/payments) to give it its own temperature while staying in the family.
- Text on gradients is always white and set large enough to stay legible against the busiest part of the wash.

### Gradient texture (required)
Every gradient carries a **fine grain / noise texture** — it is never a clean, smooth CSS blend. This grain is what gives the washes their soft, tactile, slightly analog quality and is a core part of the site's feel. A perfectly smooth gradient will look wrong and off-brand.
- Apply the grain **consistently everywhere the gradient appears** — full-bleed heros, corner glows, accent bars, and the pill footer alike.
- Keep the grain **subtle**: visible up close as a soft speckle, but never so heavy it reads as noise or dirt. It should feel like paper or film grain, not static.
- The texture sits *on top of* the color blend, so the underlying blue → peach → orange transition stays smooth in hue while the surface reads as grainy.
- **How to reproduce it:** overlay a tiled noise texture (e.g. an SVG `feTurbulence` filter, a semi-transparent noise PNG, or a CSS grain layer) at low opacity over the color gradient. Match the grain size and opacity across every gradient so they look like one material.

---

## 3. Typography

### Hierarchy
- **Display / hero** — very large, tight, lowercase or sentence case (`lily's portfolio`, `contact me`). Bold geometric sans. Used sparingly, one per full-bleed section.
- **Section / project titles** — large sans, sentence case (`Blour`, `JPMorgan Chase`, `Payment Ticker Improvements`, `Lily Huang`).
- **Eyebrow labels** — small, ALL CAPS, wide letter-spacing, colored dot prefix (`● FEATURED PROJECT`, `EDUCATION`, `PRODUCT DESIGNER`). This is the site's most recognizable type detail — reuse it as the standard section marker.
- **Body** — regular-weight sans, muted color, comfortable line height. Chinese description blocks sit here.
- **Metadata / captions** — smallest size, muted, sometimes monospaced feel (`PRODUCT DESIGNER` spacing).

### Rules of thumb
- One typeface family throughout; hierarchy comes from **size, weight, and letter-spacing**, not from switching fonts.
- Headlines are tight (low line-height); body is airy.
- The wide-tracked caps eyebrow is the connective tissue — put one at the top of every new section.

---

## 4. Layout

### Two recurring layouts

**A. Full-bleed statement** (hero, contact)
- Gradient fills the whole frame, rounded outer corners, thin light margin around it.
- One giant centered headline.
- Supporting info (nav pills, contact columns) floats at the edges in clean rows.
- Use for: landing, contact, section dividers, "thank you" / closing moments.

**B. Split feature** (Blour, JPMorgan, WisdomPlan, Payment Ticker)
- **Left third:** text column — eyebrow → big title → thin rule or gradient bar → Chinese description → `职责范围` (scope) label → pill tags.
- **Right two-thirds:** the visual payload — phone mockups, illustrated concept cards, product screenshot, or UI table mockup.
- Soft gradient glow bleeds from behind the left column or corner.
- Use for: any project deep-dive, case-study intro, feature explanation.

### The resume card (a third pattern)
- Single large rounded card, "browser window" dots at top with a gradient rule.
- Name + role headline block on the left, education on the right.
- A four-column meta row underneath: `FOCUS · LOCATION · EXPERIENCE · CONTACT`, each with a line-icon, dot, and short value.
- A gradient pill footer with a one-line tagline and an arrow. Reuse this "summary card" pattern for an About page or a project summary.

### Spacing
- Generous padding inside cards and around sections — crowding breaks the calm.
- Consistent rounded corners (large radius) on every card, mockup frame, pill, and the page itself.

---

## 5. Components

- **Eyebrow marker** — `● LABEL IN CAPS` with a colored dot. Standard section opener.
- **Pill tags** — rounded, light fill, used for scope/skills (`设计AI Agent`, `流程设计`, `调研用户需求`). Group of 3–5 under a `职责范围`-style label.
- **Nav / language pills** — rounded white capsules with soft shadow (hero: `LH`, `中文 | English`, `简历`).
- **Cards** — rounded, near-white, soft shadow, generous internal padding. House mockups, illustrations, or info.
- **Gradient accent bar** — thin vertical or horizontal gradient stroke used to lead the eye into a text block or separate title from body.
- **Gradient pill / button footer** — full-width rounded gradient strip with tagline + arrow icon.
- **Icon + label rows** — thin line icon, wide-caps label, dot accent, value beneath. For any metadata display.

---

## 6. Illustration & Imagery

- **Two visual styles coexist:** flat character illustrations in the blue/lavender palette (JPMorgan concept cards) and real product/UI mockups (Blour phones, WisdomPlan screenshot, Payment Ticker table).
- Illustrations stay within the site's cool blues so they don't clash with the warm gradients.
- Mockups are shown inside clean device or card frames, never raw screenshots on the page.
- Keep imagery purposeful — each visual demonstrates a real feature or concept, paired with a short titled explanation (`Streamlined Intake`, `Smart Guidance`).

---

## 7. Voice & Tone

- **Both languages carry the same content** — the toggle swaps the whole page, so every headline, description, and tagline needs a parallel Chinese and English version. Write them as equivalents, not translations of convenience; each should read naturally on its own.
- The **English** voice is confident and clear (`Designing thoughtful digital experiences at the intersection of AI, product strategy, and human-centered design.`).
- The **Chinese** voice carries the reflective descriptions and scope of responsibility — keep it as considered and detailed as the English, not a shortened gloss of it.
- Taglines are short, declarative, benefit-focused (`User empathy. Strategic clarity. Measurable impact.`).
- Warmth comes from the gradient and the friendly lowercase headlines (`contact me`), not from punctuation or exclamatory copy — the tone stays understated throughout.

---

## 8. Applying This to New Pages

| New page | Reuse |
|----------|-------|
| Project detail / case study | Split-feature layout (B); lead with eyebrow + title; bias the gradient to match the project's temperature; break body into titled concept cards like JPMorgan. |
| About / bio | Resume-card pattern; icon+label meta rows; gradient pill tagline footer; full Chinese and English versions of the intro. |
| Project index / grid | Cards with rounded frames, one gradient glow per card, eyebrow + title + pill tags; keep neutral background so cards breathe. |
| Contact / closing | Full-bleed statement layout (A); giant headline; edge-aligned info columns; the warm end of the gradient. |
| Any section header | Full-bleed gradient divider with a single centered headline. |

### Quick checklist for a new page
1. Does it open with an eyebrow marker — a small ALL-CAPS label in wide letter-spacing, prefixed by a colored dot (like `● FEATURED PROJECT`)?
2. Is the gradient present somewhere (full-bleed, glow, or accent line), and does it carry the fine grain texture rather than a smooth blend?
3. Neutral background, color only through the gradient?
4. Does every piece of copy have both a Chinese and an English version, so the language toggle works cleanly?
5. One headline as the clear focal point, everything else quieter?
6. Rounded corners and generous padding on every card and frame?
