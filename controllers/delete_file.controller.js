const fileModel = require('../models/file.model')
const fs = require('fs')

const deleteFileController = async (req, res, next) => {

    const getFilePathFromDB = await fileModel.findOne({where: {user_id: req.user.id, id: req.params.id}})
    const pathFromDB = getFilePathFromDB.path
    const removeFileFromStorage = fs.unlinkSync(`./${pathFromDB}`)

    const getFileDB = await fileModel.destroy({where: {user_id: req.user.id, id: req.params.id}})
    return res.send('success')
  }

module.exports = deleteFileController
