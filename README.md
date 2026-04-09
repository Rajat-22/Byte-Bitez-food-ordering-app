<h1 align="center">🍽️ The Byte Bitez</h1>

<p align="center">
  <strong>Full-stack food ordering app — React 19 · Vite · Node.js · Express</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-4-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 4" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Express" />
  <img src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-Responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

Browse a curated restaurant menu, add items to a live cart, and place orders with delivery details — all inside a beautifully animated, fully responsive UI. Demonstrates **React 19 Context API + `useReducer`**, a custom `useHttp` hook, native `<dialog>` modals, and a lightweight **Express REST API**. A clean reference for full-stack React + Node.js cart/checkout patterns.

> 🌐 **Live Demo:** https://byte-bitez.vercel.app/

---

## ✨ Features

| Feature | Description |
|---|---|
| 🍕 **Menu Browsing** | Dynamic meal grid with images, descriptions & prices |
| 🛒 **Shopping Cart** | Add / increment / decrement items with live count in header |
| 💰 **Real-time Totals** | Cart and checkout totals update instantly |
| 📝 **Checkout Form** | Delivery form — name, email, street, postal code, city |
| ✅ **Order Confirmation** | Success modal on order submission, cart auto-cleared |
| 🎨 **Animated Background** | 34 floating food emoji icons via CSS keyframe animations |
| 📱 **Fully Responsive** | Mobile (≤600px) · Tablet (≤900px) · Desktop |
| 🔒 **CORS Configured** | Configurable allowed origins via `FRONTEND_URL` env var |
| ♿ **Accessible Modals** | Native `<dialog>` element + React portal for screen readers |

---

## 🛠️ Tech Stack

**Frontend:** [React 19](https://react.dev/) · [Vite 4](https://vitejs.dev/) · Context API + `useReducer` · custom `useHttp` hook · native `<dialog>` + `createPortal` · hand-crafted CSS3 · `Intl.NumberFormat` (INR)

**Backend:** [Node.js](https://nodejs.org/) · [Express 4](https://expressjs.com/) · `body-parser` · ES Modules · JSON flat-file storage

---

## 📁 Project Structure

```
byte-bitez-food-ordering-app/
├── index.html / vite.config.js
├── src/
│   ├── App.jsx                 # Root — wires providers & layout
│   ├── index.css               # Global styles, theme, animations
│   ├── components/
│   │   ├── Header.jsx          # Nav with live cart count
│   │   ├── Meals.jsx           # Meal grid (fetched from API)
│   │   ├── MealItem.jsx        # Single meal card
│   │   ├── Cart.jsx            # Cart modal
│   │   ├── CartItem.jsx        # Cart row with +/- controls
│   │   └── Checkout.jsx        # Delivery form & order POST
│   ├── store/
│   │   ├── CartContext.jsx     # Cart state — useReducer (ADD/REMOVE/CLEAR)
│   │   └── UserProgressContext.jsx  # UI flow: '' → 'cart' → 'checkout'
│   ├── hooks/useHttp.js        # Generic GET/POST hook (useCallback + useEffect)
│   └── UI/                     # Button, Error, Input, Modal, FloatingFoodIcons
└── backend/
    ├── app.js                  # Express server — CORS, routes, health check
    └── data/
        ├── available-meals.json
        └── orders.json
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js ≥ 18 · npm ≥ 9

```bash
# 1. Clone & install
git clone https://github.com/your-username/byte-bitez-food-ordering-app.git
cd byte-bitez-food-ordering-app
npm install
cd backend && npm install && cd ..

# 2. Environment variables
echo "VITE_API_BASE_URL=http://localhost:3000" > .env
echo -e "PORT=3000\nFRONTEND_URL=http://localhost:5173" > backend/.env

# 3. Run (two terminals)
cd backend && npm start          # API → http://localhost:3000
npm run dev                      # UI  → http://localhost:5173

# 4. Production build
npm run build && npm run preview
```

> `FRONTEND_URL` accepts comma-separated origins. Leave it empty to allow all origins (`*`).

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/meals` | Returns the full meal catalogue |
| `POST` | `/orders` | Submits an order — body: `{ order: { items, customer } }` |
| `GET` | `/health` | Health check — returns `{ status: 'ok' }` |

**Customer fields:** `name` · `email` · `street` · `postal-code` · `city` (all required).

---

## 🤝 Contributing

Fork → `git checkout -b feature/your-feature` → commit ([Conventional Commits](https://www.conventionalcommits.org/)) → open a PR.

---

## 📄 License

ISC License — see [LICENSE](LICENSE).

---

<p align="center">Made with ❤️ and lots of 🍕 — <strong>The Byte Bitez</strong></p>
