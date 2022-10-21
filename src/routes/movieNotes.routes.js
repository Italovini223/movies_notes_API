const {Router} = require("express");

const movieNotesControllers = require("../controllers/movieNotesControllers");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const notesRouter = Router();
const notesController = new movieNotesControllers();

notesRouter.get("/", ensureAuthenticated, notesController.index);
notesRouter.post("/", ensureAuthenticated, notesController.create);
notesRouter.get("/:id", ensureAuthenticated, notesController.show);
notesRouter.delete("/:id", ensureAuthenticated, notesController.delete);


module.exports = notesRouter;

