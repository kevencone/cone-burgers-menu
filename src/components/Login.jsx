import { useState } from "react";
import { motion } from "framer-motion";
import { T } from "../tokens.js";
import { authenticate } from "../data/auth.js";

export default function Login({ onSuccess, onBack, onGuest }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState("");

  const submit = () => {
    const u = authenticate(email, pass);
    if (u) { setErr(""); onSuccess(u); }
    else   { setErr("Credenciales incorrectas."); }
  };

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      maxWidth: 480, margin: "0 auto",
      padding: "24px 24px 40px",
      display: "flex", flexDirection: "column",
    }}>
      <button onClick={onBack} style={ghostBtn}>← VOLVER</button>

      <div style={{ flex: 1, marginTop: 40 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            letterSpacing: "0.38em", color: T.orange, textTransform: "uppercase",
            marginBottom: 8,
          }}
        >Acceso</motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 56, lineHeight: 0.92, marginBottom: 28,
          }}
        >
          BIENVENIDO<br /><span style={{ color: T.orange }}>DE VUELTA</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            color: T.muted, marginBottom: 22,
            padding: "10px 12px", border: `1px dashed ${T.border}`,
          }}
        >demo → demo@coneburgers.gt / 1234</motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input type="email" placeholder="Email"
                 value={email} onChange={e => setEmail(e.target.value)}
                 style={field} />
          <input type="password" placeholder="Contraseña"
                 value={pass} onChange={e => setPass(e.target.value)}
                 onKeyDown={e => e.key === "Enter" && submit()}
                 style={field} />
          {err && (
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
              color: T.orange, padding: "8px 12px",
              border: `1px solid ${T.orange}44`, background: T.orangeB,
            }}>✕ {err}</div>
          )}
        </motion.div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button onClick={submit} style={primaryBtn}>ENTRAR</button>
        <button onClick={onGuest} style={secondaryBtn}>CONTINUAR COMO INVITADO</button>
      </div>
    </div>
  );
}

const field = {
  width: "100%", background: "transparent",
  border: `1.5px solid ${T.border}`, color: T.text,
  fontFamily: "'Outfit', sans-serif",
  fontSize: 15, padding: "13px 15px", outline: "none",
  transition: "border-color .2s, background .2s",
};
const primaryBtn = {
  width: "100%", padding: "18px 22px",
  background: T.orange, color: T.white,
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 22, letterSpacing: "0.06em",
  border: "none", cursor: "pointer",
};
const secondaryBtn = {
  width: "100%", padding: "15px 22px",
  background: "transparent", color: T.muted,
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: 18, letterSpacing: "0.06em",
  border: `1.5px solid ${T.border}`, cursor: "pointer",
};
const ghostBtn = {
  alignSelf: "flex-start", background: "transparent",
  color: T.muted, fontSize: 13, padding: "8px 0",
  border: "none", cursor: "pointer",
  fontFamily: "'IBM Plex Mono', monospace",
};
