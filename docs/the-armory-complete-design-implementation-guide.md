# The Armory by Rock Mission
## Complete Concept Design and GitHub Copilot Implementation Guide

> **Brand position:** A cinematic digital discipleship platform where believers are equipped through Scripture, strengthened in faith, and prepared for Kingdom purpose.
>
> **Primary tagline:** Equipped by Truth.
>
> **Supporting line:** Train in Scripture. Strengthen your faith. Step into your purpose.

---

## 1. How to Use This Guide with GitHub Copilot Agent

Give GitHub Copilot Agent this document as the primary product and design brief. Instruct it to inspect the existing repository before modifying anything, preserve current business logic, and implement the redesign incrementally.

### Required agent workflow

1. Inspect the repository structure, framework versions, routes, components, design tokens, authentication, authorization, API integration, state management, forms, tests, and build scripts.
2. Run the existing lint, type-check, test, and build commands before making changes.
3. Produce an implementation inventory showing which existing components can be reused, refactored, or replaced.
4. Establish design tokens and shared primitives before redesigning pages.
5. Implement one route group at a time.
6. Preserve all existing functional behavior unless a change is explicitly required by this guide.
7. Do not invent API fields, permissions, course data, or backend behavior.
8. Use mock content only for visual placeholders and clearly isolate it from production data.
9. Verify responsive behavior at mobile, tablet, laptop, and large desktop widths.
10. Run lint, type-check, tests, and production build after every meaningful phase.
11. Summarize changed files, decisions, limitations, and follow-up work after each phase.

---

# 2. Product Vision

The Armory is the next evolution of Rock Mission Learn. It is not presented as a conventional learning management system. It is a structured digital discipleship experience.

Users should feel that they are entering a place where they can:

- understand Scripture clearly;
- build strong spiritual foundations;
- develop consistent faith practices;
- grow through guided discipleship paths;
- prepare for ministry and everyday Christian living;
- continue learning in a focused, motivating environment.

## Experience statement

**The Armory is a cinematic faith-learning platform for the next generation.**

It combines:

- the clarity of a premium education product;
- the focus of a well-designed productivity platform;
- the motivation of a progression-based app;
- the warmth of a Christian community;
- the visual energy of modern youth culture;
- the reverence required for biblical teaching.

## Audience priority

1. Teenagers and young adults
2. First-time believers
3. Adults growing in biblical understanding
4. Ministry volunteers and emerging leaders
5. Parents and church members
6. Educators and content builders
7. Administrators

The interface must appeal to younger users without excluding older adults. Readability, familiar navigation, clear actions, and accessible contrast always take priority over visual novelty.

---

# 3. Biblical and Verbal Foundation

## Core biblical ideas

The identity draws from the following concepts:

- the Word of God as the sword of the Spirit;
- believers putting on the armor of God;
- Scripture equipping the servant of God for every good work;
- God's Word as living, active, refining, illuminating, and transformative;
- disciples being trained, strengthened, prepared, and sent.

## Brand language

Preferred verbs:

- Equip
- Train
- Prepare
- Strengthen
- Grow
- Discover
- Continue
- Reflect
- Apply
- Serve
- Send

Preferred nouns:

- Training Path
- Module
- Session
- Milestone
- Journey
- Foundation
- Calling
- Mission
- Practice
- Reflection
- Community

## Language guardrails

The Armory metaphor must remain purposeful and spiritual, not aggressive or militaristic.

Use:

- Equipped by Truth
- Begin Training
- Continue Your Path
- Training Progress
- Scripture Focus
- Prepared for Purpose
- Complete the Module
- Your Next Step

Avoid:

- weapon collection language;
- violent imagery;
- ranks that imply spiritual superiority;
- combative copy directed at people or social groups;
- excessive military terminology;
- replacing every normal UI term with themed jargon.

Keep familiar terms where clarity matters. For example, “Dashboard” may remain in navigation while the page heading can say “Your Training.”

---

# 4. Brand Architecture

## Master brand

**The Armory**

Endorsement:

**by Rock Mission** or **A Rock Mission Ministries platform**

