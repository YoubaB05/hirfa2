export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/assets/logo.png"
      alt="Hirfa Logo"
      className={`w-10 h-10 object-contain ${className}`}
    />
  );
}