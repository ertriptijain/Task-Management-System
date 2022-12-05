import Config from '../config/Config';
import { get } from './api.service';

const API_URL = `${Config.BACKEND_SERVICE}`;

const getAnalytics = async () => {
	const res = await get(`${API_URL}/shared/analytics`);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};

export default {
	getAnalytics,
};
