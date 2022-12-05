import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './authProvider';

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const { isAuthenticated } = useAuth(false);
	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isAuthenticated ? <Component {...props} /> : <Redirect from="/" to="/auth/login" />
			}
		/>
	);
}

export default ProtectedRoute;
