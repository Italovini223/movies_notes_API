const {verify} = require("jsonwebtoken")
const appError = require("../utils/appError");
const AuthConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next){
  const AuthHeader = request.headers.authorization

  if(!AuthHeader){
    throw new appError("JWT token não informado", 401);
  }

  const[,token] = AuthHeader.split(" ");

  try{
    const {sub: user_id} = verify(token, AuthConfig.jwt.secret);

    request.user = {
      id: Number(user_id)
    }

    return next();
  } catch {
    throw new appError("JWT token inválido", 401);
  }
}

module.exports = ensureAuthenticated;