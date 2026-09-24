/** A short "when to use it" note for each loader, shown on its docs page. */
export const loaderNotes: Record<string, string> = {
  "chart-bars":
    "Fits dashboards, reports, and analytics panels while their data loads. The baseline and staggered growth read as a chart rather than an audio level.",
  "chart-line":
    "Fits trend views, metrics, and time-series charts that are still fetching. Clear even at small sizes.",
  "chart-sparkline":
    "Fits stat cards, table rows, and live metrics. Suggests a value that is streaming in rather than a single fetch.",
  "chart-donut":
    "Fits breakdowns, usage summaries, and composition charts. A segmented alternative to a ring spinner.",
  "chart-dot-area":
    "Fits analytics dashboards and usage graphs. The dot matrix gives a soft, textured feel that pairs with the particle globes.",
  "chart-dot-series":
    "Fits comparisons, forecasts, and multi-metric views. The layered series suggest several values updating together.",
  "chart-dot-scatter":
    "Fits analysis, clustering, and model training. The cloud settling on a trend reads as data finding its pattern.",
  "chart-dot-sparkline":
    "Fits stat cards, live metrics, and monitoring views. The pulsing lead dot marks the latest value while its trail fades into the background.",
  "chart-heartbeat":
    "Fits monitoring, health checks, and uptime views. The trace reads as a system that is alive and being watched.",
  "chart-dot-gauge":
    "Fits KPIs, scores, and capacity readouts while a value is being measured.",
  "chart-dot-radar":
    "Fits profiles, comparisons, and multi-attribute scores. The shifting outline suggests many dimensions being evaluated.",
  "chart-dot-bubbles":
    "Fits market maps, portfolio views, and exploratory analysis where each point carries a third value.",
  "classic-processing":
    "Fits batch jobs, imports, and background processing. Parallel streams suggest several pieces of work moving at once.",
  "classic-liquid-processing":
    "Fits generative or AI pipelines working through several inputs at once. Softer than Processing, with streams that feel fluid rather than mechanical.",
  "classic-text-shimmer":
    "Fits fetching text, articles, or summaries. This compact status illustration suggests incoming content; use a layout-sized skeleton when reserving actual content space.",

  "orbit-searching":
    "Fits search, retrieval, and discovery. A bright longitude sweep overtakes the rotating particle surface; use 64px or larger to show the depth clearly.",
  "orbit-scanning-sphere":
    "Fits discovery, indexing, and searching. A travelling highlight reveals the sphere one band at a time; use 64px or larger for its depth detail.",
  "orbit-thought-orb":
    "Fits reasoning, retrieval, and multi-step processing. The internal routes add activity while the outer sphere stays quiet.",
  "orbit-morphing-sphere":
    "Fits transformation, generation, and preparing structured results. Use it at card size to make the change in volume clear.",

  "orbit-particle-globe":
    "A dimensional loader for computation and discovery. Use 64px or larger to bring out the particle depth; its silhouette also works in compact previews.",
  "orbit-breathing-orb":
    "Fits waiting, listening, and longer generation tasks. The slow surface breathing is best in cards and panels.",
  "orbit-latitude-globe":
    "Fits global search, connectivity, and data processing. The ordered bands and bright signals are clearest at 64px or larger.",

  "network-deduce":
    "Fits evaluation, search, and decision-making tasks. Signals move from a single premise into several possible outcomes.",
  "network-synthesize":
    "Use it for combining sources, summarizing, and assembling a result from several inputs.",
  "orbit-focus":
    "A calm loader for refining a search or bringing a result into focus. The alignment reads best in cards and panels.",
  "network-associate":
    "Fits linking records, finding relationships, or retrieving related information. Its connections follow a deliberate repeating sequence.",

  "orbit-helix":
    "Fits scientific tools, generation, and multi-stage processing. The linked strands are clearest in cards and panels.",
  "classic-dot-morph":
    "A geometric loader for creation and transformation tasks. Use it at card size so the changing outline has room to read.",
  "classic-circuit":
    "Fits connections, routing, and background processing in developer tools. The fixed tracks keep the motion easy to follow.",
  "grid-render":
    "Use it for rendering, assembling previews, or processing images. The repeated passes indicate activity rather than measured progress.",

  "classic-morph":
    "A compact geometric loader for buttons, cards, and view transitions. The changing silhouette adds personality while keeping the motion simple.",
  "classic-hourglass":
    "Use it for longer waits such as exports or queued jobs. The repeated flip indicates ongoing work without suggesting a measured completion percentage.",
  "orbit-radar":
    "Fits discovery and connection states, such as finding nearby devices or searching for a service. The dial is clearest in cards and panels.",
  "grid-conveyor":
    "A steady loader for batch processing, imports, and moving records. Alternating rows give the grid motion without implying a completion percentage.",

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
