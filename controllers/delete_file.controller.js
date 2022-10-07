const fileModel = require("../models/file.model");
const fs = require("fs");
const ApiError = require("../helpers/api_error.helper");

const deleteFileController = async (req, res, next) => {
  try {
    const filePathFromDB = await fileModel.findOne({
      where: { user_id: req.user.id, id: req.params.id },
    });

    if(!filePathFromDB) {
      throw ApiError.BadRequest("Файл не найден");
    }

    const pathFromDB = filePathFromDB.path;
    const fileFromStorage = fs.unlinkSync(`./${pathFromDB}`);

  
    const deleteFileDB = await fileModel.destroy({
      where: { user_id: req.user.id, id: req.params.id },
    });
    return res.json({message:"Файл успешно удален"});
  } catch (err) {
    next(err);
  }
};
module.exports = deleteFileController;


