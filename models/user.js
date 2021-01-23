const db = require('../config/mongo')
const User = db.collection('users')
const { hashPassword } = require('../helpers/password')

class UserModel {
    static register(payload){
        payload.password = hashPassword(payload.password)
        return User.insertOne(payload)
    }

    static login(payload){
        return User.findOne({email: payload.email})
    }

} 

module.exports = UserModel