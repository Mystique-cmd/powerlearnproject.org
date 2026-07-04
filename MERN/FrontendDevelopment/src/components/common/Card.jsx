export default function Card({ title, children, className = '' }) {
    return (
        <div className={`rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm ${className}`}>
            {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
            {children}
        </div>
    )
}
