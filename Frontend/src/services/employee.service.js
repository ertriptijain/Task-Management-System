import Config from '../config/Config';
import { get, post, put } from './api.service';

const API_URL = `${Config.BACKEND_SERVICE}/admin`;

const getEmployee = async (filters) => {
	const res = await get(`${API_URL}/employee/listing`, filters);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};
const postCreate = async (data) => {
	const res = await post(`${API_URL}/employee/create`, data);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};

const putUpdate = async (data, id) => {
	const res = await put(`${API_URL}/employee/update/${id}`, data);
	if (res && res.data && res.data.result) {
		return res.data.result;
	}
	return null;
};

export default {
	getEmployee,
	postCreate,
	putUpdate,
};
