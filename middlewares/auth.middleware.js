const ApiError = require("../helpers/api_error.helper");
const tokenService = require("../services/token.service/tokens.service");

// этот миддларе проверяет авторизирован ли пользователь и можно ли ему получать данные
module.exports = function async (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;


    if (!authorizationHeader) {
      return next(ApiError.UnAuthorizedError());
    }
    
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnAuthorizedError());
    }
   
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnAuthorizedError());
    }
   
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnAuthorizedError());
  }
};
