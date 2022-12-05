const app = require("express")();
const {checkSchema} = require("express-validator");
const EmployeeSchema = require("../../../../schema/Employee");

const employee = require("./employee");

app.post("/create", checkSchema(EmployeeSchema.create), employee.create);
app.get("/listing", employee.listing);
app.put("/update/:id", checkSchema(EmployeeSchema.update), employee.update);
app.get("/:id", employee.getEmployee);

module.exports = app;
