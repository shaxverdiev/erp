const ApiError = require("../helpers/api_error.helper");
const { validationResult } = require("express-validator");
const signupService = require("../services/singup.service");

const signupController = async (req, res, next) => {
  try {
    const { login, password } = req.body; // вместо id я взял login, потому что в бд генерируется id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest("Невалидный логин или пароль", errors.array())
      );
    }

    const userData = await signupService(login, password);

    // отправляем на клиент в куках рефреш токен
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json({ message: "Регистрация прошла успешно", userData });
  } catch (err) {
    next(err);
  }
};

module.exports = signupController;
