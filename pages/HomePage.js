function HomePage({ onAddToCart }) {
    try {
        const [products, setProducts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [categories] = React.useState(['Todos', 'Pizza', 'Hamburguesas', 'Sushi', 'Postres']);
        const [selectedCategory, setSelectedCategory] = React.useState('Todos');

        React.useEffect(() => {
            loadProducts();
        }, []);

        const loadProducts = async () => {
            try {
                setLoading(true);
                // Simulated API call - replace with real API
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockProducts = [
                    { id: 1, name: 'Pizza Margherita', price: 15.99, originalPrice: 18.99, description: 'Pizza clásica con tomate, mozzarella y albahaca fresca', rating: 4.5, reviews: 128, category: 'Pizza', deliveryTime: '25-35' },
                    { id: 2, name: 'Hamburguesa Clásica', price: 12.50, description: 'Carne de res, lechuga, tomate, cebolla y salsa especial', rating: 4.3, reviews: 89, category: 'Hamburguesas', deliveryTime: '20-30' },
                    { id: 3, name: 'Sushi Variado', price: 24.99, description: 'Selección de 12 piezas de sushi fresco del día', rating: 4.8, reviews: 156, category: 'Sushi', deliveryTime: '45-60' },
                    { id: 4, name: 'Tiramisu', price: 8.99, description: 'Postre italiano tradicional con café y mascarpone', rating: 4.6, reviews: 73, category: 'Postres', deliveryTime: '15-25' },
                    { id: 5, name: 'Pizza Pepperoni', price: 17.99, description: 'Pizza con pepperoni, mozzarella y salsa de tomate', rating: 4.4, reviews: 94, category: 'Pizza', deliveryTime: '25-35' },
                    { id: 6, name: 'Hamburguesa BBQ', price: 14.99, originalPrice: 16.99, description: 'Hamburguesa con salsa BBQ, cebolla caramelizada y queso cheddar', rating: 4.7, reviews: 112, category: 'Hamburguesas', deliveryTime: '20-30', discount: 12 }
                ];
                
                setProducts(mockProducts);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        const filteredProducts = selectedCategory === 'Todos' 
            ? products 
            : products.filter(product => product.category === selectedCategory);

        if (loading) {
            return <LoadingSpinner size="lg" text="Cargando deliciosos platillos..." />;
        }

        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-name="home-page" data-file="pages/HomePage.js">
                {/* Hero Section */}
                <div className="gradient-bg rounded-2xl p-8 mb-8 text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">¡Comida deliciosa a domicilio!</h1>
                    <p className="text-xl mb-6">Ordena de tus restaurantes favoritos y recibe en minutos</p>
                    <div className="flex justify-center">
                        <div className="bg-white rounded-lg p-1 flex items-center max-w-md w-full">
                            <input 
                                type="text" 
                                placeholder="¿Qué quieres comer hoy?"
                                className="flex-1 px-4 py-2 text-gray-800 outline-none"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorías</h2>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-gray-700 hover:bg-orange-50'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {selectedCategory === 'Todos' ? 'Todos los platillos' : selectedCategory}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('HomePage component error:', error);
        reportError(error);
    }
}
