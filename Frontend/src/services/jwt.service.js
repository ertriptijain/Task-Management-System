const getToken = () => {
	return window.localStorage.getItem('jwtToken');
};
const setToken = (token) => {
	window.localStorage.setItem('jwtToken', token.toString());
};
const clearToken = () => {
	window.localStorage.removeItem('jwtToken');
};

export default {
	getToken,
	setToken,
	clearToken,
};
