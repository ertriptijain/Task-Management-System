import moment from 'moment';

export const getDateTime = (date) => {
	return date ? moment(date).format('MMM DD,YYYY hh:mm:A') : '-';
};

export const getFileName = (filename) => {
	if (!filename) return null;
	if (!filename.includes('/uploads')) return filename;
	return filename.split('/uploads/')[1];
};

export default {
	getFileName,
	getDateTime,
};
