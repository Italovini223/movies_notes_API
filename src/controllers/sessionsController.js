const knex = require('../database/knex');
const appError = require("../utils/appError");
const {compare} = require("bcryptjs");
const AuthConfig = require("../configs/auth");
const {sign} = require("jsonwebtoken")

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

    const {secret, expiresIn} = AuthConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });
    

    return response.json({
      user,
      token
    });
  }
}

module.exports = sessionsController;