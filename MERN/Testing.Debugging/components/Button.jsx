// client/src/components/Button.jsx
import clsx from 'clsx';

const variantClasses = {
    primary:
        'btn-primary bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-600 disabled:bg-indigo-400',
    secondary:
        'btn-secondary bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-indigo-600 disabled:bg-gray-200',
    danger:
        'btn-danger bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 disabled:bg-red-400',
};

const sizeClasses = {
    sm: 'btn-sm h-8 px-3 text-sm',
    md: 'btn-md h-10 px-4 text-sm',
    lg: 'btn-lg h-11 px-5 text-base',
};

export default function Button({
                                   children,
                                   variant = 'primary',
                                   size = 'md',
                                   className,
                                   disabled = false,
                                   ...props
                               }) {
    return (
        <button
            type="button"
            disabled={disabled}
            className={clsx(
                'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
                variantClasses[variant],
                sizeClasses[size],
                disabled && 'btn-disabled',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
