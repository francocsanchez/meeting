const passport = require('passport');

exports.logIn = passport.authenticate('local', {
    successRedirect: '/user/admin/panel',
    failureRedirect: '/user/log-in',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

exports.userAutenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/user/log-in');
}