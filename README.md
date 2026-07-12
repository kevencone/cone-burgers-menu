# CONEBurgers — Menú Digital (v2)

Menú digital estático de CONEBurgers. Un solo `index.html` autónomo — sin dependencias, sin build. Producto white-label de **CONE MEDIA**.

## Qué incluye

- **Comanda estilo ticket de cocina** con número de orden y tipo de pedido (Mesa / Recoger / Domicilio) que viaja en el mensaje de WhatsApp
- **Ficha de producto** (bottom sheet) con extras, cantidad y nota para cocina
- **Búsqueda en vivo** + filtros Top / Picante / Veggie
- **Upsell automático** en la comanda (sugiere papas, bebida o postre)
- Animación fly-to-cart, skeleton de carga, marquee de promos
- **Carrito persistente** (localStorage — sobrevive recargas)
- Accesibilidad: teclado, reduced-motion, ARIA

## Correr local

Abre `index.html` en el navegador. Nada más.

## Personalización rápida (dentro de `index.html`)

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | `const WHATSAPP_NUMBER = ""` — vacío en demo; poner `"502XXXXXXXX"` (sin +) |
| Productos, precios, calorías | Array `const MENU = [...]` |
| Extras por categoría | Objeto `const EXTRAS = {...}` |
| Promos del marquee | Variable `items` en la sección MARQUEE |
| Horario "Cocina abierta" | Buscar `11:00 – 22:00` |
| Moneda | `const CUR = "Q"` |

> **Demo:** con `WHATSAPP_NUMBER` vacío, el botón abre WhatsApp con el mensaje listo y el selector de contacto (sin destinatario fijo).

## Deploy

Vercel despliega automáticamente en cada push a `main`. El `vercel.json` fuerza sitio estático (sin framework ni build), así no hay que tocar la configuración del proyecto.

---

Powered by **CONE MEDIA**.
