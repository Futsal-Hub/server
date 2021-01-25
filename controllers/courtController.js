const { Court } = require("../models");

class CourtController {
  static async create(req, res, next) {
    console.log(req.body,"<<<< masuk controller")

    const { name, price, type, position, schedule, address, owner, photos } = req.body;
    const payload = {
      name,
      price,
      type,
      position,
      schedule,
      address,
      owner,
      photos,
    };

    try {
      if (payload.name === undefined || payload.name === "") {
        throw {
          status: 500,
          message: "Internal server error"
        }
      }
      const response = await Court.create(payload);
      res.status(201).json(response.ops[0]);
    } catch (error) {
      if (error.status) {
        res.status(500).json({message: error.message})
      }
    }
  }

  static async findAll(req, res, next) {
    try {
      const response = await Court.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
    }
  }

  static async findOne(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Court.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({message:"Internal Server Error"})
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const { name, price, type, position, schedule, address, owner, photos } = req.body;
    const payload = {
      name,
      price,
      type,
      position,
      schedule,
      address,
      owner,
      photos
    };

    try {
      const response = await Court.update(id, payload);
      res.status(200).json(response.value);
    } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
    }
  }

  static async destroy(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Court.destroy(id);
      res.status(200).json({ message: "Resource Deleted Successfully" });
    } catch (error) {
      res.status(500).json({message: "Internal Server Error"})
    }
  }
}

module.exports = CourtController;
