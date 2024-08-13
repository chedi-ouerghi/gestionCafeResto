import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, user, requiredRole }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return element;
};

export default PrivateRoute;
