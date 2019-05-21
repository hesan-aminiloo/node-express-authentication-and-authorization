const db = require('../bootstrap/db');
const bcrypt = require('bcrypt');
const Schema = db.Schema;

const UserSchema = new Schema({
    username : { type: String, required: true },
    password : { type: String, required: true },
    email : { type: String, required: true, unique: true }
});

UserSchema.pre('save', function(next){
    const user = this;
    if (user.isModified('password') || user.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hashedPassword){
                if (err) return next(err);
                user.password = hashedPassword;
                next();
            });
        });
    } else { next() }
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        cb(err, isMatch);
    });
}

module.exports = db.model('User', UserSchema);