Recommended lockup:

```text
THE ARMORY
Equipped by Truth.
by Rock Mission
```

## Product naming

- Public platform: The Armory
- Student experience: My Training
- Course catalog: Training Paths
- Course detail: Path Overview
- Course player: Training Session
- Educator area: Educator Studio
- Course builder: Path Builder
- Admin area: Platform Administration
- Community feature: Armory Community
- Prayer feature, if introduced later: Prayer Room

Do not use “Command Center,” “War Room,” or “Barracks” as primary navigation labels. These may be explored later as campaign or event names, but they are too militaristic for core usability.

---

# 5. Logo Concept

## Recommended mark

Create a minimal geometric capital **A** formed by three ideas:

1. the center vertical element resembles a sword or beam of light;
2. the outer strokes form an upward path or mountain-like shape;
3. the full silhouette reads instantly as the letter A.

The mark should be compact, symmetrical, and recognizable at favicon size.

## Visual qualities

- Geometric rather than illustrative
- Strong but not aggressive
- Minimal internal detail
- Slightly tapered strokes
- Balanced negative space
- No literal medieval weapons
- No ornate crest treatment in the primary logo
- No shield-and-cross cliché

## Logo system

Create these variants:

- Primary horizontal lockup
- Stacked lockup
- Symbol only
- Single-color white
- Single-color dark
- Teal-to-gold accent version
- Favicon and app icon

## Safe area

Use the height of the inner sword/beam as the minimum clear space around the mark. Do not place the logo directly against busy imagery without a contrast surface.

---

# 6. Visual Direction

## Creative concept

**Sacred Formation**

The interface should feel like light, truth, and purpose emerging from darkness. Users are not entering a battlefield. They are entering a focused, inspiring environment for formation.

## Visual keywords

- Cinematic
- Immersive
- Focused
- Reverent
- Energetic
- Layered
- Premium
- Warm
- Transformative
- Community-centered

## Visual motifs

Use subtly:

- upward paths;
- narrow beams of light;
- layered contours resembling topographic journeys;
- angular frames inspired by the A symbol;
- fine grid lines suggesting structure and preparation;
- soft particles suggesting atmosphere, not magic;
- abstract rock textures;
- illuminated edges;
- concentric progress rings;
- chapter markers and pathway nodes.

Avoid:

- literal combat scenes;
- swords used as repeated decoration;
- medieval textures and gothic typography;
- generic praying-person stock photography;
- random neon glows on every component;
- cluttered revival-poster compositions;
- excessive glassmorphism;
- low-contrast gray text on translucent panels.

---

# 7. Color System

All colors should be exposed as semantic CSS variables and connected to Tailwind theme tokens. Do not scatter raw hex values throughout components.

## Core dark palette

```css
:root {
  --armory-void: #060A12;
  --armory-night: #0A1120;
  --armory-navy: #101A2E;
  --armory-surface: #152238;
  --armory-surface-raised: #1B2B44;
  --armory-border: #2A3B55;

  --armory-text: #F7FAFC;
  --armory-text-muted: #A9B7CA;
  --armory-text-subtle: #7F91A8;

  --armory-teal: #20D9C2;
  --armory-teal-strong: #0FB9A8;
  --armory-gold: #F4B84A;
  --armory-gold-strong: #D99722;
  --armory-violet: #B778FF;
  --armory-pink: #ED6BB5;

  --armory-success: #35D07F;
  --armory-warning: #F4B84A;
  --armory-danger: #FF6B78;
  --armory-info: #55B8FF;
}
```

## Semantic roles

- Teal: primary actions, active states, current progress, links
- Gold: milestones, completion, featured content, premium emphasis
- Violet/pink: sparing atmospheric accents and youth-focused campaigns
- White: primary text
- Muted blue-gray: supporting text
- Red: true destructive actions and errors only

## Light mode

```css
[data-theme='light'] {
  --armory-void: #F5F8FC;
  --armory-night: #FFFFFF;
  --armory-navy: #EDF2F8;
  --armory-surface: #FFFFFF;
  --armory-surface-raised: #F8FAFD;
  --armory-border: #D8E1EC;

  --armory-text: #0C1728;
  --armory-text-muted: #50627A;
  --armory-text-subtle: #6C7D91;
}
```

