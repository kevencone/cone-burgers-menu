import { useState } from "react";
import { T } from "../tokens.js";

/* SVG icons temáticos para fallback elegante */
const ICONS = {
  burger: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 36c0-7 8-12 18-12s18 5 18 12" />
      <path d="M12 38h40" />
      <path d="M14 42h36c0 3-3 6-7 6H21c-4 0-7-3-7-6z" />
      <circle cx="22" cy="30" r="1.2" fill="currentColor" />
      <circle cx="32" cy="28" r="1.2" fill="currentColor" />
      <circle cx="42" cy="30" r="1.2" fill="currentColor" />
    </g>
  ),
  fries: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 28h24l-2 22a3 3 0 0 1-3 3H25a3 3 0 0 1-3-3z" />
      <path d="M20 28v-2h24v2" />
      <path d="M26 26V14M32 26V10M38 26V14M44 26V18" />
    </g>
  ),
  chicken: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 40c0-8 7-14 16-14s16 6 16 14c0 4-3 8-8 8H24c-5 0-8-4-8-8z" />
      <path d="M20 36c2-2 4-2 6 0M30 34c2-2 4-2 6 0M40 36c2-2 4-2 6 0" />
    </g>
  ),
  cup: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 18h20l-2 32a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4z" />
      <path d="M22 18l1-4h18l1 4" />
      <path d="M26 28h12" />
    </g>
  ),
  shake: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 22h20l-3 30a3 3 0 0 1-3 3H28a3 3 0 0 1-3-3z" />
      <path d="M22 22l2-6h16l2 6" />
      <path d="M32 16v-6" />
      <circle cx="32" cy="8" r="2" fill="currentColor" />
    </g>
  ),
  coffee: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 22h28l-2 26a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z" />
      <path d="M42 28h4a4 4 0 0 1 0 8h-4" />
      <path d="M22 12c2 2 0 4 2 6M30 10c2 2 0 4 2 6M38 12c2 2 0 4 2 6" />
    </g>
  ),
  ring: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none">
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="7" />
    </g>
  ),
};

export default function ProductImage({ product, height = 200, big = false }) {
  const [errored, setErrored] = useState(false);
  const showReal = product.imageRef && !errored;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height,
      overflow: "hidden",
      background: T.surface,
    }}>
      {/* Imagen real */}
      {showReal && (
        <img
          src={product.imageRef}
          alt={product.name}
          loading="lazy"
          onError={() => setErrored(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "contrast(1.05) saturate(1.05)",
          }}
        />
      )}

      {/* Fallback placeholder elegante */}
      {!showReal && (
        <>
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at 30% 30%, ${T.orangeB}, transparent 60%), ${T.card}`,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `repeating-linear-gradient(-45deg, transparent 0, transparent 10px, ${T.border}55 10px, ${T.border}55 11px)`,
            opacity: 0.5,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: T.orange, opacity: 0.85,
          }}>
            <svg width={big ? 140 : 84} height={big ? 140 : 84} viewBox="0 0 64 64">
              {ICONS[product.icon] || ICONS.burger}
            </svg>
          </div>
        </>
      )}

      {/* Overlay marca CONE */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: 0, height: 0,
        borderStyle: "solid",
        borderWidth: `0 ${big ? 56 : 36}px ${big ? 56 : 36}px 0`,
        borderColor: `transparent ${T.orange} transparent transparent`,
        opacity: 0.95,
      }} />

      {/* Gradiente abajo para mejor legibilidad */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: "45%",
        background: `linear-gradient(to top, ${T.bg}cc, transparent)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}
