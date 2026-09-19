import { ClassicDotStream } from "@/registry/loaders/classic-dot-stream"
import { ClassicLiquidStream } from "@/registry/loaders/classic-liquid-stream"
import { ClassicPulsingSpokes } from "@/registry/loaders/classic-pulsing-spokes"
import { ClassicCircularTail } from "@/registry/loaders/classic-circular-tail"
import { OrbitTiltedAtom } from "@/registry/loaders/orbit-tilted-atom"
import { ClassicChasingDotsTrio } from "@/registry/loaders/classic-chasing-dots-trio"
import { ClassicRing } from "@/registry/loaders/classic-ring"
import { ClassicSpokes } from "@/registry/loaders/classic-spokes"
import { ClassicDotted } from "@/registry/loaders/classic-dotted"
import { ClassicDualRing } from "@/registry/loaders/classic-dual-ring"
import { ClassicChasingDots } from "@/registry/loaders/classic-chasing-dots"
import { ClassicBouncingDots } from "@/registry/loaders/classic-bouncing-dots"
import { ClassicTyping } from "@/registry/loaders/classic-typing"
import { ClassicEqualizer } from "@/registry/loaders/classic-equalizer"
import { ClassicProgress } from "@/registry/loaders/classic-progress"
import { ClassicRipple } from "@/registry/loaders/classic-ripple"
import { ClassicSquares } from "@/registry/loaders/classic-squares"
import { ClassicFoldingCube } from "@/registry/loaders/classic-folding-cube"
import { GridFlowDown } from "@/registry/loaders/grid-flow-down"
import { GridFlowUp } from "@/registry/loaders/grid-flow-up"
import { GridFlowRight } from "@/registry/loaders/grid-flow-right"
import { GridFlowLeft } from "@/registry/loaders/grid-flow-left"
import { GridScanBounceHorizontal } from "@/registry/loaders/grid-scan-bounce-horizontal"
import { GridDiagonalFlow } from "@/registry/loaders/grid-diagonal-flow"
import { GridScan } from "@/registry/loaders/grid-scan"
import { GridScanSquares } from "@/registry/loaders/grid-scan-squares"
import { GridColumnScan } from "@/registry/loaders/grid-column-scan"
import { GridDiagonalScan } from "@/registry/loaders/grid-diagonal-scan"
import { GridScanBounce } from "@/registry/loaders/grid-scan-bounce"
import { GridSpiral } from "@/registry/loaders/grid-spiral"
import { GridLattice } from "@/registry/loaders/grid-lattice"
import { GridAssemble } from "@/registry/loaders/grid-assemble"
import { OrbitPrecession } from "@/registry/loaders/orbit-precession"
import { OrbitExchange } from "@/registry/loaders/orbit-exchange"
import { OrbitSlingshot } from "@/registry/loaders/orbit-slingshot"
import { GridPerimeter } from "@/registry/loaders/grid-perimeter"
import { GridPuzzle } from "@/registry/loaders/grid-puzzle"
import { GridFlip } from "@/registry/loaders/grid-flip"
import { OrbitFigureEight } from "@/registry/loaders/orbit-figure-eight"
import { OrbitComet } from "@/registry/loaders/orbit-comet"
import { OrbitNested } from "@/registry/loaders/orbit-nested"
import { GridWave } from "@/registry/loaders/grid-wave"
import { GridPulse } from "@/registry/loaders/grid-pulse"
import { GridSnake } from "@/registry/loaders/grid-snake"
import { GridShuffle } from "@/registry/loaders/grid-shuffle"
import { GridRipple } from "@/registry/loaders/grid-ripple"
import { GridChecker } from "@/registry/loaders/grid-checker"
import { OrbitBinary } from "@/registry/loaders/orbit-binary"
import { OrbitAtom } from "@/registry/loaders/orbit-atom"
import { OrbitSatellite } from "@/registry/loaders/orbit-satellite"
import { OrbitEclipse } from "@/registry/loaders/orbit-eclipse"
import { OrbitResonance } from "@/registry/loaders/orbit-resonance"
import { OrbitTrio } from "@/registry/loaders/orbit-trio"

export const loaderComponents = {
  "classic-dot-stream": ClassicDotStream,
  "classic-liquid-stream": ClassicLiquidStream,
  "classic-pulsing-spokes": ClassicPulsingSpokes,
  "classic-circular-tail": ClassicCircularTail,
  "orbit-tilted-atom": OrbitTiltedAtom,

  "classic-chasing-dots-trio": ClassicChasingDotsTrio,
  "classic-ring": ClassicRing,
  "classic-spokes": ClassicSpokes,
  "classic-dotted": ClassicDotted,
  "classic-dual-ring": ClassicDualRing,
  "classic-chasing-dots": ClassicChasingDots,
  "classic-bouncing-dots": ClassicBouncingDots,
  "classic-typing": ClassicTyping,
  "classic-equalizer": ClassicEqualizer,
  "classic-progress": ClassicProgress,
  "classic-ripple": ClassicRipple,
  "classic-squares": ClassicSquares,
  "classic-folding-cube": ClassicFoldingCube,

  "grid-flow-down": GridFlowDown,
  "grid-flow-up": GridFlowUp,
  "grid-flow-right": GridFlowRight,
  "grid-flow-left": GridFlowLeft,
  "grid-scan-bounce-horizontal": GridScanBounceHorizontal,

  "grid-scan": GridScan,
  "grid-scan-squares": GridScanSquares,
  "grid-column-scan": GridColumnScan,
  "grid-diagonal-scan": GridDiagonalScan,
  "grid-diagonal-flow": GridDiagonalFlow,
  "grid-scan-bounce": GridScanBounce,

  "grid-spiral": GridSpiral,
  "grid-lattice": GridLattice,
  "grid-assemble": GridAssemble,
  "orbit-precession": OrbitPrecession,
  "orbit-exchange": OrbitExchange,
  "orbit-slingshot": OrbitSlingshot,

  "grid-perimeter": GridPerimeter,
  "grid-puzzle": GridPuzzle,
  "grid-flip": GridFlip,
  "orbit-figure-eight": OrbitFigureEight,
  "orbit-comet": OrbitComet,
  "orbit-nested": OrbitNested,

  "grid-wave": GridWave,
  "grid-pulse": GridPulse,
  "grid-snake": GridSnake,
  "grid-shuffle": GridShuffle,
  "grid-ripple": GridRipple,
  "grid-checker": GridChecker,
  "orbit-binary": OrbitBinary,
  "orbit-atom": OrbitAtom,
  "orbit-satellite": OrbitSatellite,
  "orbit-eclipse": OrbitEclipse,
  "orbit-resonance": OrbitResonance,
  "orbit-trio": OrbitTrio,
}
