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
      return {
        note_id,
        user_id,
        name
      }
    });

    await knex("tags").insert(tagsInsert);

    return response.status(200).json({
      message: "note create successfully"
    })
  }

  async show(request, response){
    const {id} = request.params;

    const note = await knex("movie_notes").where({id}).first()
    const tags = await knex("tags").where({note_id: id}).orderBy("name")

    return response.json({
      ...note,
      tags
    });
  } 

  async index(request, response){
      const {user_id, title, tags} = request.query;

      let notes;

      if(tags){
        const filteredTags = tags.split(',').map(tag => tag.trim())

        notes = await knex("tags")
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.user_id"
        ])
        .where("movie_notes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("movie_notes", "movie_notes.id", "tags.note_id")
        .orderBy("movie_notes.title")
      } else {
        notes = await knex("movie_notes")
        .where({user_id})
        .whereLike("title", `%${title}%`);
      }


      const userTags = await knex("tags").where({user_id})
      const notesWithTags = notes.map(note => {
        const noteTags = userTags.filter(tag => tag.note_id === note.id)

        return {
          ...note,
          noteTags
        }
      });

      return response.json(notesWithTags);
      

     
  }

  async delete(request, response){
    const {id} = request.params;

    await knex("movie_notes").where({id}).delete();

    return response.json({
      message: "note deleted successfully"
    })
  }
}

module.exports = movieNotesControllers;