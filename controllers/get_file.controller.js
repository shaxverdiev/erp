const fileModel = require('../models/file.model')

const getFileController = async (req, res, next) => {
    const getFileDB = await fileModel.findOne({where: {user_id: req.user.id, id: req.params.id}})
    return res.json(getFileDB)
  }

module.exports = getFileController