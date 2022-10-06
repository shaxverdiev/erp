const newTokenService = require('../services/new_token.service')

const newTokenController = async (req, res, next) => {
    try {
      // достаем рефреш токен из куков request'a
      const { refreshToken } = req.cookies;
      const userData = await newTokenService(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.send("success");
    } catch (e) {
      next(e);
    }
  }
  
  module.exports = newTokenController