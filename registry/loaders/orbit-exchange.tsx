import type { CSSProperties, ComponentProps } from "react"

export type OrbitExchangeProps = ComponentProps<"span"> & {
  size?: number
  /** Duration of one complete cycle, in seconds. */
  speed?: number
  label?: string
}

export function OrbitExchange({
  size = 40,
  speed = 1.6,
  label = "Loading",
  className,
  style,
  ...props
}: OrbitExchangeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      {...props}
      className={["orbit-exchange-loader", className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,
          "--loader-duration": `${Math.max(0.1, speed)}s`,
          ...style,
        } as CSSProperties
      }
    >
      <span aria-hidden="true" className="orbit-exchange-loader-system">
        <span className="orbit-exchange-loader-track orbit-exchange-loader-outer" />
        <span className="orbit-exchange-loader-track orbit-exchange-loader-inner" />
        <span className="orbit-exchange-loader-rotor">
          <span className="orbit-exchange-loader-dot" />
        </span>
        <span className="orbit-exchange-loader-rotor orbit-exchange-loader-opposite">
          <span className="orbit-exchange-loader-dot" />
        </span>
      </span>
      <style>{`
        .orbit-exchange-loader { display: inline-flex; flex-shrink: 0; }
        .orbit-exchange-loader-system { position: relative; width: 100%; height: 100%; }
        .orbit-exchange-loader-track { position: absolute; border: 1px solid color-mix(in srgb, currentColor 17%, transparent); border-radius: 50%; }
        .orbit-exchange-loader-outer { inset: 12%; }
        .orbit-exchange-loader-inner { inset: 32%; }
        .orbit-exchange-loader-rotor { position: absolute; inset: 0; animation: orbit-exchange-loader-turn var(--loader-duration) linear infinite; }
        .orbit-exchange-loader-opposite { rotate: 180deg; }
        .orbit-exchange-loader-dot { position: absolute; left: 88%; top: 50%; width: 12%; height: 12%; background: currentColor; border-radius: 50%; transform: translate(-50%, -50%); animation: orbit-exchange-loader-swap var(--loader-duration) ease-in-out infinite; }
        .orbit-exchange-loader-opposite > .orbit-exchange-loader-dot { left: 68%; animation-name: orbit-exchange-loader-return; }
        @keyframes orbit-exchange-loader-turn { to { transform: rotate(360deg); } }
        @keyframes orbit-exchange-loader-swap { 0%, 15%, 100% { left: 88%; } 45%, 65% { left: 68%; } 95% { left: 88%; } }
        @keyframes orbit-exchange-loader-return { 0%, 15%, 100% { left: 68%; } 45%, 65% { left: 88%; } 95% { left: 68%; } }
        @media (prefers-reduced-motion: reduce) { .orbit-exchange-loader-rotor, .orbit-exchange-loader-dot, .orbit-exchange-loader-opposite > .orbit-exchange-loader-dot { animation: none; } }
      `}</style>
    </span>
  )
}
