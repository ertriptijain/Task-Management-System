const sequelize = require("sequelize");
const {Task, User} = require("../../../../models");
const {OPTIONS, generateResponse} = require("../../../../config/options/global.options");
const MESSAGES = require("../../../../config/options/messages.options");
const resCode = MESSAGES.resCode;
const Op = sequelize.Op;
const {validationResult} = require("express-validator");

exports.listing = async function (req, res) {
    try {
        const {search, status} = req.query;
        const offset = parseInt(req.query.start) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const whereQuery = {};
        if (req.user.role === OPTIONS.usersRoles.EMPLOYEE) {
            whereQuery["UserId"] = req.user.id; 
        }
        if (search && search.length) {
            whereQuery[Op.or] = {
                name: {[Op.iLike]: `%${search}%`},
            };
        }
        if (status && status != "all") {
            whereQuery["status"] = status;
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
        const list = await Task.findAndCountAll(query);
        res.status(resCode.HTTP_OK).json(generateResponse(resCode.HTTP_OK, list));
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

        let data = {
            name: req.body.name.toLowerCase(),
            description: req.body.description.trim(),
            UserId: req.body.UserId,
        };
        let task = await Task.create(data);
        return res.json(generateResponse(resCode.HTTP_OK, MESSAGES.apiSuccessStrings.CREATED("Task")));
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

        let existingTask = await Task.findOne(query);

        if (!existingTask) {
            let errors = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST("task");
            return res
                .status(resCode.HTTP_BAD_REQUEST)
                .json(generateResponse(resCode.HTTP_BAD_REQUEST, errors, MESSAGES.errorTypes.OAUTH_EXCEPTION));
        } else {
            existingTask.name = req.body.name.toLowerCase() || existingTask.name;
            existingTask.description = req.body.description.trim() || existingTask.description;
            existingTask.status = req.body.status;
            existingTask.UserId = req.body.UserId;

            if (req.body.status === OPTIONS.defaultStatus.COMPLETED) {
                existingTask.completedAt = new Date();
            }
            await existingTask.save();

            return res.json(generateResponse(resCode.HTTP_OK, MESSAGES.apiSuccessStrings.UPDATE("task")));
        }
    } catch (e) {
        const errors = MESSAGES.apiErrorStrings.SERVER_ERROR;
        res.status(resCode.HTTP_INTERNAL_SERVER_ERROR).json(
            generateResponse(resCode.HTTP_INTERNAL_SERVER_ERROR, errors)
        );
        throw new Error(e);
    }
};

exports.getTask = async (req, res) => {
    try {
        let query = {
            where: {
                id: req.params.id,
            },
        };
        let existingTask = await Task.findOne(query);
        if (existingTask) {
            return res.json(generateResponse(resCode.HTTP_OK, existingTask));
        } else {
            let errors = MESSAGES.apiErrorStrings.USER_DOES_NOT_EXIST("task");
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

