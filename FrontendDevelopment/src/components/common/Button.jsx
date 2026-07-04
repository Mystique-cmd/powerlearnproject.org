const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
}

export default function Button({ variant = 'primary', className = '', ...props }) {
    return (
        <button
            className={`px-4 py-2 rounded transition ${variants[variant]} ${className}`}
            {...props}
        />
    )
}
