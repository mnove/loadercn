<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

- use shadcn components for UI elements, as much as possible. If needed, you can create your own components, but try to use shadcn components first.
- if a shadcn component is not available add it via the shadcn CLI tool. If you are unsure how to do this, ask for help.
- use tailwindcss v4 for styling
- use the `app` directory for routing and page structure, not the `pages` directory.
- make sure the registry conform to shadcn's design system and conventions. If you are unsure about any design decisions, ask for clarification.
