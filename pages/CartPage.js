function CartPage({ cart, onUpdateCart, onNavigate }) {
    try {
        const [loading, setLoading] = React.useState(false);
        const [orderPlaced, setOrderPlaced] = React.useState(false);

        const updateQuantity = (id, newQuantity) => {
            if (newQuantity <= 0) {
                removeItem(id);
                return;
            }
            const updatedCart = cart.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            );
            onUpdateCart(updatedCart);
        };

        const removeItem = (id) => {
            const updatedCart = cart.filter(item => item.id !== id);
            onUpdateCart(updatedCart);
        };

        const calculateTotal = () => {
            return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
        };

        const handleCheckout = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                setOrderPlaced(true);
                onUpdateCart([]);
                setTimeout(() => {
                    onNavigate('home');
                }, 3000);
            } catch (error) {
                console.error('Checkout error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderPlaced) {
            return (
                <div className="min-h-screen flex items-center justify-center" data-name="order-success" data-file="pages/CartPage.js">
                    <div className="text-center">
                        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido realizado!</h2>
                        <p className="text-gray-600">Tu pedido será entregado en 30-45 minutos</p>
                    </div>
                </div>
            );
        }

        if (cart.length === 0) {
            return (
                <div className="min-h-screen flex items-center justify-center" data-name="empty-cart" data-file="pages/CartPage.js">
                    <div className="text-center">
                        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
                        <p className="text-gray-600 mb-6">Agrega algunos productos deliciosos</p>
                        <button onClick={() => onNavigate('home')} className="btn-primary">
                            Ver productos
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto px-4 py-8" data-name="cart-page" data-file="pages/CartPage.js">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrito de compras</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => (
                            <CartItem 
                                key={item.id}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-lg card-shadow h-fit">
                        <h3 className="text-xl font-bold mb-4">Resumen del pedido</h3>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Envío:</span>
                                <span>$2.99</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>${(parseFloat(calculateTotal()) + 2.99).toFixed(2)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50"
                        >
                            {loading ? (
                                <React.Fragment>
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Procesando...
                                </React.Fragment>
                            ) : (
                                'Realizar pedido'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CartPage component error:', error);
        reportError(error);
    }
}
