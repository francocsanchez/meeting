const passport = require('passport');

exports.logIn = passport.authenticate('local', {
    successRedirect: '/user/admin/panel',
    failureRedirect: '/user/log-in',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})