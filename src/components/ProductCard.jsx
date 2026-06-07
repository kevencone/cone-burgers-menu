import { motion } from "framer-motion";
import { T } from "../tokens.js";
import { CONFIG } from "../data/config.js";
import ProductImage from "./ProductImage.jsx";

export default function ProductCard({ product, onClick, onAdd, qtyInCart }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        display: "flex", flexDirection: "column",
      }}
    >
      <ProductImage product={product} height={180} />

      {/* Tags row */}
      {product.tags?.length > 0 && (
        <div style={{
          position: "absolute", top: 10, left: 10,
          display: "flex", gap: 4, flexWrap: "wrap",
        }}>
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 8, letterSpacing: "0.16em",
              padding: "4px 6px",
              background: tag === "+1 SELLO" ? T.orange
                       : tag === "PICANTE"   ? "#FF3D00"
                       : T.bg,
              color: tag === "+1 SELLO" || tag === "PICANTE" ? T.white : T.text,
              border: tag === "+1 SELLO" ? "none" : `1px solid ${T.border}`,
              fontWeight: 700,
            }}>{tag}</span>
          ))}
        </div>
      )}

      <div style={{ padding: "14px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 22, lineHeight: 1, letterSpacing: "0.02em",
        }}>{product.name}</div>

        <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.4, minHeight: 32 }}>
          {product.short}
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginTop: 6,
          paddingTop: 10, borderTop: `1px solid ${T.border}`,
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, color: T.muted, letterSpacing: "0.08em",
          }}>{product.calories} KCAL</div>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22, color: T.orange, letterSpacing: "0.02em",
          }}>{CONFIG.currency}{product.price}</div>
        </div>

        <button
          onClick={e => { e.stopPropagation(); onAdd(product); }}
          style={{
            marginTop: 6,
            background: qtyInCart ? T.orange : "transparent",
            color: qtyInCart ? T.white : T.text,
            border: `1.5px solid ${qtyInCart ? T.orange : T.border}`,
            padding: "10px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14, letterSpacing: "0.08em",
            cursor: "pointer", transition: "all .2s",
          }}
        >
          {qtyInCart ? `EN CARRITO · ${qtyInCart}` : "+ AGREGAR"}
        </button>
      </div>
    </motion.div>
  );
}
