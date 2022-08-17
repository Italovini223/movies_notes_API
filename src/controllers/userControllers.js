const knex = require("../database/knex")
class userControllers {
 async create(request, response) {
    const {name, email, password} = request.body;

    await knex("users").insert({
      name,
      email,
      password
    })

  }
}

module.exports = userControllers;