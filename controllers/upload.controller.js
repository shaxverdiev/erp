const fileModel = require("../models/file.model");
const verifyToken = require("../helpers/info_from_token");

const uploadController = async (req, res, next) => {
  console.log(req.file);
  const ver = verifyToken(req);
  const idFromToken = ver.validToken.id;

  console.log("============>", req.file);
  const createDB = await fileModel.create({
    name: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    user_id: idFromToken,
  });
  return res.json({ createDB });
};

module.exports = uploadController;
