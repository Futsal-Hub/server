const db = require('../config/mongo')
const User = db.collection('users')
const { hashPassword } = require('../helpers/password')

class UserModel {
    static register(payload){
        payload.password = hashPassword(payload.password)
        return User.insertOne(payload)
    }

    static login(payload){
        return User.findOneAndUpdate({email: payload.email},
                                    {$set: {"position":payload.position}},
                                    {returnOriginal:false})
    }

    static findAll(){
        return User.find().toArray();
    }

} 

module.exports = UserModel