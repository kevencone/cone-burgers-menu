# CONE Burgers — Menú Interactivo

Demo independiente del menú digital de CONEBurgers, hereda la identidad del sistema de Loyalty.

## Stack
- Vite + React 18
- Framer Motion para animaciones premium
- CSS-in-JS (consistente con el proyecto loyalty)

## Correr local
```bash
cd menu-demo
npm install
npm run dev
```

Se levanta en `http://localhost:5174`.

## Estructura
```
src/
├── tokens.js                  → design system (colores, fuentes)
├── data/
│   ├── menu.js                → catálogo de productos
│   ├── auth.js                → mock DB (compartida con loyalty)
│   └── config.js              → whatsapp, sucursales, moneda
└── components/
    ├── Splash.jsx             → intro con logo
    ├── Welcome.jsx            → bienvenida + CTA
    ├── Login.jsx              → login integrado con loyalty
    ├── Menu.jsx               → orquestador del menú
    ├── CategoryNav.jsx        → tabs categorías
    ├── ProductCard.jsx        → card del producto
    ├── ProductDetail.jsx      → bottom sheet detalle
    ├── ProductImage.jsx       → imagen real / placeholder elegante
    ├── LoyaltyStrip.jsx       → mini-tarjeta loyalty
    ├── CartFab.jsx            → FAB carrito flotante
    ├── CartSheet.jsx          → sheet pedido + WhatsApp
    └── ConeLogo.jsx           → marca SVG
```

## Demo login
```
email:    demo@coneburgers.gt
password: 1234
```

Roberto ya tiene 8/12 sellos. Al pedir un Smash más, gana sellos. Al llegar a 12 puede canjear su combo gratis aplicándolo a una hamburguesa.

## Personalizar
- **Número de WhatsApp**: editar `src/data/config.js` → `whatsapp` (formato internacional sin `+`)
- **Sucursales**: array `branches` en el mismo archivo
- **Productos**: `src/data/menu.js` — todos los campos editables
- **Fotos reales**: cada producto tiene `imageRef` (URL Unsplash como referencia visual). Para subir tus propias fotos: cámbialas por la URL o ruta local. Si la imagen no carga, aparece un placeholder SVG elegante con la identidad CONE.

## Flujo
```
Splash → Welcome → [Login | Invitado] → Menu
                                          ├─ tap card → ProductDetail (sheet)
                                          ├─ + agregar → CartFab
                                          └─ FAB → CartSheet → WhatsApp
```

## Integración con Loyalty
- Sesión compartida vía `localStorage` (`cone_menu_session`)
- Si el usuario está logueado:
  - Mini-tarjeta de sellos sticky con barra de progreso
  - Badge "+1 SELLO" en productos elegibles (smash)
  - Recomendación basada en favorito/historial
  - Carrito muestra sellos a ganar
  - Si tiene 12/12 sellos: checkbox para usar combo gratis (descuenta el smash)
- Mensaje de WhatsApp incluye datos del miembro y sellos a ganar

---

Powered by **CONEMedia**.
