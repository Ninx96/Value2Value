exports.authSession = (req, res, next) => {
  if (req.session.isAuth) {
    next();
    return;
  }
  res.redirect("/login");
};

exports.closeSession = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};
