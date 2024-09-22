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
import FormElements from './admin/pages/Form/FormElements';
import FormLayout from './admin/pages/Form/FormLayout';
import Tables from './admin/pages/Tables';
import Settings from './admin/pages/Settings';
import Chart from './admin/pages/Chart';
import Alerts from './admin/pages/UiElements/Alerts';
import Buttons from './admin/pages/UiElements/Buttons';

const ProtectedSubscriptionFormPage = withAuth(SubscriptionFormPage);

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
                                    <Route path="/" element={<Home />} />
                                    <Route path="/subscriptions" element={<SubscriptionPage />} />
                                    <Route path="/subscriptions/stripe-checkout" element={<ProtectedSubscriptionFormPage />} />
                                    <Route path="/register" element={<Register />} />
                                    
                                    {/* Additional Routes */}
                                    <Route path="/dashboard" element={<ECommerce />} />
                                    <Route path="/calendar" element={<Calendar />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/forms/form-elements" element={<FormElements />} />
                                    <Route path="/forms/form-layout" element={<FormLayout />} />
                                    <Route path="/tables" element={<Tables />} />
                                    <Route path="/settings" element={<Settings />} />
                                    <Route path="/chart" element={<Chart />} />
                                    <Route path="/ui/alerts" element={<Alerts />} />
                                    <Route path="/ui/buttons" element={<Buttons />} />
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
