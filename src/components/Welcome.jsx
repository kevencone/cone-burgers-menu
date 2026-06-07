import { motion } from "framer-motion";
import { T } from "../tokens.js";
import ConeLogo from "./ConeLogo.jsx";

export default function Welcome({ onLogin, onGuest }) {
  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      maxWidth: 480, margin: "0 auto",
      padding: "44px 24px 36px",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid decoration */}
      <div style={{
        position: "absolute", right: -80, top: 40,
        width: 320, height: 320,
        backgroundImage: `linear-gradient(${T.border}88 1px, transparent 1px), linear-gradient(90deg, ${T.border}88 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(circle, black, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, black, transparent 70%)",
        opacity: 0.5, pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}
      >
        <ConeLogo size={26} color={T.orange} />
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9, letterSpacing: "0.38em",
          textTransform: "uppercase", color: T.muted,
        }}>CONEBurgers · Menú</div>
      </motion.div>

      <div style={{ flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9, letterSpacing: "0.38em",
            color: T.orange, textTransform: "uppercase", marginBottom: 6,
          }}
        >El menú</motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 92, lineHeight: 0.86,
            letterSpacing: "-0.02em", marginBottom: 28,
          }}
        >
          EAT<br />
          <span style={{ color: T.orange }}>BOLD.</span><br />
          ORDER<br />
          <span style={{ WebkitTextStroke: `1.5px ${T.orange}`, color: "transparent" }}>SMART.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            fontSize: 14, color: T.muted, lineHeight: 1.7, marginBottom: 32,
          }}
        >
          Inicia sesión para acumular <span style={{ color: T.orange, fontWeight: 600 }}>sellos</span> con cada
          pedido y canjear tu próximo combo gratis. O explora el menú como invitado.
        </motion.div>

        {/* Mini loyalty teaser */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.32 }}
          style={{
            border: `1px solid ${T.border}`, background: T.card,
            padding: "16px 18px", marginBottom: 28,
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, right: 0, width: 0, height: 0,
            borderStyle: "solid", borderWidth: "0 40px 40px 0",
            borderColor: `transparent ${T.orange} transparent transparent`,
          }} />
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            letterSpacing: "0.32em", color: T.muted, marginBottom: 8,
          }}>LOYALTY · 12 SELLOS = COMBO GRATIS</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 4 }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} style={{
                aspectRatio: "1",
                background: i < 8 ? `linear-gradient(135deg, ${T.orangeL}, ${T.orange})` : "transparent",
                border: i < 8 ? "none" : `1px solid ${T.border}`,
              }} />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.42 }}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <button onClick={onLogin} style={btnPrimary}>INICIAR SESIÓN</button>
        <button onClick={onGuest} style={btnSecondary}>ENTRAR COMO INVITADO</button>
        <div style={{
          textAlign: "center", marginTop: 18,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
          letterSpacing: "0.38em", color: T.muted,
        }}>POWERED BY <span style={{ color: T.orange }}>CONEMEDIA</span></div>
      </motion.div>
    </div>
  );
}

const btnPrimary = {
  width: "100%", padding: "18px 22px",
  background: T.orange, color: T.white,
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 22, letterSpacing: "0.06em",
  border: "none", cursor: "pointer",
  transition: "transform .12s, background .15s",
};
const btnSecondary = {
  width: "100%", padding: "15px 22px",
  background: "transparent", color: T.text,
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 18, letterSpacing: "0.06em",
  border: `1.5px solid ${T.border}`, cursor: "pointer",
  transition: "all .2s",
};
