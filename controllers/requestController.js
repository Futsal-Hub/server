const { Request } = require("../models");

class RequestController {
  static async create(req, res, next) {
    const { origin, destination, status } = req.body;
    const payload = {
      origin,
      destination,
      status,
    };
    console.log("masuk create");
    console.log(payload);

    // try {
    //   const response = await Request.create(payload);
    //   res.status(201).json(response.ops[0]);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  static async findAllReceived(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Request.findAllReceived(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async findAllSent(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Request.findAllSent(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Request.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res, next) {
    console.log("update Request masuk");
    const id = req.params.id;
    const { origin, destination, type, status } = req.body;
    const payload = {
      origin,
      destination,
      type,
      status,
    };

    try {
      const response = await Request.update(id, payload);
      res.status(200).json(response.value);
    } catch (error) {
      console.log(error);
    }
  }

  static async destroy(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Request.destroy(id);
      res.status(200).json({ message: "Resource Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RequestController;
