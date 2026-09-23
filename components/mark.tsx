export function Mark({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid grid-cols-3 gap-[3px] ${small ? "size-5" : "size-6"}`}
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className={i === 2 || i === 6 ? "bg-primary/30" : "bg-primary"}
        />
      ))}
    </span>
  )
}
