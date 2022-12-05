const app = require("express")();
const {checkSchema} = require("express-validator");
const AuthHandler = require("../../../../config/middleWare/auth.middleware");
const roles = require("../../../../config/options/global.options").OPTIONS;
const UserSchema = require("../../../../schema/User");

const user = require("./user");

app.post("/login", checkSchema(UserSchema.login), user.login);
app.get("/profile", AuthHandler.authenticateJWT(), user.getProfile);

module.exports = app;
