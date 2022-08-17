const {Router} = require('express');

const routes = Router();

routes.use("/users", userRoutes);

module.exports = routes;