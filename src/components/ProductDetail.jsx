import { motion, AnimatePresence } from "framer-motion";
import { T } from "../tokens.js";
import { CONFIG } from "../data/config.js";
import ProductImage from "./ProductImage.jsx";

export default function ProductDetail({ product, onClose, onAdd, qtyInCart }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: T.card,
              borderTop: `2px solid ${T.orange}`,
              width: "100%", maxWidth: 480,
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            {/* handle */}
            <div style={{
              position: "sticky", top: 0, zIndex: 5,
              background: T.card,
              padding: "10px 0 8px",
              display: "flex", justifyContent: "center",
            }}>
              <div style={{ width: 36, height: 3, background: T.border }} />
            </div>

            {/* close btn */}
            <button onClick={onClose} style={{
              position: "absolute", top: 12, right: 12, zIndex: 10,
              width: 36, height: 36,
              background: T.bg, color: T.text,
              border: `1px solid ${T.border}`,
              cursor: "pointer", fontSize: 18,
            }}>×</button>

            <ProductImage product={product} height={280} big />

            <div style={{ padding: "22px 22px 30px" }}>
              {/* tags */}
              {product.tags?.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {product.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 9, letterSpacing: "0.18em",
                      padding: "5px 8px",
                      background: tag === "+1 SELLO" ? T.orange
                               : tag === "PICANTE"   ? "#FF3D00"
                               : T.bg,
                      color: tag === "+1 SELLO" || tag === "PICANTE" ? T.white : T.text,
                      border: tag === "+1 SELLO" || tag === "PICANTE" ? "none" : `1px solid ${T.border}`,
                      fontWeight: 700,
                    }}>{tag}</span>
                  ))}
                </div>
              )}

              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                letterSpacing: "0.38em", color: T.muted,
                textTransform: "uppercase", marginBottom: 4,
              }}>{product.category}</div>

              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 52, lineHeight: 1, letterSpacing: "0.01em",
                marginBottom: 16,
              }}>{product.name}</div>

              <div style={{
                fontSize: 15, color: T.text, lineHeight: 1.65, marginBottom: 22,
              }}>{product.description}</div>

              {/* stats */}
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8,
                marginBottom: 24,
              }}>
                <Stat label="Calorías" value={product.calories} suffix=" kcal" />
                <Stat label="Precio" value={`${CONFIG.currency}${product.price}`} />
              </div>

              <button
                onClick={() => onAdd(product)}
                style={{
                  width: "100%", padding: "18px",
                  background: T.orange, color: T.white,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22, letterSpacing: "0.06em",
                  border: "none", cursor: "pointer",
                  position: "relative", overflow: "hidden",
                }}
              >
                {qtyInCart ? `AGREGAR OTRO · ${qtyInCart} EN CARRITO` : "AGREGAR AL CARRITO"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value, suffix }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      padding: "14px 16px",
    }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
        letterSpacing: "0.32em", color: T.muted, marginBottom: 6,
      }}>{label.toUpperCase()}</div>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 22, fontWeight: 700, color: T.orange,
      }}>{value}{suffix}</div>
    </div>
  );
}
