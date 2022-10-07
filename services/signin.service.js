const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const tokenService = require("../services/token.service/tokens.service");
const UserDTO = require("../dto/userDTO");
const ApiError = require("../helpers/api_error.helper");

const signinService = async (login, password) => {
  const user = await userModel.findOne({ where: { login: login } });
  if (!user) {
    throw ApiError.BadRequest(`Пользователь с логином '${login}' не найден`);
  }
  // проверка на совпадение пришедшего пароля
  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest("Неверный пароль");
  }
  // когда пройдены все проверки, генерируются токены и передаются в куки с ответом
  const userDTO = new UserDTO(user); // из user извлекаются необходимые поля для создания payload
  const tokens = tokenService.generateTokens({ ...userDTO });

  await tokenService.saveToken(userDTO.id, tokens.refreshToken);
  // возвращаем сгенерированные токены и информацию о пользователе
  return { ...tokens, user: userDTO.login };
};

module.exports = signinService;
