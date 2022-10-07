const infoController = async (req, res, next) => {
  try {
    return res.json({ user_id: req.user.id });
  } catch (err) {
    next(err);
  }
};

module.exports = infoController;
