import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/auth/register';
import withAuth from './middlewares/withAuth';
import TokenView from './components/TokenView';
import SubscriptionPage from './views/SubscriptionPage';
import SubscriptionFormPage from './views/SubscriptionFormPage';
import Loader from './admin/common/Loader';
import SignIn from './admin/pages/Authentication/SignIn';
import SignUp from './admin/pages/Authentication/SignUp';
import DefaultLayout from './admin/layout/DefaultLayout';
import ECommerce from './admin/pages/Dashboard/ECommerce';
import Calendar from './admin/pages/Calendar';
import Profile from './admin/pages/Profile';
import Tables from './admin/pages/Tables';
import Settings from './admin/pages/Settings';
import Chart from './admin/pages/Chart';

const ProtectedSubscriptionFormPage = withAuth(SubscriptionFormPage);
const ProtectedHome = withAuth(Home);
const ProtectedECommerce = withAuth(ECommerce);
const ProtectedCalendar = withAuth(Calendar);
const ProtectedProfile = withAuth(Profile);
const ProtectedTables = withAuth(Tables);
const ProtectedSettings = withAuth(Settings);
const ProtectedChart = withAuth(Chart);
const ProtectedTokenView = withAuth(TokenView);

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <Routes>
                    {/* Routes without DefaultLayout */}
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />

                    {/* Routes with DefaultLayout wrapped around */}
                    <Route
                        path="*"
                        element={
                            <DefaultLayout>
                                <Routes>
                                    <Route path="/" element={<ProtectedHome />} />
                                    <Route path="/subscriptions" element={<SubscriptionPage />} />
                                    <Route path="/subscriptions/stripe-checkout" element={<ProtectedSubscriptionFormPage />} />
                                    <Route path="/register" element={<Register />} />
                                    
                                    <Route path="/dashboard" element={<ProtectedECommerce />} />
                                    <Route path="/:chainId/:contractAddress" element={<ProtectedTokenView />} />
                                    <Route path="/calendar" element={<ProtectedCalendar />} />
                                    <Route path="/profile" element={<ProtectedProfile />} />
                                    <Route path="/tables" element={<ProtectedTables />} />
                                    <Route path="/settings" element={<ProtectedSettings />} />
                                    <Route path="/chart" element={<ProtectedChart />} />
                                </Routes>
                            </DefaultLayout>
                        }
                    />
                </Routes>
            )}
        </>
    );
};

export default App;
