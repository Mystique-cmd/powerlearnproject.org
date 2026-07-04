import Navbar from '../common/Navbar'
import Footer from '../common/Footer'

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition">
            <Navbar />
            <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
            <Footer />
        </div>
    )
}
