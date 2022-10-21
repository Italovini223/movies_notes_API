const {Router} = require("express");
const sessionsController = require("../controllers/sessionsController");

const sessionsRoutes = Router();
const SessionController = new sessionsController();

sessionsRoutes.post("/", SessionController.create);

module.exports = sessionsRoutes;