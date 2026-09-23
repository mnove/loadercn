/** A short "when to use it" note for each loader, shown on its docs page. */
export const loaderNotes: Record<string, string> = {
  // Grid
  "grid-wave":
    "A calm, general-purpose loader. Its diagonal motion reads well at small sizes, so it fits buttons, table cells, and inline status next to text.",
  "grid-pulse":
    "Use it when something is waiting rather than working, such as a pending connection or a queued job. The steady rhythm stays quiet on busy screens.",
  "grid-snake":
    "Good for longer waits where a bit of personality helps, like generating a report or processing an upload. The path gives the eye something to follow.",
  "grid-shuffle":
    "Suits playful products and empty states. Reach for it when a loader can have some character without competing with the content around it.",
  "grid-ripple":
    "A gentle loader for full-panel or card-level loading. The soft ripple works well at larger sizes where a single spinner would feel sparse.",
  "grid-checker":
    "Its alternating halves suggest back-and-forth work, so it fits syncing, comparing, or any two-sided process.",
  "grid-perimeter":
    "Use it for progress that circles back on itself, like polling or retrying. The trail around the edge reads clearly even at 20px.",
  "grid-puzzle":
    "A thoughtful choice for rearranging or reorganizing tasks: sorting, reindexing, or rebuilding a layout.",
  "grid-flip":
    "Works well for content that is about to change, like switching views or refreshing cards. The flipping tiles hint at something being replaced.",
  "grid-spiral":
    "Suits focused, inward work such as searching, resolving, or compiling. The light winds in and back out, so it loops without a visible restart.",
  "grid-lattice":
    "The quietest grid loader. Use it where motion should barely register, like background refreshes or ambient status in a sidebar.",
  "grid-assemble":
    "Made for build and setup moments: creating a project, deploying, or assembling a document. It reads as pieces coming together.",
  "grid-scan":
    "Use it for scanning, indexing, or reading data. The row-by-row band feels methodical, which suits technical and developer-facing interfaces.",
  "grid-scan-squares":
    "A larger, square-cell take on matrix scan. Pick it when the loader sits at a bigger size and needs a bit more presence.",
  "grid-column-scan":
    "Suits column-oriented work like importing spreadsheets, parsing tables, or processing records one field at a time.",
  "grid-diagonal-scan":
    "A sharper, more energetic scan. Use it when the wait should feel fast, like quick lookups or search-as-you-type.",
  "grid-diagonal-flow":
    "The smoothest of the scans. Choose it for polished, brand-forward screens such as splash screens or onboarding steps.",
  "grid-scan-bounce":
    "A back-and-forth scan with no visible loop point. Fits indefinite waits like listening for events or waiting on a device.",
  "grid-flow-down":
    "Suggests content arriving from above, so it pairs well with feeds, downloads, and lists that are about to fill in.",
  "grid-flow-up":
    "Suggests something rising or being sent, so it fits uploads, publishing, and submitting forms.",
  "grid-flow-right":
    "Reads as moving forward. Use it for next-step transitions, wizards, and anything that advances the user along a flow.",
  "grid-flow-left":
    "Mirrors flow right, for right-to-left layouts or for undo, rollback, and going-back actions.",
  "grid-scan-bounce-horizontal":
    "A horizontal back-and-forth scan. Fits wide, short spaces like toolbars or inline status next to a label.",

  // Orbital
  "orbit-binary":
    "Suits anything with two sides working together: pairing devices, syncing accounts, or establishing a connection.",
  "orbit-atom":
    "A scientific, technical feel. Good for AI, data, and developer tools where the wait involves real computation.",
  "orbit-satellite":
    "A simple, friendly orbit that works almost anywhere. A good default when you want something softer than a spinning ring.",
  "orbit-eclipse":
    "Use it for moments of alignment, like matching, merging, or resolving conflicts. The paths meet and part without a hard loop.",
  "orbit-resonance":
    "A calm, layered loader for full-page or hero loading states. The concentric orbits fill space well at larger sizes.",
  "orbit-trio":
    "Fits collaborative or multi-part work: inviting a team, running several tasks at once, or group syncing.",
  "orbit-figure-eight":
    "An endless loop with no start or end. Use it for indefinite waits where you can't show progress, like streaming or listening.",
  "orbit-comet":
    "Fast and directional. Choose it when the wait should feel quick and purposeful, like sending a message or launching a job.",
  "orbit-nested":
    "Suits processes with steps inside steps, like a pipeline or a batch of nested tasks. The layered motion rewards a larger size.",
  "orbit-precession":
    "A slow, hypnotic loader for longer background work. It changes gradually, so it doesn't get tiresome on long waits.",
  "orbit-exchange":
    "Use it for swapping, trading, or transferring, such as converting files, moving data between accounts, or payments.",
  "orbit-slingshot":
    "Energetic and a little dramatic. Good for launch moments like deploying, publishing, or kicking off a build.",
  "orbit-tilted-atom":
    "A more dimensional atom. Fits AI and generation features where you want the loader to feel a little more alive.",

  // Classic
  "classic-ring":
    "The universal spinner. Use it in buttons, inputs, and anywhere users should instantly recognize that something is loading.",
  "classic-spokes":
    "The familiar system-style spinner. Fits native-feeling interfaces, settings screens, and utility apps.",
  "classic-dotted":
    "A lighter alternative to the ring spinner. Works well on busy backgrounds where a solid ring would feel heavy.",
  "classic-dual-ring":
    "A ring spinner with more presence. Use it for page-level or modal loading where a single ring looks too thin.",
  "classic-chasing-dots":
    "A lively, compact spinner. Suits consumer apps and anywhere a classic loader can be a bit more playful.",
  "classic-chasing-dots-trio":
    "A fuller version of chasing dots. Pick it at larger sizes, where three dots balance the circle better than two.",
  "classic-bouncing-dots":
    "Friendly and informal. Good for chat, comments, and conversational interfaces.",
  "classic-typing":
    "Use it exactly where people expect it: when someone, or an AI assistant, is composing a reply.",
  "classic-equalizer":
    "Made for audio and media: loading tracks, recording, transcribing, or voice input.",
  "classic-progress":
    "An indeterminate progress bar for the top of a page, a card, or a file row. Use it when you know work is happening but not how long it will take.",
  "classic-ripple":
    "Suits searching, discovering, or broadcasting, like finding nearby devices or waiting for a signal.",
  "classic-squares":
    "A geometric spinner with more structure than a ring. Fits design tools and product UIs with a crisp, angular style.",
  "classic-folding-cube":
    "A nostalgic, playful loader. Good for splash screens and larger loading states where the folding motion can be seen.",
  "classic-dot-stream":
    "A horizontal loader for inline and wide spaces. Use it inside text, under headings, or in narrow toolbars.",
  "classic-liquid-stream":
    "A softer, more organic dot stream. Suits AI and generative features where the output is still taking shape.",
  "classic-pulsing-spokes":
    "A more expressive take on the system spinner. Use it when a classic spokes loader needs a little more energy.",
  "classic-circular-tail":
    "A sleek, modern ring with a fading tail. A polished default for dashboards and product UIs.",
}
