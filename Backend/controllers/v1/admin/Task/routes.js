const app = require("express")();
const {checkSchema} = require("express-validator");
const TaskSchema = require("../../../../schema/task");

const task = require("./task");

app.post("/create", checkSchema(TaskSchema.create), task.create);
app.get("/listing", task.listing);
app.put("/update/:id", checkSchema(TaskSchema.update), task.update);
app.get("/:id", task.getTask);

module.exports = app;
