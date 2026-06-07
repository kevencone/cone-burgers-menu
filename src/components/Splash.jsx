import { useEffect } from "react";
import { motion } from "framer-motion";
import { T } from "../tokens.js";
import ConeLogo from "./ConeLogo.jsx";

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      height: "100vh", background: T.bg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid backdrop */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.35,
        maskImage: "radial-gradient(ellipse 60% 60% at center, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at center, black, transparent)",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 340, height: 340, borderRadius: "50%",
        background: `radial-gradient(circle, ${T.orange}22, transparent 70%)`,
      }} />

      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <ConeLogo size={56} color={T.orange} />
        </motion.div>

        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 78, color: T.white, lineHeight: 0.86,
          letterSpacing: "-0.01em", textAlign: "center",
        }}>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.77, 0, 0.18, 1] }}
          >CONE</motion.div>
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.77, 0, 0.18, 1] }}
            style={{ color: T.orange }}
          >BURGERS</motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.5 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.5em",
            color: T.muted,
          }}
        >MENÚ · BY CONEMEDIA</motion.div>
      </div>

      <div style={{ position: "absolute", bottom: 44, left: "10%", right: "10%", height: 1, background: T.border, overflow: "hidden" }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.1, ease: "easeOut" }}
          style={{ height: "100%", background: T.orange, transformOrigin: "left" }}
        />
      </div>
    </div>
  );
}
