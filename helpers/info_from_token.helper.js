const tokenService = require("../services/token.service/tokens.service");

// вытаскивает поля из токена (id, login, password) в соответствии с userDTO
const verifyToken = (req) => {
  const token = req.headers.authorization;
  const accessToken = token.split(" ")[1];
  const validToken = tokenService.validateAccessToken(
    accessToken,
    process.env.JWT_ACCESS_SECRET
  );
  return { validToken };
};

module.exports = verifyToken;
