/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';

import jwtService from '../services/jwt.service';
import UserService from '../services/user.service';

const AuthContext = React.createContext({});

export const useAuth = () => {
	const state = useContext(AuthContext);
	if (!state) {
		throw new Error('Error using call in context!');
	}
	return state;
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const [user, setUser] = useState();

	const getProfile = async () => {
		try {
			const userData = await UserService.getProfile();
			setUser(userData);
		} catch (e) {
			setIsAuthenticated(false);
			throw new Error(e);
		}
	};

	const getUser = () => user;
	useEffect(() => {
		const token = jwtService.getToken();
		if (token) {
			setIsAuthenticated(true);
			getProfile().then();
		} else {
			setIsAuthenticated(false);
		}
	}, [isAuthenticated]);

	const providerValue = {
		isAuthenticated,
		setIsAuthenticated,
		user,
		getUser,
		setUser,
	};
	return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
