const tokenService = require('../services/token.service/tokens.service')

const logoutService = async (refreshToken) => {
  // токен удаляется а пользователь остается в таблице
  const token = await tokenService.removeToken(refreshToken);
  // возвращаем удаленный токен
  return token;
};

module.exports = logoutService;
