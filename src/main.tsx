
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Verificar se há uma preferência salva no localStorage
const savedTheme = localStorage.getItem('theme');
// Verificar a preferência do sistema
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplicar o tema ao elemento HTML
const root = window.document.documentElement;
root.classList.remove('light', 'dark');
root.classList.add(savedTheme || (prefersDark ? 'dark' : 'light'));

createRoot(document.getElementById("root")!).render(<App />);