Light mode should be complete and intentional, especially for long reading sessions and older learners. It must not be an inverted afterthought.

## Gradients

Use gradients for brand moments, not every surface.

```css
--gradient-brand: linear-gradient(135deg, #20D9C2 0%, #55B8FF 48%, #B778FF 100%);
--gradient-gold: linear-gradient(135deg, #FFE09A 0%, #F4B84A 55%, #D99722 100%);
--gradient-hero: radial-gradient(circle at 20% 10%, rgba(32,217,194,.20), transparent 35%), radial-gradient(circle at 85% 20%, rgba(183,120,255,.16), transparent 32%), linear-gradient(180deg, #0A1120 0%, #060A12 100%);
```

---

# 8. Typography

## Recommended families

- Display and headings: **Space Grotesk**
- Body and interface: **Inter**

Use local/self-hosted font files if the project and licensing allow it. Provide robust system fallbacks and prevent layout shifts.

```css
--font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

## Type scale

Use responsive `clamp()` values rather than fixed oversized headings.

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: clamp(1.5rem, 2vw, 1.875rem);
--text-3xl: clamp(1.875rem, 3vw, 2.5rem);
--text-4xl: clamp(2.25rem, 5vw, 4rem);
--text-hero: clamp(2.75rem, 7vw, 5.75rem);
```

## Typography rules

- Body copy: 16px minimum
- Long-form lesson copy: 17px to 19px, 1.65 to 1.8 line-height
- Maximum reading width: 68 to 74 characters
- Avoid all-caps for long labels
- Use uppercase display text only for short eyebrow labels
- Ensure headings wrap intentionally on small screens

---

# 9. Spacing, Shape, Elevation, and Layout

## Spacing scale

Use a 4px base grid:

```text
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
```

## Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 18px;
--radius-xl: 24px;
--radius-pill: 999px;
```

Cards should generally use 18px to 24px. Inputs and buttons should use 10px to 14px. Avoid making every element pill-shaped.

## Elevation

Prefer borders, layered surfaces, and restrained ambient shadows.

```css
--shadow-card: 0 18px 50px rgba(0, 0, 0, 0.24);
--shadow-glow-teal: 0 0 28px rgba(32, 217, 194, 0.16);
--shadow-focus: 0 0 0 4px rgba(32, 217, 194, 0.24);
```

## Containers

- Marketing content max width: 1200px to 1280px
- Dashboard max width: 1440px
- Reading content max width: 760px to 820px
- Mobile page padding: 16px
- Tablet page padding: 24px
- Desktop page padding: 32px to 48px

---

# 10. Core Component System

Build primitives before full pages. Every component must support keyboard interaction, visible focus, loading, disabled, error, and responsive states where relevant.

## Buttons

### Primary

- Solid teal or restrained teal gradient
- Dark readable text where contrast allows
- 44px minimum touch height
- Strong focus ring
- Small directional icon optional

### Secondary

- Raised dark surface
- Visible border
- White text
- Subtle hover lift

### Tertiary

- Transparent
- Text/icon emphasis
- No unnecessary container

### Achievement action

- Gold accent
- Reserved for completion and milestone moments

Never use color alone to express a button state.

## Cards

Create these variants:

- `CourseCard`
- `FeaturedPathCard`
- `ContinueLearningCard`
- `MilestoneCard`
- `StatCard`
- `EducatorCourseCard`
- `AdminSummaryCard`
- `ScriptureCard`
- `ReflectionCard`

Standard card anatomy:

1. optional media region;
2. metadata/eyebrow;
3. title;
4. concise description;
5. progress or supporting information;
6. action area.

Use hover glow only on clickable cards. Do not make static cards appear clickable.

## Inputs

- Persistent labels above fields
- Helpful description below when necessary
- Clear inline errors
- Password visibility control
- Autofill-compatible attributes
- 44px minimum height
- No placeholder-only labels

## Progress

Create:

- Linear course progress
- Circular overall progress
- Module stepper
- Milestone timeline
- Completion celebration

Always pair visual progress with a textual percentage or fraction.

## Badges

Badges should celebrate consistency and meaningful completion, not spiritual status.

Appropriate examples:

- First Step
- Foundations Complete
- Seven-Day Rhythm
- Scripture Explorer
- Path Completed
- Community Contributor

Avoid:

- More Faithful Than Others
- Elite Disciple
- Spiritual Warrior Rank
- holiness scores

---

# 11. Navigation Architecture

## Public desktop navigation

- Home
- Training Paths
- About The Armory
- Sign In
- Begin Training

## Authenticated student navigation

- Dashboard
- Training Paths
- My Training
- Achievements, if implemented
- Profile/Settings

## Mobile navigation

Use a compact header and bottom navigation for the highest-frequency authenticated destinations:

- Home/Dashboard
- Paths
- My Training
- Profile

Do not exceed five bottom-navigation items. Keep educator and admin access in the profile/menu area unless those users use it frequently enough to justify a dedicated navigation mode.

## Educator navigation

- Overview
- My Paths
- Create Path
- Learners/Analytics, if currently supported
- Resources

## Admin navigation

- Overview
- Users
- Content
- Categories
- Educators
- Platform Settings
- Audit/System sections only if they already exist

Use permission-aware navigation. Hiding a link is not a substitute for authorization enforcement.

---

# 12. Page Concepts

## 12.1 Public Home Page

### Purpose

Within five seconds, a visitor should understand what The Armory is, who it is for, and how to begin.

### Recommended structure

1. Cinematic hero
2. Trust/identity strip linking The Armory to Rock Mission
3. Featured training paths
4. “How it works” in three steps
5. Transformation-focused benefits
6. Learner testimony or community proof
7. Suitable-for-every-stage section
8. Final CTA
9. Footer

### Hero copy

```text
THE ARMORY

