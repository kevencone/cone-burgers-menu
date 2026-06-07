import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { T } from "./tokens.js";
import { loadSession, saveSession, clearSession } from "./data/auth.js";
import Splash from "./components/Splash.jsx";
import Welcome from "./components/Welcome.jsx";
import Login from "./components/Login.jsx";
import Menu from "./components/Menu.jsx";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html, body, #root { height: 100%; background: ${T.bg}; color: ${T.text}; font-family: 'Outfit', sans-serif; -webkit-font-smoothing: antialiased; }
body { overflow-x: hidden; }
input, button, textarea, select { font-family: inherit; }
button { cursor: pointer; }

input:focus { border-color: ${T.orange} !important; background: ${T.orangeB} !important; }

button[style*="background: ${T.orange}"]:hover { filter: brightness(1.08); }
button[style*="background: transparent"]:hover { border-color: ${T.borderHi}; }

::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: ${T.surface}; }
::-webkit-scrollbar-thumb { background: ${T.dim}; }

/* hide scrollbar on category nav */
div[style*="overflow-x: auto"]::-webkit-scrollbar { display: none; }
`;

export default function App() {
  const [screen, setScreen] = useState("splash"); // splash | welcome | login | menu
  const [user, setUser] = useState(null);

  // restore session
  useEffect(() => {
    const u = loadSession();
    if (u) setUser(u);
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    saveSession(u);
    setScreen("menu");
  };
  const handleLogout = () => {
    setUser(null);
    clearSession();
    setScreen("welcome");
  };
  const handleGuest = () => setScreen("menu");

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Splash onDone={() => setScreen(user ? "menu" : "welcome")} />
          </motion.div>
        )}

        {screen === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Welcome
              onLogin={() => setScreen("login")}
              onGuest={handleGuest}
            />
          </motion.div>
        )}

        {screen === "login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Login
              onSuccess={handleLogin}
              onBack={() => setScreen("welcome")}
              onGuest={handleGuest}
            />
          </motion.div>
        )}

        {screen === "menu" && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Menu
              user={user}
              onLogout={handleLogout}
              onLogin={() => setScreen("login")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
