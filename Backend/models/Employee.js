const {OPTIONS} = require("../config/options/global.options");

module.exports = (sequelize, DataTypes) => {
	const Employee = sequelize.define(
		'Employee',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true,
			freezeTableName: true,
		}
	);

	Employee.associate = function (models) {
		Employee.belongsTo(models.User, {
			foreignKey: 'userId',
			as: 'user',
		});
	};
	(async () => {
		if (process.env.ENVIRONMENT !== 'prod') {
			await sequelize.sync();
		}
	})();

	return Employee;
};
