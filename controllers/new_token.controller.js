const newTokenService = require("../services/new_token.service");

const newTokenController = async (req, res, next) => {
  try {
    // достаем рефреш токен из куков request'a
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await newTokenService(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ message: "Токен успешно обновлен", userData });
  } catch (err) {
    next(err);
  }
};

module.exports = newTokenController;
