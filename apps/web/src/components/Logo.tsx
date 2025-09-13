export default function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" className={className} aria-label="SATYA Portal Logo">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6EE7F9" />
          <stop offset="0.5" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      <text x="6" y="40" fontFamily="Inter, system-ui" fontWeight="700" fontSize="32" fill="url(#g)">SATYA</text>
      <text x="130" y="40" fontFamily="Inter, system-ui" fontWeight="500" fontSize="16" fill="#0f172a">Portal</text>
    </svg>
  )
}
