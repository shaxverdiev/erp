const signinService = require("../services/signin.service");
const ApiError = require("../helpers/api_error.helper");

const signinController = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    if ((login || password) === "") {
      throw ApiError.BadRequest("Введите данные");
    }
    const userData = await signinService(login, password);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.json({ message: "Вы вошли в систему", userData });
  } catch (err) {
    next(err);
  }
};

module.exports = signinController;
