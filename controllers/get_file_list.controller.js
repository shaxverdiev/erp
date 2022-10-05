const fileModel = require("../models/file.model");
const pagintaion = require('../helpers/pagination.helper')

const getFileListController = async (req, res, next) => {
  try {
    const pag = await pagintaion(req, fileModel);
    return res.json(pag)
  } catch (e) {
    console.log(e);
  }
};

module.exports = getFileListController;
