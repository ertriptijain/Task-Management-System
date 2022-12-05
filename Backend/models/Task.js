const {OPTIONS} = require("../config/options/global.options");

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define(
        "Task",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: OPTIONS.defaultStatus.PENDING,
            },
            completedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );
    Task.associate = function (models) {
        Task.belongsTo(models.User, {
            foreignKey: "UserId",
            as: "user",
            onDelete: "CASCADE",
        });
    };
    (async () => {
        if (process.env.ENVIRONMENT !== "prod") {
            await sequelize.sync();
        }
    })();

    return Task;
};
