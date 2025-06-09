function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('home');
        const [user, setUser] = React.useState(null);
        const [cart, setCart] = React.useState([]);

        React.useEffect(() => {
            // Load user from localStorage on app start
            const savedUser = localStorage.getItem('user');
            if (savedUser && authUtils.isAuthenticated()) {
                setUser(JSON.parse(savedUser));
            }

            // Load cart from localStorage
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        }, []);

        React.useEffect(() => {
            // Save cart to localStorage whenever it changes
            localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart]);

        const handleLogin = (token, userData) => {
            authUtils.login(token, userData);
            setUser(userData);
        };

        const handleLogout = () => {
            authUtils.logout();
            setUser(null);
            setCart([]);
            setCurrentPage('home');
        };

        const handleAddToCart = async (product) => {
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                setCart(cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ));
            } else {
                setCart([...cart, { ...product, quantity: 1 }]);
            }
        };

        const getCartCount = () => {
            return cart.reduce((total, item) => total + item.quantity, 0);
        };

        const renderCurrentPage = () => {
            switch (currentPage) {
                case 'home':
                    return <HomePage onAddToCart={handleAddToCart} />;
                case 'login':
                    return <LoginPage onLogin={handleLogin} onNavigate={setCurrentPage} />;
                case 'cart':
                    return <CartPage cart={cart} onUpdateCart={setCart} onNavigate={setCurrentPage} />;
                case 'profile':
                    return <ProfilePage user={user} onNavigate={setCurrentPage} />;
                default:
                    return <HomePage onAddToCart={handleAddToCart} />;
            }
        };

        return (
            <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
                <Header 
                    cartCount={getCartCount()}
                    onNavigate={setCurrentPage}
                    currentPage={currentPage}
                    user={user}
                    onLogout={handleLogout}
                />
                <main>
                    {renderCurrentPage()}
                </main>
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
