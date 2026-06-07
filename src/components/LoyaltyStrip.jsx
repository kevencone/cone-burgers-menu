import { motion } from "framer-motion";
import { T, TOTAL_STAMPS } from "../tokens.js";

export default function LoyaltyStrip({ user, onClick }) {
  if (!user) return null;
  const stamps = user.stamps || 0;
  const remaining = Math.max(0, TOTAL_STAMPS - stamps);
  const isComplete = stamps >= TOTAL_STAMPS;

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      style={{
        width: "100%", textAlign: "left",
        background: T.card,
        border: `1px solid ${isComplete ? T.orange : T.border}`,
        padding: "14px 16px",
        position: "relative", overflow: "hidden",
        cursor: "pointer",
        display: "flex", alignItems: "center", gap: 14,
      }}
    >
      {/* corner */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 0, height: 0,
        borderStyle: "solid", borderWidth: "0 32px 32px 0",
        borderColor: `transparent ${T.orange} transparent transparent`,
        opacity: 0.85,
      }} />

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700,
        fontSize: 26, color: T.orange, lineHeight: 1,
      }}>{stamps}<span style={{ fontSize: 13, color: T.muted, fontWeight: 400 }}>/{TOTAL_STAMPS}</span></div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          letterSpacing: "0.32em", color: T.muted, marginBottom: 4,
        }}>HOLA, {user.name?.toUpperCase()}</div>
        <div style={{ fontSize: 13, color: T.text, fontWeight: 500 }}>
          {isComplete
            ? <span style={{ color: T.orange }}>¡COMBO GRATIS LISTO PARA CANJEAR!</span>
            : <>Te faltan <span style={{ color: T.orange, fontWeight: 700 }}>{remaining}</span> sellos para tu combo gratis</>}
        </div>
        {/* progress bar */}
        <div style={{ height: 2, background: T.border, marginTop: 8, overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((stamps / TOTAL_STAMPS) * 100, 100)}%` }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              height: "100%",
              background: `linear-gradient(90deg, ${T.orange}, ${T.orangeL})`,
              boxShadow: `0 0 8px ${T.orange}66`,
            }}
          />
        </div>
      </div>

      <div style={{ color: T.muted, fontSize: 18 }}>→</div>
    </motion.button>
  );
}
