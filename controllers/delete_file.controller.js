const verifyToken = require('../helpers/info_from_token.helper')
const fileModel = require('../models/file.model')
const fs = require('fs')

const deleteFileController = async (req, res, next) => {
    const ver = verifyToken(req);
    const idFromToken = ver.validToken.id;

    const getFilePathFromDB = await fileModel.findOne({where: {user_id: idFromToken, id: req.params.id}})
    console.log(getFilePathFromDB.path)
    const pathFromDB = getFilePathFromDB.path

    const removeFileFromStorage = fs.unlinkSync(`./${pathFromDB}`)

    const getFileDB = await fileModel.destroy({where: {user_id: idFromToken, id: req.params.id}})
    return res.json(getFileDB)
  }

module.exports = deleteFileController