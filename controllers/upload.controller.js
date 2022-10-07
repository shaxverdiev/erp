const fileModel = require("../models/file.model");
const path = require("path");
const ApiError = require('../helpers/api_error.helper')

const uploadController = async (req, res, next) => {
  try {
    if(!req.file) {
      throw ApiError.BadRequest('Выберите файл')
    }
    const fileExtension = path.extname(req.file.originalname.toLowerCase());
    const createInDB = await fileModel.create({
      name: req.file.filename,
      file_extension: fileExtension,
      mime_type: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      user_id: req.user.id,
    });
    return res.json({message: "Файл успешно загружен"});
  } catch (err) {
    next(err);
  }
};

module.exports = uploadController;
