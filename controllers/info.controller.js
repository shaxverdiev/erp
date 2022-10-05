const {verifyToken} = require('../helpers/info_from_token')

const infoController = async (req, res, next) => {
    const ver = verifyToken(req);
    const idFromToken = ver.validToken.id;

    return res.json({user_id: idFromToken})
}

module.exports = infoController