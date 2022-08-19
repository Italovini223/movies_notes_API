const knex = require("../database/knex");
const {hash} = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const appError = require("../utils/appError");

class userControllers {
 async create(request, response) {
    const {name, email, password} = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    
    if(checkUserExists) {
      throw new appError("User already exists")
    }
    
    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(200).json({
      message: "users registered successfully"
    });

  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const {id} = request.params;
    const database = await sqliteConnection(); 

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new appError("User not found");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(!userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new appError("This email already exists");
    }
    
    
  }
}

module.exports = userControllers;