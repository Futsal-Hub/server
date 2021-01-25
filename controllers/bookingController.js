const {Booking} = require("../models");

class BookingController {
  static async create(req, res, next) {
    const { schedule, host, players, court } = req.body;
    const payload = {
      schedule,
      host,
      players: [players],
      court,
    };

    try {
      const response = await Booking.create(payload);
      res.status(201).json(response.ops[0]);
    } catch (err) {
      console.log(err);
    }
  }
  static async update(req, res, next) {
    const { id } = req.params;
    const { schedule, host, players, court } = req.body;
    const payload = {
      schedule,
      host,
      players: [players],
      court,
    };
    try {
      const response = await Booking.update(id, payload);
      res.status(200).json(response.value);
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePlayers(req, res, next) {
    const { id } = req.params;
    const { players } = req.body;
    const payload = { players };
    console.log(payload, "<<< test");

    try {
      const response = await Booking.update(id, payload);
      console.log(response ,"<<< response");
      res.status(200).json(response.value);
    } catch (error) {}
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
      console.log(error);
    }
  }

  static async findByOwner(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Booking.findByOwner(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPlayer(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Booking.findByPlayer(id);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }
  static async destroy(req, res, next) {
    const { id } = req.params;

    try {
      const response = await Booking.destroy(id);
      res.status(200).json({ message: "Resource Deleted Successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BookingController;
