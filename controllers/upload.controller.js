const fileModel = require("../models/file.model");
const verifyToken = require("../helpers/info_from_token.helper");
const path = require('path')

const uploadController = async (req, res, next) => {
  const ver = verifyToken(req);
  const idFromToken = ver.validToken.id;


  const fileExtension = path.extname((req.file.originalname).toLowerCase())
  const createInDB = await fileModel.create({
    name: req.file.filename,
    file_extension: fileExtension,
    mime_type: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    user_id: idFromToken,
  });
  return res.json({ createInDB });
};

module.exports = uploadController;
