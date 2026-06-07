import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, TOTAL_STAMPS } from "../tokens.js";
import { CATEGORIES, PRODUCTS } from "../data/menu.js";
import ConeLogo from "./ConeLogo.jsx";
import CategoryNav from "./CategoryNav.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductDetail from "./ProductDetail.jsx";
import LoyaltyStrip from "./LoyaltyStrip.jsx";
import CartFab from "./CartFab.jsx";
import CartSheet from "./CartSheet.jsx";

const CART_KEY = "cone_menu_cart";

export default function Menu({ user, onLogout, onLogin }) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [openDetail, setOpenDetail] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "{}"); }
    catch { return {}; }
  });
  const [pulseFab, setPulseFab] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }, [cart]);

  const filtered = useMemo(
    () => PRODUCTS.filter(p => p.category === activeCat),
    [activeCat]
  );

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, i) => a + i.qty, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () => Object.values(cart).reduce((a, i) => a + i.price * i.qty, 0),
    [cart]
  );

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev[product.id];
      return {
        ...prev,
        [product.id]: exists
          ? { ...exists, qty: exists.qty + 1 }
          : { id: product.id, name: product.name, price: product.price, calories: product.calories, category: product.category, qty: 1 },
      };
    });
    setPulseFab(true);
    setTimeout(() => setPulseFab(false), 400);
  };

  const recommendation = user?.favorite
    ? PRODUCTS.find(p => p.name.includes(user.favorite.split(" ")[0]) || p.name === user.favorite)
    : null;

  return (
    <div style={{
      minHeight: "100vh", background: T.bg,
      maxWidth: 480, margin: "0 auto",
      paddingBottom: cartCount > 0 ? 120 : 24,
      position: "relative",
    }}>
      {/* TOP BAR */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 20px 14px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ConeLogo size={22} color={T.orange} />
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22, letterSpacing: "0.04em",
          }}>CONE<span style={{ color: T.orange }}>BURGERS</span></div>
        </div>
        <button onClick={user ? onLogout : onLogin} style={{
          background: "transparent",
          color: user ? T.muted : T.orange,
          border: `1px solid ${user ? T.border : T.orange}44`,
          padding: "7px 12px",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10, letterSpacing: "0.18em",
          cursor: "pointer",
        }}>{user ? "SALIR" : "ENTRAR"}</button>
      </div>

      {/* HERO */}
      <div style={{ padding: "8px 20px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: -20, right: -40,
          width: 220, height: 220,
          background: `radial-gradient(circle, ${T.orange}18, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            letterSpacing: "0.38em", color: T.orange,
            textTransform: "uppercase", marginBottom: 6,
          }}
        >Menú · Guatemala</motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 64, lineHeight: 0.88,
            letterSpacing: "-0.01em",
          }}
        >LO MEJOR<br /><span style={{ color: T.orange }}>DE LA PLANCHA.</span></motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ fontSize: 14, color: T.muted, marginTop: 12, lineHeight: 1.6 }}
        >Smashed burgers, café de especialidad y sides hechos al momento.</motion.div>
      </div>

      {/* LOYALTY STRIP */}
      {user && (
        <div style={{ padding: "0 20px 14px" }}>
          <LoyaltyStrip user={user} onClick={() => alert("→ Aquí abre tu app de Loyalty 🍔")} />
        </div>
      )}

      {/* GUEST CTA */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{
            margin: "0 20px 14px",
            padding: "12px 14px",
            border: `1px dashed ${T.border}`,
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          <div style={{
            width: 30, height: 30, background: T.orange, color: T.white,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 12,
          }}>★</div>
          <div style={{ flex: 1, fontSize: 12, color: T.text }}>
            <span style={{ color: T.muted }}>Inicia sesión y</span> gana <span style={{ color: T.orange, fontWeight: 700 }}>+1 sello</span> con cada combo
          </div>
          <button onClick={onLogin} style={{
            background: "transparent", color: T.orange,
            border: `1px solid ${T.orange}66`,
            padding: "6px 10px", cursor: "pointer",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.16em",
          }}>ENTRAR →</button>
        </motion.div>
      )}

      {/* RECOMMENDATION */}
      {recommendation && user && (
        <motion.button
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => { setActiveCat(recommendation.category); setOpenDetail(recommendation); }}
          style={{
            margin: "0 20px 16px", width: "calc(100% - 40px)",
            background: T.card, border: `1px solid ${T.border}`,
            padding: "12px 14px", textAlign: "left",
            display: "flex", alignItems: "center", gap: 12,
            cursor: "pointer", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, width: 3, height: "100%",
            background: T.orange,
          }} />
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
            letterSpacing: "0.32em", color: T.orange,
          }}>★ FAV</div>
          <div style={{ flex: 1, fontSize: 13 }}>
            Tu favorito: <span style={{ fontWeight: 700 }}>{recommendation.name}</span>
          </div>
          <div style={{ color: T.muted, fontSize: 16 }}>→</div>
        </motion.button>
      )}

      {/* CATEGORY NAV */}
      <CategoryNav active={activeCat} onChange={setActiveCat} />

      {/* GRID */}
      <div style={{ padding: "20px 20px 0" }}>
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                qtyInCart={cart[p.id]?.qty || 0}
                onClick={() => setOpenDetail(p)}
                onAdd={addToCart}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* footer */}
      <div style={{
        textAlign: "center", padding: "32px 20px 20px",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
        letterSpacing: "0.38em", color: T.muted,
      }}>POWERED BY <span style={{ color: T.orange }}>CONEMEDIA</span></div>

      {/* DETAIL SHEET */}
      <ProductDetail
        product={openDetail}
        qtyInCart={openDetail ? cart[openDetail.id]?.qty || 0 : 0}
        onAdd={p => { addToCart(p); }}
        onClose={() => setOpenDetail(null)}
      />

      {/* CART SHEET */}
      <CartSheet
        open={openCart}
        onClose={() => setOpenCart(false)}
        cart={cart}
        setCart={setCart}
        user={user}
      />

      {/* CART FAB */}
      <motion.div
        animate={pulseFab ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <CartFab count={cartCount} total={cartTotal} onClick={() => setOpenCart(true)} />
      </motion.div>
    </div>
  );
}
