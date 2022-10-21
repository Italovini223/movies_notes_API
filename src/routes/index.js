const {Router} = require('express');

const userRoutes = require("./user.routes");
const notesRouter = require("./movieNotes.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/notes", notesRouter);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;