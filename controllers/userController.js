const User = require('../models/user')

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
        .then(result => {
            res.status(201)
            res.send(result)
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }

    static login(req, res, next) {
        const { email, password, role } = req.body
        const payload = { email, password, role }
        User.login(payload)
        .then(result => {
            res.status(200)
            res.send(result)
        })
        .catch(error => {
            res.status(500)
            res.send({message:'Internal Server Error'})
        })
    }
}

module.exports = UserController