const fileModel = require("../models/file.model");
const path = require('path')
const fs = require('fs')

//TODO тут сначала нужно получить файл из запроса потом заменить както на имеющийся
const getFileController = async (req, res, next) => {


  //удаляем старый файл перед тем как перезаписать новый
  const getFilePathFromDB = await fileModel.findOne({where: {user_id: req.user.id, id: req.params.id}})
  console.log(getFilePathFromDB.path)
  const pathFromDB = getFilePathFromDB.path
  const removeFileFromStorage = fs.unlinkSync(`./${pathFromDB}`)

  
  const fileExtension = path.extname((req.file.originalname).toLowerCase());
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
  return res.send('success');
};

module.exports = getFileController;
