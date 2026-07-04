import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const root = document.documentElement
        theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark')
    }, [theme])
    const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
