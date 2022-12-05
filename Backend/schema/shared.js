exports.generateUrlSchema = {
	filename: {
		in: ['query'],
		notEmpty: true,
		errorMessage: 'File name cannot be empty',
	},
};
