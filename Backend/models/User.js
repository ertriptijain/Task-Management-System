const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const jwtOptions = require("../config/options/jwt.options");
const {OPTIONS, generateURl} = require("../config/options/global.options");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mobileNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mobileCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: OPTIONS.defaultStatus.ACTIVE,
            },
            lastLoginAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
                get() {
                    let path = this.getDataValue("profilePicture");
                    if (path && path.length > 0) {
                        return generateURl(path);
                    } else {
                        return this.getDataValue("profilePicture");
                    }
                },
            },
            passwordResetToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            passwordResetExpires: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            freezeTableName: true,
        }
    );

    User.prototype.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    };
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    User.prototype.genToken = function () {
        const payload = {id: this.id};
        return jwt.sign(payload, jwtOptions.secretOrKey);
    };
    User.associate = function (models) {
        User.hasOne(models.Employee, {
            foreignKey: "userId",
            as: "employee",
            onDelete: "CASCADE",
        });
    };
    (async () => {
        if (process.env.ENVIRONMENT !== "prod") {
            await sequelize.sync();
        }
    })();

    return User;
};
