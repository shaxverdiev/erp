const signupService = require('../services/singup.service')

const signupController = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const userData = await signupService(login, password);

    // отправляем на клиент в куках рефреш токен
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.json(userData);
  } catch (err) {
    console.log(err);
  }
};

module.exports = signupController