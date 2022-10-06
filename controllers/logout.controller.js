// const logoutService = require("../services/logout.service");
const newTokenService = require('../services/new_token.service')

const logoutController = async (req, res, next) => {
  try {
    //достаем рефреш токен из куки
    const { refreshToken } = req.cookies;
    const userData = await newTokenService(refreshToken);

    //после этого очищаем куки от "refreshTokena"
    res.clearCookie("refreshToken");
    return res.json({new_refresh_token: userData.refreshToken});
  } catch (e) {
    next(e);
  }
};

module.exports = logoutController;
