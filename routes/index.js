

module.exports = (app) => {

    app.use('/', require('./home.route'));

    app.use('/auth', require('./auth.route'));

}