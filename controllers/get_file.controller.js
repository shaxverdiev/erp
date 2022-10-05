const verifyToken = require('../helpers/info_from_token.helper')
const fileModel = require('../models/file.model')

const getFileController = async (req, res, next) => {
    const ver = verifyToken(req);
    const idFromToken = ver.validToken.id;


    const getFileDB = await fileModel.findOne({where: {user_id: idFromToken, id: req.params.id}})
    return res.json(getFileDB)
  }

module.exports = getFileController