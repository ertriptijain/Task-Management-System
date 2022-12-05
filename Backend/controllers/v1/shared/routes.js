const app = require("express")();

const roles = require("../../../config/options/global.options").OPTIONS;
const AuthHandler = require("../../../config/middleWare/auth.middleware");

const shared = require("./shared");

app.get("/analytics", AuthHandler.authenticateJWT(roles.usersRoles.getAllRolesAsArray()), shared.getAnalytics);

module.exports = app;
