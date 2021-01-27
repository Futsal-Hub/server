const { Booking } = require("../models");
const { ObjectId } = require("mongodb");

class BookingController {
  static async create(req, res, next) {
    const { schedule, host, players, court, date, status } = req.body;
    const payload = {
      schedule,
      host,
      players: [players],
      court,
      date,
      status,
    };
    console.log("masuk create booking");

    try {
      if (payload.host === "" || payload.host === undefined) {
        throw {
          status: 500,
          message: "Internal Server Error",
        };
      }
      const response = await Booking.create(payload);
      res.status(201).json(response.ops[0]);
    } catch (err) {
      console.log(err, "<<<< ertt");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async update(req, res, next) {
    const { id } = req.params;
    const { schedule, host, players, court, date, status } = req.body;
    const payload = {
      schedule,
      host,
      players: [players],
      court,
      date,
      status,
    };
    try {
      if (payload.host === "" || payload.host === undefined) {
        throw {
          status: 500,
          message: "Internal Server Error",
        };
      }
      const response = await Booking.update(id, payload);
      res.status(200).json(response.value);
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  }

  static async updatePlayers(req, res, next) {
    const { id } = req.params;
    const { players } = req.body;
    const payload = { players };
    console.log(payload, "<<< test");
    console.log(id, "<<<< update id");

    try {
      const response = await Booking.update(id, payload);
      console.log(response, "<<< response");
      res.status(200).json(response.value);
    } catch (error) {
      console.log(error, "<<< err patch");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async findAll(req, res, next) {
    try {
      const response = await Booking.findAll();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Booking.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server erro" });
    }
  }

  static async findByOwner(req, res, next) {
    const id = req.params.ownerId;
    try {
      const response = await Booking.findByOwner(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findByPlayer(req, res, next) {
    const id = req.params.playerId;

    try {
      const response = await Booking.findByPlayer(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async destroy(req, res, next) {
    const { id } = req.params;

    try {
      const response = await Booking.destroy(id);
      res.status(200).json({ message: "Resource Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = BookingController;
