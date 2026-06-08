<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Coding Agent Instructions

These instructions apply to all AI coding agents working in this repository.

## Project Purpose

This project is a full-stack academic course planning website for students. The app will help students select a discipline, track completed/enrolled/planned courses, map AP exam scores to course credit, and build an interactive semester-by-semester pathway.

Build the project as a professional, maintainable template first. Do not try to complete every future feature at once.

## Primary Rules

1. **Avoid redundancy.**
   - Do not create duplicate files, duplicate components, duplicate types, or duplicate helper functions.
   - Before creating anything new, inspect the existing project structure and reuse what already exists.
   - If two pieces of code do nearly the same thing, combine them into one clear implementation.

2. **Keep the code beginner-readable.**
   - Prefer clear names over clever abstractions.
   - Keep functions small and focused.
   - Use simple TypeScript types that a beginner can understand.
   - Add comments only when they clarify non-obvious logic.
   - Avoid over-engineering, unnecessary design patterns, and generic utility layers.

3. **Use one source of truth for data.**
   - Do not hardcode the same course, discipline, AP exam, or semester data in multiple components.
   - Shared academic data should live in `src/data/`.
   - Shared TypeScript types should live in `src/types/`.
   - Shared calculations should live in `src/lib/`.

4. **Keep changes small and reviewable.**
   - Complete one feature or cleanup task at a time.
   - Do not rewrite unrelated files.
   - Do not rename files or reorganize folders unless the task requires it.
   - Do not add new dependencies unless explicitly approved.

5. **Preserve a professional documentation style.**
   - `README.md` is for humans. Keep it clear, normal, and visually clean.
   - Do not write the README in an AI-generated tone.
   - Do not put version history or long implementation notes in the README.
   - Use `CHANGELOG.md` for change history.
   - Keep `CLAUDE.md` as a pointer to this file unless asked otherwise.

## Preferred Project Structure

Use this structure as the project grows:

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    layout/
    planner/
    courses/
    ui/
  data/
    disciplines.ts
    courses.ts
    ap-equivalencies.ts
  lib/
    course-utils.ts
    pathway-utils.ts
  types/
    academic-plan.ts
```

Only create these folders when they are needed. Do not create empty folders.

## Component Guidelines

- Use Server Components by default.
- Use Client Components only when state, event handlers, browser APIs, or React hooks are required.
- Keep UI components focused on display.
- Keep data transformation and calculations outside of UI components when practical.
- Do not create multiple components that render the same layout with different names.

## Data Guidelines

Academic data should be easy to edit later by a beginner coder.

Preferred pattern:

```ts
export const disciplines = [
  {
    id: "engineering",
    name: "Engineering",
    description: "Sample pathway for engineering-focused students.",
  },
];
```

Use stable IDs such as `engineering`, `computer-science`, and `business`. Avoid using display names as IDs.

## Planned Features

The long-term app may include:

- Test-user login
- Discipline selection
- Core and elective course selection
- Course status tracking: completed, enrolled, planned, pending
- AP exam score entry
- AP exam to college course equivalency mapping
- Semester-by-semester pathway map
- Saved pathways
- PDF generation for forms
- Counselor view
- Data import from `.docx` or `.pdf`

Do not implement all of these at once. Build them incrementally.

## PDF and DOCX Data Rule

The final app may use `.pdf` or `.docx` files as source documents, but the website should use structured data after extraction.

Preferred pipeline:

```txt
PDF/DOCX source document -> extracted structured data -> website data files -> UI
```

Do not make UI components parse PDFs or DOCX files directly.

## README and CHANGELOG Rules

### README.md

The README should include:

- Project name
- Short project purpose
- Tech stack
- Installation steps
- Development commands
- Basic project structure

The README should not include:

- AI-generated explanations
- Detailed version history
- Long task logs
- Internal planning notes

### CHANGELOG.md

Use `CHANGELOG.md` to track meaningful changes.

Use this format:

```md
# Changelog

## Unreleased

- Added ...
- Changed ...
- Fixed ...
```

Keep entries short and understandable.

## Quality Checks

Before reporting that work is complete, run:

```bash
npm run lint
npm run build
```

If a command fails, fix the issue before finishing. If the failure cannot be fixed, clearly explain what failed and why.

## Git and Review Expectations

- Use concise commit messages.
- Do not make unrelated changes in the same commit.
- Summarize what changed after each task.
- Mention any files added or modified.
- Mention whether `npm run lint` and `npm run build` passed.

## When Unsure

Ask before making large decisions, including:

- Adding a dependency
- Changing the app architecture
- Creating authentication
- Adding a database
- Implementing PDF/DOCX parsing
- Replacing the design direction
