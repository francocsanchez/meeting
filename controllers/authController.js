const passport = require('passport');

exports.logIn = passport.authenticate('local', {
    successRedirect: '/ok',
    failureRedirect: '/user/log-in',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})