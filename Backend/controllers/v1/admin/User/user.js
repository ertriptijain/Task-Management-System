const sequelize = require("sequelize");
const {validationResult} = require("express-validator");
const {User} = require("../../../../models");
const {OPTIONS, generateResponse} = require("../../../../config/options/global.options");
const MESSAGES = require("../../../../config/options/messages.options");

const resCode = MESSAGES.resCode;
const Op = sequelize.Op;

//** login user to app */
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors.array(), MESSAGES.errorTypes.INPUT_VALIDATION));
        }

        let existingUser = await User.findOne({
            where: {
                status: {
                    [Op.in]: [OPTIONS.defaultStatus.ACTIVE, OPTIONS.defaultStatus.INACTIVE],
                },
                [Op.or]: [{email: req.body.email.toLowerCase()}],
            },
        });
        if (existingUser) {
            let isMatch = existingUser.validPassword(req.body.password);
            if (isMatch) {
                if (
                    existingUser.status === OPTIONS.defaultStatus.BLOCKED ||
                    existingUser.status === OPTIONS.defaultStatus.INACTIVE
                ) {
                    let errors = MESSAGES.apiErrorStrings.USER_BLOCKED;
                    return res
                        .status(resCode.HTTP_BAD_REQUEST)
                        .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.ACCOUNT_BLOCKED));
                }
                existingUser.lastLoginAt = new Date();
                await existingUser.save();

                let userObj = {
                    id: existingUser.id,
                    token: existingUser.genToken(),
                    role: existingUser.role,
                    email: existingUser.email,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                };
                return res.status(resCode.HTTP_OK).json(generateResponse(resCode.HTTP_OK, userObj));
            } else {
                let errors = MESSAGES.apiErrorStrings.INVALID_CREDENTIALS;
                return res
                    .status(resCode.HTTP_BAD_REQUEST)
                    .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
            }
        } else {
            let errors = MESSAGES.apiErrorStrings.INVALID_CREDENTIALS;
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
        }
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};
//** get user profile */
exports.getProfile = async (req, res) => {
    try {
        let userId = req.query.id ? req.query.id : req.user.id;
        let query = {
            where: {
                status: [OPTIONS.defaultStatus.ACTIVE, OPTIONS.defaultStatus.INACTIVE],
                role: {
                    [Op.or]: OPTIONS.usersRoles.getAllRolesAsArray(),
                },
                id: userId,
            },
            attributes: {
                exclude: [
                    "password",
                    "passwordResetExpires",
                    "passwordResetToken",
                    "updatedAt",
                    "isEmailVerified",
                    "lastLoginAt",
                ],
            },
        };
        let user = await User.findOne(query);
        if (user) {
            let existingUser = user.toJSON();
            existingUser["token"] = user.genToken();
            return res.json(generateResponse(resCode.HTTP_OK, existingUser));
        } else {
            const error = MESSAGES.apiErrorStrings.INVALID_REQUEST;
            return res
                .status(resCode.HTTP_UNAUTHORIZED)
                .json(generateResponse(resCode.HTTP_UNAUTHORIZED, error, MESSAGES.errorTypes.INPUT_VALIDATION));
        }
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};
