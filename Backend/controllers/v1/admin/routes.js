const express = require("express");
const router = express.Router();
const AuthHandler = require("../../../config/middleWare/auth.middleware");
const roles = require("../../../config/options/global.options").OPTIONS;

const user = require("./User/routes");
const employee = require("./Employee/routes");
const task = require("./Task/routes");

router.use("/user", user);
router.use("/employee", AuthHandler.authenticateJWT(roles.usersRoles.getAllRolesAsArray()), employee);
router.use("/task", AuthHandler.authenticateJWT(roles.usersRoles.getAllRolesAsArray()), task);

module.exports = router;