Equipped by Truth.

Build strong foundations, understand Scripture, and grow into the purpose God has called you to.

[Begin Training] [Explore Paths]
```

### Hero visual

Use abstract atmospheric visuals: a path of illuminated contour lines leading toward a vertical beam, subtle stone texture, and layered teal/gold light. Do not use cheesy stock worship imagery.

## 12.2 Training Path Catalog

### Goals

- Make it easy to know where to start.
- Reduce overwhelm.
- Clearly separate recommended, in-progress, and available paths.

### UI patterns

- Search
- Filter chips
- Category tabs or segmented control
- “Start Here” curated section
- Featured path
- Responsive card grid
- Empty and no-results states

### Card content

- Cover art
- Path level
- Estimated duration
- Number of modules
- Title
- Short value proposition
- Educator
- Progress, when enrolled
- Primary action

Use user-friendly levels such as `Starting Out`, `Growing`, and `Going Deeper` rather than academic difficulty labels where appropriate.

## 12.3 Course/Training Path Detail

### Above the fold

- Cover art
- Clear title and outcome
- Level, duration, module count
- Educator
- Enrollment/continue CTA
- Current progress if enrolled

### Content sections

- What you will learn
- Who this path is for
- Path modules
- Educator introduction
- Required materials
- Related paths

Use a sticky desktop enrollment panel and a safe mobile bottom action bar where appropriate.

## 12.4 Course Player / Training Session

### Design objective

Focused, immersive, calm, and rewarding. Reading and learning are more important than decoration.

### Desktop layout

- Collapsible left module navigation
- Main content canvas
- Optional right-side contextual panel only when genuinely useful
- Sticky progress/header controls

### Mobile layout

- One-column content
- Compact session header
- Module list in a drawer/sheet
- Large previous/next controls
- No fixed UI that covers lesson content

### Signature content blocks

- Scripture Focus
- Think About This
- Prayer Moment
- Apply It
- Journal/Reflection
- Key Takeaway
- Knowledge Check

These blocks must have distinct icons, labels, and border treatments, but remain visually related.

### Completion moment

When a session is completed:

- acknowledge completion;
- update progress visibly;
- show the next module;
- provide a short reflection or application prompt;
- use restrained gold light or particles;
- respect reduced-motion preferences.

## 12.5 Student Dashboard

### Page hierarchy

1. Personal welcome
2. Continue learning
3. Weekly/overall progress
4. Recommended next path
5. Milestones
6. Recent activity
7. Optional Scripture focus

### Example heading

```text
Welcome back, Lee.
Continue building strong foundations.
```

Do not turn the dashboard into a wall of statistics. The primary action should always be obvious.

## 12.6 Authentication

### Tone

Aspirational, welcoming, safe, and uncomplicated.

### Desktop

Use a split layout:

- one side: form;
- other side: brand visual and concise message.

### Mobile

Use a single-column form with a subtle atmospheric header. Keep sign-up friction low and preserve all required consent/legal content.

Suggested sign-up message:

```text
Begin your journey.
Create your account and start growing through Scripture at your own pace.
```

## 12.7 Settings

Keep settings simpler and brighter than marketing pages.

Sections may include:

- Profile
- Account
- Password/Security
- Preferences
- Appearance
- Notifications

Use explicit save feedback and prevent accidental data loss.

## 12.8 Educator Studio

The educator experience must feel like the same product, but prioritize density and productivity.

- Compact navigation
- Clear status chips
- Draft/published states
- Course health and learner engagement if supported
- Primary “Create Path” action
- Empty-state onboarding

Do not overuse atmospheric backgrounds behind forms and data tables.

## 12.9 Path Builder

Use a step-based workflow:

1. Basics
2. Outcomes
3. Modules
4. Content
5. Media/resources
6. Review
7. Publish

Include autosave status only if technically supported. Warn before navigation with unsaved changes.

## 12.10 Admin

Admin screens should use the same tokens, typography, controls, and navigation shell. They may be more restrained and information-dense.

- Clear table hierarchy
- Search and filtering
- Bulk actions with safeguards
- Destructive confirmation dialogs
- Permission-aware actions
- Loading, empty, and error states

No cinematic hero backgrounds are needed inside data-heavy administration screens.

---

# 13. Background and Media Treatment

## Marketing pages

Use layered backgrounds consisting of:

1. dark navy foundation;
2. one or two large radial light fields;
3. restrained texture/noise;
4. optional angular or contour overlays;
5. clear solid/opaque zones behind reading text.

## Application pages

Use calmer surfaces. The dashboard may have subtle atmosphere in its welcome area, but tables, forms, and lesson content should use stable, high-contrast surfaces.

## Course cover art

Build a consistent cover system:

- category color or gradient;
- abstract symbolic visual;
- small Armory mark;
- high contrast title area if titles are embedded;
- consistent aspect ratio;
- no unrelated stock imagery.

Course title text should preferably remain HTML instead of baked into images for accessibility and localization.

---

# 14. Motion System

Motion should communicate hierarchy and progress, not decorate every interaction.

## Recommended motion

- Page/section entrance: opacity plus 8px to 16px vertical movement
- Card hover: 2px to 4px lift
- Button press: subtle scale to 0.98
- Progress updates: smooth width/ring interpolation
- Drawer/dialog: spring-like but restrained
- Completion: brief glow and small particle accent

## Durations

```css
--duration-fast: 120ms;
--duration-normal: 200ms;
--duration-slow: 320ms;
--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Accessibility

