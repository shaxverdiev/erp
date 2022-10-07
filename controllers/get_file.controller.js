const fileModel = require("../models/file.model");
const ApiError = require("../helpers/api_error.helper");

const getFileController = async (req, res, next) => {
  try {
    const getFileDB = await fileModel.findOne({
      where: { user_id: req.user.id, id: req.params.id },
    });
    if (!getFileDB) {
      throw ApiError.BadRequest("Файл не найден");
    }
    return res.json(getFileDB);
  } catch (err) {
    next(err);
  }
};

module.exports = getFileController;
