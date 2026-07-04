export default function Footer() {
    return (
        <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-5xl px-4 py-6 text-sm flex justify-between">
                <p className="text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} React Tailwind App</p>
                <div className="flex gap-4">
                    <a href="https://vercel.com" className="hover:underline">Deploy</a>
                    <a href="https://github.com" className="hover:underline">GitHub</a>
                </div>
            </div>
        </footer>
    )
}
