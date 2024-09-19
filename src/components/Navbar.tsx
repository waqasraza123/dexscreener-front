import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between">
                <Link to="/" className="text-lg font-bold">Home</Link>
                <div className="space-x-4">
                    <Link to="/subscriptions" className="hover:underline">Subscriptions</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
