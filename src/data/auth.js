// Mock DB compartida con loyalty — mismos credenciales del demo
export const USERS = {
  "demo@coneburgers.gt": {
    id: "u1",
    name: "Roberto",
    password: "1234",
    stamps: 8,
    favorite: "Smash Doble Combo",
    history: [
      { date: "Hoy", item: "Smash Doble Combo", branch: "Zona 10" },
      { date: "Hace 2 días", item: "Crispy Chicken Combo", branch: "Zona 4" },
      { date: "Hace 5 días", item: "Classic Combo", branch: "Zona 10" },
    ],
  },
};

const KEY = "cone_menu_session";

export function loadSession() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveSession(user) {
  try { localStorage.setItem(KEY, JSON.stringify(user)); } catch {}
}

export function clearSession() {
  try { localStorage.removeItem(KEY); } catch {}
}

export function authenticate(email, password) {
  const u = USERS[email.trim().toLowerCase()];
  if (u && u.password === password.trim()) return { ...u, password: undefined };
  return null;
}
