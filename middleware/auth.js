const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (!req.headers.auth){
        return res.status(401).json({ status: false, msg: 'Unauthrorized' });
    }
    const token = req.headers.auth;
    jwt.verify(token, config.get('secret'), function(err, user){
        if(!err){
            req.user = user;
            next();
        }
    });

}