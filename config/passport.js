const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    async (email, password, next) => {
        const user = await Users.findOne({ where: { email } });

        if (user.status === 0) return next(null, false, {
            message: 'Usuario inactivo, por favor verifique su correo electronico'
        });

        if (!user) return next(null, false, {
            message: 'Usuario inexistente'
        });

        const confirmPassword = user.comparePassword(password);

        if (!confirmPassword) return next(null, false, {
            message: 'Password incorrecto'
        });

        return next(null, user);
    }
))

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;