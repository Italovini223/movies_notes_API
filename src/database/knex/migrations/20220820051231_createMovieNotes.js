
exports.up = knex => knex.schema.createTable("movie_notes", table => {

});

exports.down = knex => knex.schema.dropTable("movie_notes");
