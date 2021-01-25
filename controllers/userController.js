const {User} = require('../models')
const { comparePassword } = require('../helpers/password')
const { generateToken } = require('../helpers/jwt');

class UserController {
    static register(req, res, next) {
        console.log(req.body, "<<< register")
        const { username, email, password, role } = req.body
        let payload;
        if (role === "owner") {
            const courts = []
            payload = { username, email, password, role, courts }
        } else if (role === "player") {
            const position = { lat:'', lng:'' }
            const distance = 0;
            payload = { username, email, password, role, position, distance }
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
        console.log("Masuk Login");
        console.log(req.body)
        const { email, password, position } = req.body
        const payload = { email, password, position }
        console.log(payload)
        User.login(payload)
        .then(response => {
            if (!response) {
                throw {status: 400, message: `Invalid account`}
            } else if (comparePassword(password, response.value.password)) {
                const access_token = generateToken({id: response.value._id, email: response.value.email})
                res.status(200).json({access_token, user:response.value})
            } else {
                throw {status: 400, message: `Invalid email/password`}
            }            
        })
        .catch(error => {
            console.log(error, "<<< error");
            if (error.message === 'Invalid account' || error.message === 'Invalid email/password') {
                res.status(error.status).json({message: error.message})               
            } else {
                res.status(500).json({message:'Internal Server Error'})
            }
        })
    }

    static findAll(req, res, next) {
        console.log("masukt find all user")
        User.findAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({message:'Internal Server Error'})
        })

    }
    
    static uploadPhoto(req, res, next) {
        console.log("Masuk upload photo")
    }
}

module.exports = UserController