function passDataToView(req, res, next) {
  //always have access to user in every view
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  //redirects user to index if not logged in
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}

export {
  passDataToView,
  isLoggedIn,
}
