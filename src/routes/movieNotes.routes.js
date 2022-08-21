const {Router} = require("express");
const movieNotesControllers = require("../controllers/movieNotesControllers");

const notesRouter = Router();
const notesController = new movieNotesControllers();

notesRouter.get("/", notesController.index);
notesRouter.post("/:user_id", notesController.create);
notesRouter.get("/:id", notesController.show);


module.exports = notesRouter;