Honor `prefers-reduced-motion`. Remove parallax, large zooms, and particle animation in reduced-motion mode.

---

# 15. Responsive Rules

Design mobile-first.

## Suggested breakpoints

Use the repository's existing Tailwind breakpoints unless there is a strong reason to change them. Typical targets:

- Base: mobile
- `sm`: large phone
- `md`: tablet
- `lg`: laptop
- `xl`: desktop
- `2xl`: wide desktop

## Mobile guardrails

- 16px minimum horizontal page padding
- 44px minimum touch targets
- No hover-only actions
- No important information hidden behind tooltips
- Avoid more than two columns on small tablets
- Collapse course-player sidebars into drawers
- Keep primary CTA visible but do not obscure content
- Test at 320px width as a stress case

---

# 16. Accessibility and Inclusive Design

Target WCAG 2.2 AA quality.

Implementation requirements:

- Semantic landmarks and heading order
- Skip-to-content link
- Full keyboard operation
- Visible focus indicators
- Sufficient text and control contrast
- Form labels and error associations
- Accessible names for icon-only controls
- Captions/transcripts support for video content where available
- Text alternatives for meaningful images
- No color-only status communication
- Reduced-motion support
- Zoom and text-resize resilience
- Screen-reader announcements for asynchronous form/progress updates where appropriate
- Avoid autoplaying audio/video

