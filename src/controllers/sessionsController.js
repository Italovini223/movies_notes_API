const knex = require('../database/knex');
const appError = require("../utils/appError");
const {compare} = require("bcryptjs")

class sessionsController {

  async create(request, response) {
    const{email, password} = request.body;

    const user = await knex("users").where({email}).first();

    if(!user){
      throw new appError("E-mail ou senha incorretos", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new appError("E-mail ou senha incorretos", 401);
    }

    return response.json({user});
  }
}

module.exports = sessionsController;