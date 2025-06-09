function ProductCard({ product, onAddToCart }) {
    try {
        const [isAdding, setIsAdding] = React.useState(false);

        const handleAddToCart = async () => {
            setIsAdding(true);
            try {
                await onAddToCart(product);
                setTimeout(() => setIsAdding(false), 500);
            } catch (error) {
                setIsAdding(false);
                console.error('Error adding to cart:', error);
            }
        };

        return (
            <div className="bg-white rounded-lg card-shadow food-card overflow-hidden" data-name="product-card" data-file="components/ProductCard.js">
                <div className="relative">
                    <img 
                        src={product.image || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop`}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                    {product.discount && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <span className="text-yellow-400">
                                {'★'.repeat(Math.floor(product.rating || 4.5))}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">({product.reviews || 0})</span>
                        </div>
                        <span className="text-sm text-gray-500">
                            <i className="fas fa-clock mr-1"></i>
                            {product.deliveryTime || '30-45'} min
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {product.originalPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                    ${product.originalPrice}
                                </span>
                            )}
                            <span className="text-xl font-bold text-orange-500">
                                ${product.price}
                            </span>
                        </div>
                        
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAdding}
                            className={`btn-primary ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAdding ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <React.Fragment>
                                    <i className="fas fa-plus mr-1"></i>
                                    Agregar
                                </React.Fragment>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductCard component error:', error);
        reportError(error);
    }
}
