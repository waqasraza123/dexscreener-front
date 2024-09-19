import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import { RootState } from '../store';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

    const handleLogout = () => {
        logout(dispatch);
    }

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/subscriptions" className="hover:underline">
                        Subscriptions
                    </Link>
                </div>
                <div className="flex space-x-4">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="hover:underline">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link to="/register" className="hover:underline">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;