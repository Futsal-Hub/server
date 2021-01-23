const {Court} = require("../models");

class CourtController {
  static async create(req, res, next) {
    const { name, price, type, position, schedule, address } = req.body;
    const payload = {
      name,
      price,
      type,
      position,
      schedule,
      address,
    };

    try {
      const response = await Court.create(payload);
      console.log("suskses create");
      res.status(201).json(response.ops[0]);
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const response = await Court.findAll();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Court.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res, next) {
    console.log("update court masuk");
    const id = req.params.id;
    const { name, price, type, position, schedule, address } = req.body;
    const payload = {
      name,
      price,
      type,
      position,
      schedule,
      address,
    };

    try {
      const response = await Court.update(id, payload);
      res.status(200).json(response.value);
    } catch (error) {
      console.log(error);
    }
  }

  static async destroy(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Court.destroy(id);
      res.status(200).json({ message: "Resource Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CourtController;
