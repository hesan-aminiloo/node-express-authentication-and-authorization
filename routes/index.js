const auth = require('../middleware/auth');

module.exports = (app) => {

    app.use('/', require('./home.route'));

    app.use('/auth', require('./auth.route'));

    app.use('/user', auth, require('./user.route'));

}