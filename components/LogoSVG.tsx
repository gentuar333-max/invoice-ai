// components/LogoSVG.tsx
export default function LogoSVG({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5"/>
      <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="'DM Sans',sans-serif">I</text>
      <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontFamily="'Instrument Serif',serif" fontStyle="italic">A</text>
      <circle cx="28" cy="5" r="3" fill="#818cf8"/>
    </svg>
  )
}