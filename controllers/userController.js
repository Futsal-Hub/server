const {User} = require('../models')
const { comparePassword } = require('../helpers/password')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { username, email, password, role, courts, position } = req.body
        let payload;
        if (role === "owner") {
            payload = { username, email, password, role, courts }
        } else if (role === "player") {
            payload = { username, email, password, role, position }
        }

        User.register(payload)
        .then(response => {
            res.status(201).json(response.ops[0])
        })
        .catch(error => {
            res.status(500).json({message:'Internal Server Error'})
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        const payload = { email, password }
        User.login(payload)
        .then(response => {
            if (!response) {
                throw {status: 401, message: `Invalid account`}
            } else if (comparePassword(password, response.password)) {
                const access_token = generateToken({id: response._id, email: response.email})
                res.status(200).json({access_token, user:response})
            } else {
                throw {status: 401, message: `Invalid email/password`}
            }            
        })
        .catch(error => {
            res.status(500).json({message:'Internal Server Error'})
        })
    }
}

module.exports = UserController