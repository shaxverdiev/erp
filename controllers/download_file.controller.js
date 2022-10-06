const fileModel = require("../models/file.model");
const fs = require("fs");

const downloadFileController = async (req, res, next) => {
  try {
    const fileFromDB = await fileModel.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });
    const path = fileFromDB.path;

    if (fs.existsSync(`./${path}`)) {
      return res.download(path, fileFromDB.name);
    }
    return res.send("file dont found");
  } catch (err) {
    console.log(err);
  }
};

module.exports = downloadFileController;
