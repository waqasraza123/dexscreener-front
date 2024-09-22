import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Home from './views/Home';
import Register from './views/auth/register';
import Login from './views/auth/login';
import withAuth from './middlewares/withAuth';
import TokenView from './components/TokenView';
import SubscriptionPage from './views/SubscriptionPage';
import SubscriptionFormPage from './views/SubscriptionFormPage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Loader from './admin/common/Loader';
import PageTitle from './admin/components/PageTitle';
import Calendar from './admin/pages/Calendar';
import Chart from './admin/pages/Chart';
import ECommerce from './admin/pages/Dashboard/ECommerce';
import FormElements from './admin/pages/Form/FormElements';
import FormLayout from './admin/pages/Form/FormLayout';
import Profile from './admin/pages/Profile';
import Settings from './admin/pages/Settings';
import Tables from './admin/pages/Tables';
import Alerts from './admin/pages/UiElements/Alerts';
import Buttons from './admin/pages/UiElements/Buttons';
import DefaultLayout from './admin/layout/DefaultLayout';
import SignIn from './admin/pages/Authentication/SignIn';
import SignUp from './admin/pages/Authentication/SignUp';

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
                    <Route path="/auth/signin" element={<SignIn />} />
                    <Route path="/auth/signup" element={<SignUp />} />

                    {/* Wrap the DefaultLayout around authenticated routes */}
                    <Route element={<DefaultLayout children/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/subscriptions" element={<SubscriptionPage />} />
                        <Route path="/subscriptions/stripe-checkout" element={<ProtectedSubscriptionFormPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />

                        {/* New Routes from External Template */}
                        <Route index element={<ECommerce />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/forms/form-elements" element={<FormElements />} />
                        <Route path="/forms/form-layout" element={<FormLayout />} />
                        <Route path="/tables" element={<Tables />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/chart" element={<Chart />} />
                        <Route path="/ui/alerts" element={<Alerts />} />
                        <Route path="/ui/buttons" element={<Buttons />} />
                    </Route>
                </Routes>
            )}
        </>
    );
};

export default App;


