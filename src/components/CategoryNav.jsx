import { motion } from "framer-motion";
import { T } from "../tokens.js";
import { CATEGORIES } from "../data/menu.js";

export default function CategoryNav({ active, onChange }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 30,
      background: T.bg,
      borderBottom: `1px solid ${T.border}`,
      padding: "0 4px",
    }}>
      <div style={{
        display: "flex", gap: 4,
        overflowX: "auto",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}>
        {CATEGORIES.map(c => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              style={{
                position: "relative",
                padding: "16px 18px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: isActive ? T.orange : T.muted,
                whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
            >
              {c.short}
              {isActive && (
                <motion.div
                  layoutId="cat-underline"
                  style={{
                    position: "absolute",
                    bottom: -1, left: 12, right: 12,
                    height: 2,
                    background: T.orange,
                    boxShadow: `0 0 8px ${T.orange}88`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
