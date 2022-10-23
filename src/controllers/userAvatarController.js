const knex = require("../database/knex");
const appError = require("../utils/appError");
const DiskStorage = require("../providers/diskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName  = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({id: user_id}).first();

    if(!user) {
      throw new appError("Somente usuários autenticados podem mudar a foto de perfil", 401);
    }

    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const fileName = await diskStorage.saveFile(avatarFileName);

    user.avatar = fileName;

    await knex("users").update(user).where({id: user_id});

    return response.json(user);
  }
}

module.exports = UserAvatarController;

