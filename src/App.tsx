import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './views/Home';
import TokenView from './components/TokenView';
import SubscriptionPage from './views/SubscriptionPage';
import SubscriptionFormPage from './views/SubscriptionFormPage';
import withAuth from './middlewares/withAuth';

const ProtectedSubscriptionFormPage = withAuth(SubscriptionFormPage);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4">
          <nav className="flex justify-between">
            <Link to="/" className="text-lg font-bold">
              Home
            </Link>
            <div className="space-x-4">
              <Link to="/subscriptions" className="hover:underline">
                Subscriptions
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:chainId/:contractAddress" element={<TokenView />} />
            <Route path="/subscriptions" element={<SubscriptionPage />} />
            <Route path="/subscriptions/stripe-checkout" element={<ProtectedSubscriptionFormPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2024
        </footer>
      </div>
    </Router>
  );
};

export default App;
