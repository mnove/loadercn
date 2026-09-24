import { useSyncExternalStore } from "react"

const subscribe = () => () => {}

/** The site origin on the client, empty during server render. */
export function useOrigin() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.origin,
    () => ""
  )
}
