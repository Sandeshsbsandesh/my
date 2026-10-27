import { publicUrl } from "../lib/publicUrl"

export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  return (
    <img
      src={publicUrl("zebriyo-logo.png")}
      alt="Zebriyo"
      draggable={false}
      className={size === "footer" ? "block h-12 w-auto sm:h-14" : "block h-9 w-auto sm:h-10"}
    />
  )
}
