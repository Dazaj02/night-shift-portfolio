export function SkipLink({ label }: { label: string }) {
  return (
    <a href="#main" className="skip-link frame btn-cut btn-cut--primary">
      <span>{label}</span>
    </a>
  );
}