Spiritual accessibility also matters: do not frame incomplete paths, missed streaks, or low engagement as moral failure.

---

# 17. Tailwind and React Architecture

Adapt these recommendations to the actual project after repository inspection.

## Token-first Tailwind setup

Map semantic colors rather than component-specific colors:

```ts
// Illustrative only. Merge with the repository's actual Tailwind setup.
const colors = {
  canvas: 'var(--armory-void)',
  background: 'var(--armory-night)',
  surface: 'var(--armory-surface)',
  elevated: 'var(--armory-surface-raised)',
  border: 'var(--armory-border)',
  foreground: 'var(--armory-text)',
  muted: 'var(--armory-text-muted)',
  subtle: 'var(--armory-text-subtle)',
  primary: 'var(--armory-teal)',
  secondary: 'var(--armory-gold)',
  accent: 'var(--armory-violet)',
  success: 'var(--armory-success)',
  warning: 'var(--armory-warning)',
  danger: 'var(--armory-danger)',
  info: 'var(--armory-info)',
};
```

## Suggested component organization

Do not force this structure if the repository already has a coherent convention.

```text
src/
  components/
    ui/
    brand/
    course/
    learning/
    dashboard/
    educator/
    admin/
  layouts/
  pages/ or app/
  features/
  hooks/
  lib/
  styles/
    tokens.css
    globals.css
  assets/
    brand/
    course-covers/
```

## Component quality requirements

- Prefer composition over enormous page components.
- Keep domain logic outside visual primitives.
- Preserve server/client boundaries if using Next.js.
- Avoid global state for local UI concerns.
- Avoid arbitrary Tailwind values when a token exists.
- Use a class-merging utility already present in the repository.
- Reuse existing accessible primitives if available.
- Do not add dependencies without explaining the need.
- Do not replace routing, forms, or state libraries merely for styling convenience.

## Required reusable primitives

- Button
- IconButton
- Input
- Textarea
- Select/Combobox
- Checkbox
- Radio group
- Tabs
- Badge
- Progress
- Card
- Dialog
- Drawer/Sheet
- Dropdown menu
- Tooltip
- Skeleton
- Empty state
- Alert
- Toast
- Page header
- Section header
- Container

---

# 18. Content and Microcopy Style

## Voice

- Clear
- Hopeful
- Grounded
- Direct
- Encouraging
- Biblically respectful
- Never patronizing

## Examples

Good:

```text
Continue where you left off.
Your next session is ready.
Take a moment to reflect before moving on.
You completed Foundations of Faith.
Explore a path that builds on what you have learned.
```

Avoid:

```text
Level up your holiness!
You broke your faith streak.
Become an elite believer.
Defeat everyone with Scripture.
```

Use South African English consistently if that matches the existing product copy.

---

# 19. States That Must Be Designed

For every significant page or component, implement:

- Loading
- Skeleton loading where useful
- Empty
- Error
- Offline/retry where supported
- Unauthorized
- Forbidden
- Not found
- Disabled
- Success
- Partially complete
- Completed

Examples:

- No enrolled paths
- No search results
- Course unavailable
- Video/resource failed to load
- Session already completed
- Educator has no draft paths
- Admin table has no matching records

---

# 20. Analytics and Product Events

Only integrate into an existing approved analytics system. Do not add tracking without consent and privacy review.

Useful events may include:

- Home CTA selected
- Catalog searched
- Filter applied
- Path viewed
- Enrollment started/completed
- Session started/completed
- Reflection saved
- Path completed
- Dashboard continue action selected

