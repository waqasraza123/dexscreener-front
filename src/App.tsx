import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './views/Home';
import Register from './views/auth/register';
import Login from './views/auth/login';
import withAuth from './middlewares/withAuth';
import TokenView from './components/TokenView';
import SubscriptionPage from './views/SubscriptionPage';
import SubscriptionFormPage from './views/SubscriptionFormPage';
import Navbar from './components/Navbar'; // Import the Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const ProtectedSubscriptionFormPage = withAuth(SubscriptionFormPage);

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Navbar /> {/* Use the Navbar component */}
                    
                    <main className="flex-grow p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/:chainId/:contractAddress" element={<TokenView />} />
                            <Route path="/subscriptions" element={<SubscriptionPage />} />
                            <Route path="/subscriptions/stripe-checkout" element={<ProtectedSubscriptionFormPage />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </main>

                    <footer className="bg-gray-800 text-white p-4 text-center">© 2024</footer>
                </div>
            </Router>
        </Provider>
    );
};

export default App;