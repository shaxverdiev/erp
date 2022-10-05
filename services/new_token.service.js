const tokenService = require("../services/token.service/tokens.service");
const userModel = require('../models/user.model')
const UserDTO = require("../dto/userDTO");
const ApiError = require("../helpers/api_error");

  const newTokenService = async (refreshToken) => {
  if (!refreshToken) {
    ApiError.UnAuthorizedError()
  }
  // валидируем пришедший из кук токен
  const userData = tokenService.validateRefreshToken(refreshToken);
  // находим этот токен в базе данных
  const tokenFromDB = await tokenService.findToken(refreshToken);

  if (!userData || !tokenFromDB) {
    ApiError.UnAuthorizedError()
  }
  // затем находим uid юзера чьим токеном является пришедший из кук
  const user = await userModel.findOne({ where: { id: userData.id } });
  //создаем новый инстанс dto для того что бы подставить туда
  const userDTO = new UserDTO(user);
  const tokens = tokenService.generateTokens({ ...userDTO });

  await tokenService.saveToken(userDTO.id, tokens.refreshToken);

  // возвращеем обновленне токены
  return { ...tokens, user: userDTO };
};

module.exports = newTokenService;
