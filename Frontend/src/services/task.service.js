import Config from '../config/Config';
import { get, post, put } from './api.service';

const API_URL = `${Config.BACKEND_SERVICE}/admin`;

const getTask = async (filters) => {
	const res = await get(`${API_URL}/task/listing`, filters);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};
const postCreate = async (data) => {
	const res = await post(`${API_URL}/task/create`, data);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};

const putUpdate = async (data, id) => {
	const res = await put(`${API_URL}/task/update/${id}`, data);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};

export default {
	getTask,
	postCreate,
	putUpdate,
};
