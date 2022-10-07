const fileModel = require("../models/file.model");
const path = require("path");
const fs = require("fs");
const ApiError = require('../helpers/api_error.helper')

const getFileController = async (req, res, next) => {
  try {
    //удаляем старый файл перед тем как перезаписать новый
    const filePathFromDB = await fileModel.findOne({
      where: { user_id: req.user.id, id: req.params.id },
    });
    
    if(!filePathFromDB) {
      throw ApiError.BadRequest("Файл не найден");
    }

    if(!req.file) {
      throw ApiError.BadRequest("Выберите файл");
    }

    const pathFromDB = filePathFromDB.path;
    const removeFileFromStorage = fs.unlinkSync(`./${pathFromDB}`);


    const fileExtension = path.extname(req.file.originalname.toLowerCase());
    const getFileDB = await fileModel.update(
      {
        name: req.file.filename,
        file_extension: fileExtension,
        mime_type: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      },
      { where: { user_id: req.user.id, id: req.params.id } }
    );
    return res.json({message: "Файл успешно обновлен"});
  } catch (err) {
    next(err);
  }
};

module.exports = getFileController;
