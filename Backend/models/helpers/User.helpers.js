const _ = require("lodash");
const sequelize = require("sequelize");
const moment = require("moment-timezone");
const {OPTIONS} = require("../../config/options/global.options");
const bcrypt = require("bcrypt-nodejs");
const User = require("..").User;
const Op = sequelize.Op;

exports.findUserWithSameData = async (query = {}) => {
    try {
        let userWithUsername = await User.findOne({where: query});
        return !!(userWithUsername && userWithUsername.id);
    } catch (e) {
        customErrorLogger(e);
        throw e;
    }
};

exports.verifyCurrentPassword = async (userId, password) => {
    try {
        let user = await User.findByPk(userId);
        let isMatch = user.validPassword(password);
        return !!isMatch;
    } catch (e) {
        customErrorLogger(e);
        throw e;
    }
};

exports.updateLastLogin = async userId => {
    try {
        let user = await User.findOne({where: userId});
        user.lastLoginAt = new Date();
        let saveUser = await user.save();
        return !!saveUser;
    } catch (e) {
        customErrorLogger(e);
        throw e;
    }
};

exports.modifyOutputData = async existingUser => {
    let userObj = {
        id: existingUser.id,
        role: existingUser.role,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        permissions: existingUser.permissions,
        profilePicture: existingUser.profilePicture,
        mobileNumber: existingUser.mobileNumber,
        mobileCode: existingUser.mobileCode,
        isMobileNumberVerified: existingUser.isMobileNumberVerified,
        isEmailVerified: existingUser.isEmailVerified,
        token: existingUser.genToken(),
        shopId: existingUser.shopId,
        employeeId: existingUser.employeeId,
        supplierId: existingUser.supplierId,
        location: existingUser.location,
        city: existingUser.city,
        countryName: existingUser.countryName,
        countryCode: existingUser.countryCode,
    };
    return userObj;
};
