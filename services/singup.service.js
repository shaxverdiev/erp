const bcrypt = require("bcrypt");
const TokenService = require("./token.service/tokens.service");
const UserDTO = require("../dto/userDTO");
const userModel = require("../models/user.model");
const ApiError = require('../helpers/api_error.helper')

const signupService = async (login, password) => {
const candidate = await userModel.findOne({where: {login: login} });
  if (candidate) {
    throw ApiError.BadRequest(
      `Пользователь с таким логином '${login}' уже существует`
    );
  }

  const hashPassword = await bcrypt.hash(password, 2);
  const user = await userModel.create({
    login,
    password: hashPassword,
  });

  // инстанс класса UserDTO извлекает необходимые поля из модели(id, password) для создания payload(для токенов)
  const userDTO = new UserDTO(user);
  const tokens = TokenService.generateTokens({ ...userDTO });
  const saveTokenInDB = await TokenService.saveToken(
    userDTO.id,
    tokens.refreshToken
  );

  return { ...tokens };
};

module.exports = signupService;
