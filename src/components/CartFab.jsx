import { motion, AnimatePresence } from "framer-motion";
import { T } from "../tokens.js";
import { CONFIG } from "../data/config.js";

export default function CartFab({ count, total, onClick }) {
  if (count <= 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      style={{
        position: "fixed", bottom: 20, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50, width: "calc(100% - 40px)", maxWidth: 440,
      }}
    >
      <button onClick={onClick} style={{
        width: "100%",
        background: T.orange,
        color: T.white,
        padding: "14px 20px",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 14,
        boxShadow: `0 12px 36px ${T.orange}66, 0 0 0 1px ${T.orangeL}`,
      }}>
        <div style={{
          width: 36, height: 36,
          background: "rgba(255,255,255,0.18)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700, fontSize: 14,
        }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            >{count}</motion.span>
          </AnimatePresence>
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            letterSpacing: "0.32em", opacity: 0.85,
          }}>VER CARRITO</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20, lineHeight: 1, letterSpacing: "0.04em",
            marginTop: 2,
          }}>{CONFIG.currency}{total.toFixed(2)}</div>
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 18, letterSpacing: "0.06em",
        }}>→</div>
      </button>
    </motion.div>
  );
}
