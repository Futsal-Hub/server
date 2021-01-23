const db = require('../config/mongo')
const User = db.collection('users')
// const { ObjectId } = require("mongodb")

// db.runCommand({
//     collMod: "users",
//     validationAction: "error",
//     validator: {
//         $jsonSchema: {
//             bsonType: "object",
//             required: [ "usename", "email", "password", "role", "password" ],
//             properties: {
//                 username: {
//                     bsonType: "string",
//                     description: "must be a string"
//                 },
//                 email: {
//                     bsonType: "string",
//                     description: "must be a a valid email and is required",
//                     pattern: '$regex pattern'
//                 },
//                 password: {
//                     bsonType: "string",
//                     description: "must be a string and is required"
//                 },
//                 role: {
//                     enum: [ "Owner", "Player" ],
//                     description: "must be a -"
//                 },
//                 courts: {
//                     bsonType: "array",
//                     description: "must be an array and is required"
//                 }
//             }                    
//         }
//   User })


class UserModel {
    static register(payload){
        return User.insertOne(payload)
    }

    static login(payload){
        return User.findOne(payload)
    }

} 

module.exports = UserModel