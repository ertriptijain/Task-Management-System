const sequelize = require("sequelize");
const {User, Task} = require("../../../models");

const {OPTIONS, generateResponse} = require("../../../config/options/global.options");
const MESSAGES = require("../../../config/options/messages.options");

const resCode = MESSAGES.resCode;
const Op = sequelize.Op;

exports.getAnalytics = async function (req, res) {
    try {
        const employeeCount = await User.count({
            where: {
                status: {[Op.not]: OPTIONS.defaultStatus.DELETED},
                role: OPTIONS.usersRoles.EMPLOYEE,
            },
        });
        let taskPendingCount = await Task.count({
            where: {
                status: OPTIONS.defaultStatus.PENDING,
            },
        });
        let taskInProcessCount = await Task.count({
            where: {
                status: OPTIONS.defaultStatus.INPROCESS,
            },
        });
        let taskCompletedCount = await Task.count({
            where: {
                status: OPTIONS.defaultStatus.COMPLETED,
            },
        });
        res.status(resCode.HTTP_OK).json(
            generateResponse(resCode.HTTP_OK, {employeeCount, taskPendingCount, taskInProcessCount, taskCompletedCount})
        );
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};
