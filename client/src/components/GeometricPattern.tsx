export function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 10L70 30L70 50L50 70L30 50L30 30L50 10Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.1"
      />
      <path
        d="M50 20L65 35L65 50L50 65L35 50L35 35L50 20Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
      />
      <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function ArabicCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0 L30 0 L30 5 L5 5 L5 30 L0 30 Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M10 10 L25 10 L25 12 L12 12 L12 25 L10 25 Z"
        fill="currentColor"
        opacity="0.2"
      />
    </svg>
  );
}
