const db = require('../config/mongo')
const User = db.collection('users')
const { verifyToken } = require('../helpers/jwt')
const { ObjectId } = require("mongodb")

module.exports = async (req,res, next) => {
    try {
        const { access_token } = req.headers
        console.log(access_token, "<<< access_token auth");
        if (!access_token) {
            console.log("no access token")
            throw { status: 401, message: `You have to login first`}
        } else {
            const decoded = verifyToken(access_token)
            const user = await User.findOne({"_id" : ObjectId(`${decoded.id}`)})
            if (user) {
                next()
            } else {
                throw { status: 401, message: `You have to login first`}
            }
        }        
    } catch (error) {
        next(error)
    }
}