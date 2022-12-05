import Config from '../config/Config';
import { get, post } from './api.service';
import jwtService from './jwt.service';

const API_URL = Config.BACKEND_SERVICE;
const getProfile = async () => {
	const res = await get(`${API_URL}/admin/user/profile`);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};

const postLogin = async (data) => {
	const res = await post(`${API_URL}/admin/user/login`, data);
	if (res && res.data && res.data.result) {
		jwtService.setToken(res.data.result.token);
		return res.data.result;
	}
	return null;
};

export default {
	getProfile,
	postLogin,
};
