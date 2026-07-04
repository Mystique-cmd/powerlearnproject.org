import { Link, NavLink } from 'react-router-dom'
import Button from './Button'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
    const { theme, toggleTheme } = useTheme()
    return (
        <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
                <Link to="/" className="font-bold text-blue-600">React Tailwind App</Link>
                <div className="flex items-center gap-4">
                    <NavLink to="/" className="hover:underline">Home</NavLink>
                    <NavLink to="/tasks" className="hover:underline">Tasks</NavLink>
                    <NavLink to="/api" className="hover:underline">API</NavLink>
                    <Button variant="secondary" onClick={toggleTheme}>
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </Button>
                </div>
            </div>
        </nav>
    )
}
