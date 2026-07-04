import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import ApiDemo from './pages/ApiDemo'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/api" element={<ApiDemo />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    )
}
