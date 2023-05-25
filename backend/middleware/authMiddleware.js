// Middleware to make the `user` object available for all views
module.exports = (routeObj) => {
  routeObj.app.use(function (req, res, next) {
    console.log("middleware accessed " + req.url);
    res.locals.user = req.oidc.user;
    next();
  });
};