Never place sensitive reflection, prayer, journal, or personal faith content in analytics payloads.

---

# 21. Implementation Phases

## Phase 0: Audit and safety baseline

- Inspect project
- Run baseline quality checks
- Capture routes and feature inventory
- Identify risky coupling
- Document current accessibility issues
- Take screenshots if the environment supports it

## Phase 1: Foundation

- Add semantic design tokens
- Configure theme integration
- Add typography
- Build shared primitives
- Create application containers/layout shells
- Add focus, motion, and accessibility foundations

## Phase 2: Brand shell and authentication

- Logo placement and lockups
- Public header/footer
- Auth layout
- Sign in
- Sign up
- Forgot/reset password

## Phase 3: Public discovery

- Home page
- Training Path catalog
- Search and filters
- Path detail

## Phase 4: Student experience

- Dashboard
- My Training
- Progress components
- Milestones
- Settings

## Phase 5: Learning experience

- Course player shell
- Module navigation
- Content blocks
- Reflection/check components
- Completion moment

## Phase 6: Educator experience

- Educator shell
- Educator dashboard
- Path listing
- Path builder
- Preview/publish flow

## Phase 7: Admin consistency

- Admin shell
- Tables and filters
- Forms/dialogs
- Empty/loading/error states

## Phase 8: Polish and verification

- Responsive QA
- Keyboard QA
- Contrast checks
- Reduced-motion QA
- Cross-browser checks
- Performance review
- Bundle/dependency review
- Final lint/type-check/test/build

---

# 22. Definition of Done

A page is complete only when:

- It follows The Armory design tokens.
- It works with real existing data contracts.
- It is responsive from 320px through wide desktop.
- It supports keyboard navigation.
- Focus is clearly visible.
- Loading, empty, error, and success states are handled.
- Text contrast is accessible.
- It supports dark and light themes if both are in scope.
- Motion respects reduced-motion preferences.
- It introduces no lint or type errors.
- Existing tests pass and relevant new tests are added.
- No important user flow has regressed.

---

# 23. GitHub Copilot Agent Master Prompt

Copy the prompt below into GitHub Copilot Agent together with this guide.

```text
You are working inside the existing Rock Mission Learn web application repository. Your task is to evolve the product into “The Armory by Rock Mission,” a cinematic, modern, spiritually grounded digital discipleship platform.

Use the attached “The Armory Complete Concept Design and GitHub Copilot Implementation Guide” as the source of truth for brand, UX, UI, accessibility, terminology, responsive behavior, component architecture, and implementation phases.

NON-NEGOTIABLE RULES
1. Inspect the entire repository before editing. Identify the framework, versions, routes, layouts, styling approach, component libraries, state management, API clients, authentication, authorization, tests, linting, type checking, and build commands.
2. Preserve existing business logic, APIs, route behavior, authentication, authorization, and data contracts unless explicitly instructed otherwise.
3. Do not invent backend fields, API responses, permissions, or production data.
4. Do not rewrite the whole application in one pass.
5. Establish tokens and reusable primitives before page-level redesigns.
6. Follow existing project conventions where they are sound. Explain any convention you propose changing.
7. Do not add dependencies unless necessary. Explain every added dependency.
8. Keep the visual metaphor focused on equipping, training, formation, truth, and purpose. Avoid violent or excessively militaristic UI language and imagery.
9. Meet WCAG 2.2 AA-oriented accessibility requirements, including keyboard operation, focus visibility, semantic structure, sufficient contrast, accessible forms, reduced-motion support, and non-color status cues.
10. Design mobile-first and verify at 320px, 375px, 768px, 1024px, 1440px, and a wide desktop size where practical.
11. Run lint, type-check, tests, and production build after each phase. Fix regressions before continuing.
12. Never expose sensitive configuration, credentials, tokens, internal endpoints, or personal user content.

FIRST TASK: REPOSITORY AUDIT ONLY
Do not modify files yet.

Return:
- detected stack and versions;
- current route map grouped into public, authentication, student, educator, and admin routes;
- current layout and component architecture;
- styling and theme approach;
- reusable components worth keeping;
- components that need refactoring;
- authentication and role/permission model;
- data-fetching and state-management approach;
- test, lint, type-check, and build commands;
- accessibility and responsive issues visible from code;
- a file-by-file implementation plan for Phase 1;
- risks, assumptions, and questions that cannot be answered from the repository.

Do not ask me to confirm routine implementation choices. Make sensible recommendations based on the guide and repository. Stop after the audit so the implementation can proceed phase by phase.
```

