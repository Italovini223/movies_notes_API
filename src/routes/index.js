const {Router} = require('express');

const userRoutes = require("./user.routes");
const notesRouter = require("./movieNotes.routes")

const routes = Router();

routes.use("/users", userRoutes);

module.exports = routes;