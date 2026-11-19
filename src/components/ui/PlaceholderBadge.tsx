export function PlaceholderBadge({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center border border-alert px-2 py-0.5 font-mono text-[0.75rem] font-medium uppercase leading-none tracking-[0.12em] text-alert ${className}`}
    >
      {label}
    </span>
  );
}
