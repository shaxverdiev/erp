const fileModel = require("../models/file.model");
const fs = require("fs");
const ApiError = require("../helpers/api_error.helper");

const downloadFileController = async (req, res, next) => {
  try {
    const fileFromDB = await fileModel.findOne({
      where: { id: req.params.id },
    });

    if (!fileFromDB) {
      throw ApiError.BadRequest("Файл не найден");
    }
    const path = fileFromDB.path;

    if (fs.existsSync(`./${path}`)) {
      return res.download(path, fileFromDB.name);
    }
    return res.json({ message: "Скачивание прошло успешно" });
  } catch (err) {
    next(err);
  }
};

module.exports = downloadFileController;
