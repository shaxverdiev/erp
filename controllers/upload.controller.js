const fileModel = require("../models/file.model");
const path = require('path')

const uploadController = async (req, res, next) => {
  const fileExtension = path.extname((req.file.originalname).toLowerCase())
  const createInDB = await fileModel.create({
    name: req.file.filename,
    file_extension: fileExtension,
    mime_type: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    user_id: req.user.id,
  });
  return res.send('success');
};

module.exports = uploadController;
