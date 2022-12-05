const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config({ path: '.env' });

const User = require('./models').User;
bcrypt.hash('admin@1234', bcrypt.genSaltSync(8)).then(function (password) {
	User.create({
		userName: 'superadmin',
		email: 'superadmin@gmail.com',
		fullName: 'Super',
		password: password,
		role: 'SUPER_ADMIN',
		isEmailVerified: true,
		isMobileNumberVerified: true,
	}).then((user) => {
		console.log(user.get('email'));
	});
});
