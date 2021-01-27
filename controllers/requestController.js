const { ObjectId } = require("mongodb");
const { Request } = require("../models");

class RequestController {
  static async create(req, res, next) {
    console.log("masuk create");
    const { origin, destination, status, game } = req.body;
    const payload = {
      origin,
      destination,
      status,
      game,
    };

    try {
      if (payload.origin === "" || payload.origin === undefined) {
        throw {
          message: "error",
        };
      }
      payload.destination._id = ObjectId(payload.destination._id);
      payload.origin._id = ObjectId(payload.destination._id);
      const response = await Request.create(payload);
      console.log(response.ops[0], "<<request create");
      res.status(201).json(response.ops[0]);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findAllReceived(req, res, next) {
    const { userId } = req.params;
    try {
      const response = await Request.findAllReceived(userId);
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findAllSent(req, res, next) {
    const { userId } = req.params;
    try {
      const response = await Request.findAllSent(userId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findOne(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Request.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const { origin, destination, status } = req.body;
    const payload = {
      origin,
      destination,
      status,
    };

    try {
      const response = await Request.update(id, payload);
      console.log(response, "<<<< response update");
      res.status(200).json(response.value);
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatus(req, res, next) {
    const id = req.params.id;
    const { status } = req.body;
    const payload = {
      status,
    };

    try {
      const response = await Request.update(id, payload);
      console.log(response, "<<< update status");
      res.status(200).json(response.value);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
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
