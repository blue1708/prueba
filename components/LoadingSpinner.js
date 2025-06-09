function LoadingSpinner({ size = 'md', text = 'Cargando...' }) {
    try {
        const sizeClasses = {
            sm: 'w-4 h-4',
            md: 'w-8 h-8',
            lg: 'w-12 h-12'
        };

        return (
            <div className="flex flex-col items-center justify-center p-8" data-name="loading-spinner" data-file="components/LoadingSpinner.js">
                <div className={`${sizeClasses[size]} border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin`}></div>
                {text && <p className="mt-4 text-gray-600">{text}</p>}
            </div>
        );
    } catch (error) {
        console.error('LoadingSpinner component error:', error);
        reportError(error);
    }
}
