const { User } = require("../models");
const { comparePassword } = require("../helpers/password");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    console.log("<<<< response regiters");
    const { username, email, password, role } = req.body;
    let payload;
    if (role === "owner") {
      const courts = [];
      payload = { username, email, password, role, courts };
    } else if (role === "player") {
      const position = { lat: "", lng: "" };
      const distance = 0;
      payload = { username, email, password, role, position, distance };
    }

    try {
      if (payload.username === "" || payload.username === undefined) {
        throw {
          status: 500,
        };
      }

      const response = await User.register(payload);
      res.status(201).json(response.ops[0]);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static login(req, res, next) {
    const { email, password, position } = req.body;
    const payload = { email, password, position };
    User.login(payload)
      .then((response) => {
        if (!response.value) {
          throw { status: 400, message: `Invalid account` };
        } else if (comparePassword(password, response.value.password)) {
          const access_token = generateToken({
            id: response.value._id,
            email: response.value.email,
          });
          res.status(200).json({ access_token, user: response.value });
        } else {
          throw { status: 400, message: `Invalid email/password` };
        }
      })
      .catch((error) => {
        if (
          error.message === "Invalid account" ||
          error.message === "Invalid email/password"
        ) {
          res.status(error.status).json({ message: error.message });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static findAll(req, res, next) {
    User.findAll()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }

  static uploadPhoto(req, res, next) {
    console.log("Masuk upload photo");
  }
}

module.exports = UserController;
