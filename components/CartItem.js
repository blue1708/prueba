function CartItem({ item, onUpdateQuantity, onRemove }) {
    try {
        return (
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg card-shadow" data-name="cart-item" data-file="components/CartItem.js">
                <img 
                    src={item.image || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price} c/u</p>
                </div>

                <div className="flex items-center space-x-3">
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <i className="fas fa-minus text-sm"></i>
                    </button>
                    
                    <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                    
                    <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                    >
                        <i className="fas fa-plus text-sm"></i>
                    </button>
                </div>

                <div className="text-right">
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                        onClick={() => onRemove(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm transition-colors"
                    >
                        <i className="fas fa-trash mr-1"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CartItem component error:', error);
        reportError(error);
    }
}