---

# 24. Follow-up Prompts for the Agent

## Phase 1 prompt

```text
Proceed with Phase 1: Foundation, using the approved audit and The Armory design guide.

Implement the semantic token system, typography, base surfaces, focus styles, reduced-motion handling, responsive containers, and reusable UI primitives needed by later phases. Integrate with the existing architecture rather than creating a parallel design system.

Do not redesign full pages yet, except for minimal adjustments required to prove the primitives work. Add or update tests where appropriate. Run lint, type-check, tests, and production build.

Return:
- summary of implementation;
- changed files and why;
- token/component usage examples;
- test/build results;
- known limitations;
- exact proposed scope for Phase 2.
```

## Auth and shell prompt

```text
Proceed with Phase 2: Brand Shell and Authentication.

Apply The Armory identity to the public shell and all authentication pages while preserving existing auth behavior, validation, redirects, error handling, and security controls. Ensure mobile-first layouts, persistent field labels, autofill support, keyboard access, visible focus, readable errors, loading states, and an aspirational but concise tone.

Run all quality checks and summarize the changes and any remaining issues.
```

## Public discovery prompt

```text
Proceed with Phase 3: Public Discovery.

Redesign the public home page, Training Path catalog, search/filter experience, and path detail pages according to the guide. Keep real API contracts and existing routing. Prioritize a clear “Begin Training” journey, a “Start Here” experience, strong course-card hierarchy, and responsive behavior.

Do not bake course titles into images. Include loading, no-results, empty, error, unauthorized, and enrolled states as applicable. Run all quality checks.
```

## Student experience prompt

```text
Proceed with Phase 4: Student Experience.

Redesign the authenticated dashboard, My Training experience, progress and milestone components, and settings. Keep the primary “continue learning” action obvious. Avoid overcrowding the dashboard with metrics. Celebrate meaningful progress without framing missed activity as spiritual failure.

Preserve existing data contracts and functionality. Implement complete responsive and accessible states. Run all quality checks.
```

## Course player prompt

```text
Proceed with Phase 5: Learning Experience.

Redesign the course player as a focused Training Session experience. Implement a responsive desktop sidebar and mobile module drawer using existing course/module data. Add reusable visual treatments for Scripture Focus, Think About This, Prayer Moment, Apply It, Journal/Reflection, Key Takeaway, and Knowledge Check only where the existing data model supports them. Do not invent persistence or backend fields.

Prioritize reading comfort, media accessibility, progress clarity, safe navigation, completion feedback, keyboard access, and reduced motion. Run all quality checks.
```

## Educator/admin prompt

```text
Proceed with the educator and admin phases.

Apply The Armory system consistently while keeping these areas efficient and less decorative. Preserve roles and permission enforcement. Improve status communication, tables, forms, drawers/dialogs, empty states, publish safeguards, destructive confirmations, and responsive behavior.

Do not hide authorization weaknesses behind client-side navigation. Report any server-side enforcement concern separately. Run all quality checks.
```

---

# 25. Final Creative Summary

## Name

**The Armory**

## Endorsement

**by Rock Mission**

## Tagline

**Equipped by Truth.**

## Promise

A place where believers are equipped through Scripture, strengthened in faith, and prepared for Kingdom purpose.

## Visual signature

A geometric A/sword/light mark, deep cinematic navy environments, restrained teal and gold illumination, expressive typography, layered path motifs, focused content surfaces, and meaningful progress visuals.

## Experience principle

**Make discipleship feel purposeful, accessible, motivating, and spiritually substantial without turning it into either a generic LMS or a game about spiritual status.**
