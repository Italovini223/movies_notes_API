const knex = require("../database/knex");
const appError = require("../utils/appError");
class movieNotesControllers {
  async create(request, response){
    const {title, description, rating, tags} = request.body;
    const {user_id} = request.params;

    const note_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      note_id,
      user_id,
      name
    });

    await knex("tags").insert(tagsInsert);

    return response.status(200).json({
      message: "note create successfully"
    })
  }
}

module.exports = MovieNotesController;