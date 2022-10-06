const infoController = async (req, res, next) => {
    return res.json({user_id: req.user.id})
}

module.exports = infoController