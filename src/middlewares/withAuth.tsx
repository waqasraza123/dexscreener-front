import React, { ComponentType, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//a middleware to protect pages from unauthenticated access
const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const navigate = useNavigate();
        const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/auth/signin');
            }
        }, [isAuthenticated, navigate]);

        if (!isAuthenticated) {
            return null; // Prevent rendering the wrapped component while redirecting
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
