const bcrypt = require('bcryptjs')

function hashPassword (pwd) {
 const salt = bcrypt.genSaltSync(8)
 const hashedPassword = bcrypt.hashSync(pwd, salt);
 return hashedPassword
}

function comparePassword (input, hash) {
    return bcrypt.compareSync(input, hash)
}

module.exports = {
    hashPassword, comparePassword
}