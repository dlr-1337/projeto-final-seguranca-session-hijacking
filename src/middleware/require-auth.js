const { findUserById } = require("../data/users");

function requireAuth(req, res, next) {
  const userId = req.session && req.session.userId;
  const user = userId ? findUserById(userId) : null;

  if (!user) {
    return res.redirect("/login");
  }

  res.locals.user = user;
  return next();
}

module.exports = {
  requireAuth
};
