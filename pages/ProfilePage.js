function ProfilePage({ user, onNavigate }) {
    try {
        const [orders, setOrders] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [activeTab, setActiveTab] = React.useState('orders');

        React.useEffect(() => {
            loadUserOrders();
        }, []);

        const loadUserOrders = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const mockOrders = [
                    {
                        id: 1,
                        date: '2024-01-15',
                        status: 'Entregado',
                        total: 28.97,
                        items: ['Pizza Margherita', 'Coca Cola']
                    },
                    {
                        id: 2,
                        date: '2024-01-10',
                        status: 'Entregado',
                        total: 15.50,
                        items: ['Hamburguesa Clásica']
                    }
                ];
                
                setOrders(mockOrders);
            } catch (error) {
                console.error('Error loading orders:', error);
            } finally {
                setLoading(false);
            }
        };

        const getStatusColor = (status) => {
            const colors = {
                'Entregado': 'text-green-600 bg-green-100',
                'En camino': 'text-blue-600 bg-blue-100',
                'Preparando': 'text-yellow-600 bg-yellow-100',
                'Cancelado': 'text-red-600 bg-red-100'
            };
            return colors[status] || 'text-gray-600 bg-gray-100';
        };

        if (!user) {
            return (
                <div className="min-h-screen flex items-center justify-center" data-name="no-user" data-file="pages/ProfilePage.js">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso requerido</h2>
                        <p className="text-gray-600 mb-6">Inicia sesión para ver tu perfil</p>
                        <button onClick={() => onNavigate('login')} className="btn-primary">
                            Iniciar sesión
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="max-w-4xl mx-auto px-4 py-8" data-name="profile-page" data-file="pages/ProfilePage.js">
                <div className="bg-white rounded-lg card-shadow p-6 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg card-shadow">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'orders'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Mis pedidos
                            </button>
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'info'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                Información personal
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de pedidos</h2>
                                {loading ? (
                                    <LoadingSpinner text="Cargando pedidos..." />
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-8">
                                        <i className="fas fa-receipt text-4xl text-gray-300 mb-4"></i>
                                        <p className="text-gray-600">No tienes pedidos aún</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map(order => (
                                            <div key={order.id} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold">Pedido #{order.id}</h3>
                                                        <p className="text-gray-600 text-sm">{order.date}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">{order.items.join(', ')}</p>
                                                <p className="font-bold">${order.total}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'info' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Información personal</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                        <input 
                                            type="text" 
                                            value={user.name} 
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            value={user.email} 
                                            readOnly
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProfilePage component error:', error);
        reportError(error);
    }
}
