import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, TOTAL_STAMPS } from "../tokens.js";
import { CONFIG } from "../data/config.js";

export default function CartSheet({ open, onClose, cart, setCart, user }) {
  const [branchId, setBranchId] = useState(CONFIG.branches[0].id);
  const [useFreeCombo, setUseFreeCombo] = useState(false);

  const items = useMemo(() => Object.values(cart), [cart]);
  const itemsCount = items.reduce((a, i) => a + i.qty, 0);

  // primer item de tipo smash (elegible para combo gratis)
  const freeComboItem = items.find(i => i.category === "smash");
  const isComplete = user && user.stamps >= TOTAL_STAMPS;
  const canRedeem = isComplete && !!freeComboItem;

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const discount = canRedeem && useFreeCombo ? freeComboItem.price : 0;
  const total = Math.max(0, subtotal - discount);
  const stampsToEarn = items.filter(i => i.category === "smash").reduce((a, i) => a + i.qty, 0);

  const updateQty = (id, delta) => {
    setCart(prev => {
      const next = { ...prev };
      if (!next[id]) return next;
      const newQty = next[id].qty + delta;
      if (newQty <= 0) delete next[id];
      else next[id] = { ...next[id], qty: newQty };
      return next;
    });
  };

  const sendWhatsApp = () => {
    const branch = CONFIG.branches.find(b => b.id === branchId);
    const lines = [];
    lines.push("🍔 *PEDIDO CONEBURGERS*");
    lines.push("───────────────────────");
    if (user) {
      lines.push(`Cliente: *${user.name}*`);
      lines.push(`Miembro · ${user.stamps}/${TOTAL_STAMPS} sellos`);
    } else {
      lines.push("Cliente: Invitado");
    }
    lines.push(`Sucursal: *${branch.name}*`);
    lines.push("");
    items.forEach(i => {
      lines.push(`• ${i.name} ×${i.qty} — ${CONFIG.currency}${(i.price * i.qty).toFixed(2)}`);
    });
    lines.push("───────────────────────");
    lines.push(`Subtotal: ${CONFIG.currency}${subtotal.toFixed(2)}`);
    if (discount > 0) lines.push(`🎁 Combo gratis: -${CONFIG.currency}${discount.toFixed(2)}`);
    lines.push(`*TOTAL: ${CONFIG.currency}${total.toFixed(2)}*`);
    lines.push("");
    if (user && stampsToEarn > 0 && !useFreeCombo) {
      lines.push(`🎯 +${stampsToEarn} sello${stampsToEarn > 1 ? "s" : ""} al confirmar`);
    }
    lines.push("");
    lines.push("Enviado desde el menú digital CONE.");

    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 110,
            background: "rgba(0,0,0,0.9)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              background: T.bg,
              borderTop: `2px solid ${T.orange}`,
              width: "100%", maxWidth: 480,
              maxHeight: "92vh",
              overflowY: "auto",
              display: "flex", flexDirection: "column",
            }}
          >
            {/* header */}
            <div style={{
              position: "sticky", top: 0, zIndex: 5,
              background: T.bg, padding: "16px 20px 14px",
              borderBottom: `1px solid ${T.border}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                  letterSpacing: "0.38em", color: T.orange,
                }}>TU PEDIDO</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 30, lineHeight: 1, letterSpacing: "0.02em",
                  marginTop: 2,
                }}>{itemsCount} ÍTEM{itemsCount !== 1 ? "S" : ""}</div>
              </div>
              <button onClick={onClose} style={{
                width: 38, height: 38,
                background: T.card, color: T.text,
                border: `1px solid ${T.border}`,
                cursor: "pointer", fontSize: 20,
              }}>×</button>
            </div>

            <div style={{ flex: 1, padding: "16px 20px 20px" }}>
              {items.length === 0 && (
                <div style={{
                  textAlign: "center", padding: "60px 0",
                  color: T.muted, fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                }}>CARRITO VACÍO</div>
              )}

              {/* items */}
              <AnimatePresence initial={false}>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      display: "flex", gap: 12, alignItems: "center",
                      padding: "14px 0",
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                      <div style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10,
                        color: T.muted, letterSpacing: "0.06em",
                      }}>{CONFIG.currency}{item.price} c/u · {item.calories} kcal</div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 8,
                      border: `1px solid ${T.border}`,
                    }}>
                      <button onClick={() => updateQty(item.id, -1)} style={qtyBtn}>−</button>
                      <div style={{
                        minWidth: 24, textAlign: "center",
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 700, fontSize: 14, color: T.orange,
                      }}>{item.qty}</div>
                      <button onClick={() => updateQty(item.id, 1)} style={qtyBtn}>+</button>
                    </div>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 20, color: T.orange,
                      minWidth: 56, textAlign: "right",
                    }}>{CONFIG.currency}{(item.price * item.qty).toFixed(0)}</div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {items.length > 0 && (
                <>
                  {/* combo gratis */}
                  {canRedeem && (
                    <motion.label
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "14px 16px", marginTop: 16,
                        border: `1px solid ${T.orange}`,
                        background: T.orangeB,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={useFreeCombo}
                        onChange={e => setUseFreeCombo(e.target.checked)}
                        style={{ width: 20, height: 20, accentColor: T.orange, cursor: "pointer" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 18, color: T.orange, letterSpacing: "0.04em",
                        }}>🎁 USAR MI COMBO GRATIS</div>
                        <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                          Aplicar a "{freeComboItem.name}" (−{CONFIG.currency}{freeComboItem.price})
                        </div>
                      </div>
                    </motion.label>
                  )}

                  {/* loyalty hint */}
                  {user && stampsToEarn > 0 && !useFreeCombo && (
                    <div style={{
                      marginTop: 16, padding: "12px 14px",
                      background: T.card, border: `1px dashed ${T.border}`,
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      <div style={{
                        width: 28, height: 28,
                        background: T.orange, color: T.white,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700,
                      }}>+{stampsToEarn}</div>
                      <div style={{ flex: 1, fontSize: 12, color: T.text }}>
                        Ganarás <span style={{ color: T.orange, fontWeight: 700 }}>{stampsToEarn} sello{stampsToEarn > 1 ? "s" : ""}</span> al confirmar este pedido
                      </div>
                    </div>
                  )}

                  {/* branch selector */}
                  <div style={{ marginTop: 18 }}>
                    <div style={{
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                      letterSpacing: "0.38em", color: T.muted,
                      textTransform: "uppercase", marginBottom: 8,
                    }}>Sucursal</div>
                    <div style={{ display: "grid", gridTemplateColumns: `repeat(${CONFIG.branches.length}, 1fr)`, gap: 6 }}>
                      {CONFIG.branches.map(b => (
                        <button
                          key={b.id}
                          onClick={() => setBranchId(b.id)}
                          style={{
                            padding: "12px 10px",
                            background: branchId === b.id ? T.orangeB : T.card,
                            color: branchId === b.id ? T.orange : T.text,
                            border: `1.5px solid ${branchId === b.id ? T.orange : T.border}`,
                            cursor: "pointer", textAlign: "left",
                          }}
                        >
                          <div style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 17, letterSpacing: "0.04em",
                          }}>{b.name}</div>
                          <div style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: 9, color: T.muted, marginTop: 2,
                          }}>{b.address}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* totals */}
                  <div style={{
                    marginTop: 22, padding: "16px 0",
                    borderTop: `1px solid ${T.border}`,
                  }}>
                    <Row label="Subtotal" value={`${CONFIG.currency}${subtotal.toFixed(2)}`} />
                    {discount > 0 && (
                      <Row label="🎁 Combo gratis" value={`−${CONFIG.currency}${discount.toFixed(2)}`} accent />
                    )}
                    <div style={{
                      marginTop: 10, paddingTop: 10,
                      borderTop: `1px solid ${T.border}`,
                      display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                    }}>
                      <div style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                        letterSpacing: "0.32em", color: T.muted,
                      }}>TOTAL</div>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 40, lineHeight: 1, color: T.orange,
                      }}>{CONFIG.currency}{total.toFixed(2)}</div>
                    </div>
                  </div>

                  <button onClick={sendWhatsApp} style={{
                    width: "100%", marginTop: 18,
                    padding: "18px",
                    background: T.orange, color: T.white,
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 22, letterSpacing: "0.06em",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    boxShadow: `0 8px 24px ${T.orange}55`,
                  }}>
                    <WhatsAppIcon />
                    PEDIR POR WHATSAPP
                  </button>

                  <div style={{
                    textAlign: "center", marginTop: 10,
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
                    letterSpacing: "0.32em", color: T.muted,
                  }}>SE ABRIRÁ WHATSAPP CON TU PEDIDO LISTO</div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value, accent }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", padding: "6px 0",
      fontSize: 14,
    }}>
      <span style={{ color: T.muted }}>{label}</span>
      <span style={{
        fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700,
        color: accent ? T.orange : T.text,
      }}>{value}</span>
    </div>
  );
}

const qtyBtn = {
  width: 34, height: 34,
  background: "transparent", color: T.text,
  border: "none", cursor: "pointer",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 18, fontWeight: 700,
};

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-1.6-.8-2.7-1.4-3.8-3.3-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.8-.7 2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.7-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.3-3-1.3-4.5 0-4.6 3.7-8.3 8.4-8.3 4.6 0 8.3 3.7 8.3 8.3 0 4.6-3.7 8.4-8.3 8.4z"/>
    </svg>
  );
}
