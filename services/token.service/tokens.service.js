const jwt = require("jsonwebtoken");
const tokenModel = require("../../models/token.model");

class TokenService {
  generateTokens(payload) {
    try {
      //payload получили из userDto
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "10m",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async saveToken(userId, refreshToken) {
    try {
      //код ниже перезаписывает рефреш токен, если пришел запрос на обновление токена
      const tokenData = await tokenModel.findOne({
        where: { user_id: userId },
      });
      if (tokenData) {
        //код ниже перезаписывает рефреш токен если таковой имеется
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      }
      //создаем поля в таблице tokens
      const token = await tokenModel.create({ user_id: userId, refreshToken });
      return token;
    } catch (err) {
      console.log(err);
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async findToken(refreshTok) {
    try {
      const tokenData = await tokenModel.findOne({
        where: { refreshToken: refreshTok },
      });
      return tokenData;
    } catch (err) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    try {
      const tokenData = await tokenModel.destroy({
        where: { refreshToken: refreshToken },
      });
      return tokenData;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new TokenService();
