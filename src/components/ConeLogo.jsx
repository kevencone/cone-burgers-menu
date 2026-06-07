import { T } from "../tokens.js";

export default function ConeLogo({ size = 32, color = T.orange }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
         style={{ display: "block", flexShrink: 0 }}>
      <polygon points="20,4 36,32 4,32" stroke={color} strokeWidth="2.5"
               fill="none" strokeLinejoin="round" />
      <line x1="4" y1="32" x2="36" y2="32" stroke={color} strokeWidth="2.5"
            strokeLinecap="round" />
      <circle cx="20" cy="14" r="2.5" fill={color} />
    </svg>
  );
}
