const sequelize = require("sequelize");
const {User, Employee} = require("../../../../models");
const {OPTIONS, generateResponse} = require("../../../../config/options/global.options");
const MESSAGES = require("../../../../config/options/messages.options");
const resCode = MESSAGES.resCode;
const Op = sequelize.Op;
const db = require("../../../../models");
const {findUserWithSameData} = require("../../../../models/helpers/User.helpers");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");

exports.listing = async function (req, res) {
    try {
        const {search} = req.query;
        const offset = parseInt(req.query.start) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const whereQuery = {
            "$user.status$": OPTIONS.defaultStatus.ACTIVE,
        };
        if (search && search.length) {
            whereQuery[Op.or] = {
                "$user.fullName$": {[Op.iLike]: `%${search}%`},
            };
        }
        const query = {
            where: whereQuery,
            include: [
                {
                    model: User,
                    as: "user",
                },
            ],
            order: [["createdAt", "DESC"]],
            offset,
            limit,
        };
        const employeeList = await Employee.findAndCountAll(query);
        res.status(resCode.HTTP_OK).json(generateResponse(resCode.HTTP_OK, employeeList));
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};

exports.create = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors.array(), MESSAGES.errorTypes.INPUT_VALIDATION));
        }
        'INSERT INTO USER (id,fullName, email,password) VALUES(?,?,?,?)';
        let query = {
            where: {
                status: [OPTIONS.defaultStatus.ACTIVE, OPTIONS.defaultStatus.INACTIVE],
                [Op.or]: [
                    {email: req.body.email.toLowerCase()},
                    {
                        [Op.and]: {
                            mobileNumber: req.body.mobileNumber,
                            mobileCode: "91",
                        },
                    },
                ],
            },
        };
        let existingUser = await User.findOne(query);

        if (existingUser) {
            let errors = MESSAGES.apiErrorStrings.USER_EXISTS("employee");
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
        } else {
            let password = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(8));

            let data = {
                email: req.body.email.toLowerCase(),
                role: OPTIONS.usersRoles.EMPLOYEE,
                mobileCode: "91",
                mobileNumber: req.body.mobileNumber,
                fullName: req.body.fullName,
                isEmailVerified: true,
                password: password,
            };
            let user = await User.create(data);

            let payload = {
                userId: user.id,
            };
            await Employee.create(payload);

            return res.json(generateResponse(resCode.HTTP_OK, MESSAGES.apiSuccessStrings.CREATED("Employee")));
        }
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};

exports.update = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors.array(), MESSAGES.errorTypes.INPUT_VALIDATION));
        }
        let query = {
            where: {
                id: req.params.id,
            },
        };

        let existingEmployee = await Employee.findOne(query);

        if (!existingEmployee) {
            let errors = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST("employee");
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
        } else {
            let existingUser = await User.findOne({
                where: {id: existingEmployee.userId},
            });
            if (!existingUser) {
                let errors = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST("users");
                return res
                    .status(resCode.HTTP_BAD_REQUEST)
                    .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
            }

            existingUser.fullName = req.body.fullName;

            if (req.body.email && req.body.email.toLowerCase() !== existingUser.email.toLowerCase()) {
                existingUser.email = req.body.email.toLowerCase();
            }

            if (req.body.mobileNumber !== existingUser.mobileNumber) {
                let hasSame = await findUserWithSameData({
                    mobileNumber: req.body.mobileNumber,
                    status: [OPTIONS.defaultStatus.ACTIVE, OPTIONS.defaultStatus.INACTIVE],
                });
                if (hasSame) {
                    const errors = OPTIONS.apiErrorStrings.MOBILE_NUMBER_ALREADY_IN_USE;
                    return res
                        .status(resCode.HTTP_BAD_REQUEST)
                        .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
                }
                existingUser.mobileNumber = req.body.mobileNumber;
            }

            await existingUser.save();
            await existingEmployee.save();

            return res.json(generateResponse(resCode.HTTP_OK, MESSAGES.apiSuccessStrings.UPDATE("Employee")));
        }
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};

exports.getEmployee = async (req, res) => {
    try {
        let query = {
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: {exclude: excludeList},
                },
            ],
        };
        let employee = await Employee.findOne(query);
        if (employee) {
            return res.json(generateResponse(resCode.HTTP_OK, employee));
        } else {
            let errors = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST("employee");
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