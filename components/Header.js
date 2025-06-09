function Header({ cartCount, onNavigate, currentPage, user, onLogout }) {
    try {
        return (
            <header className="bg-white shadow-md sticky top-0 z-50" data-name="header" data-file="components/Header.js">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <button 
                                onClick={() => onNavigate('home')}
                                className="text-2xl font-bold text-orange-500"
                            >
                                <i className="fas fa-utensils mr-2"></i>
                                FoodExpress
                            </button>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <button 
                                onClick={() => onNavigate('home')}
                                className={`${currentPage === 'home' ? 'text-orange-500' : 'text-gray-700'} hover:text-orange-500 transition-colors`}
                            >
                                Inicio
                            </button>
                            <button className="text-gray-700 hover:text-orange-500 transition-colors">
                                Restaurantes
                            </button>
                            <button className="text-gray-700 hover:text-orange-500 transition-colors">
                                Ofertas
                            </button>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => onNavigate('cart')}
                                className="relative text-gray-700 hover:text-orange-500 transition-colors"
                            >
                                <i className="fas fa-shopping-cart text-xl"></i>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {user ? (
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onClick={() => onNavigate('profile')}
                                        className="text-gray-700 hover:text-orange-500 transition-colors"
                                    >
                                        <i className="fas fa-user mr-1"></i>
                                        {user.name}
                                    </button>
                                    <button 
                                        onClick={onLogout}
                                        className="text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => onNavigate('login')}
                                    className="btn-primary"
                                >
                                    <i className="fas fa-sign-in-alt mr-1"></i>
                                    Ingresar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
