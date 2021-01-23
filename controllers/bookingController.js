const {Booking} = require("../models");

class BookingController {
  static async create(req, res, next) {
    const { schedule_id, player_id, players, court_id } = req.body;
    const payload = {
      schedule_id,
      player_id,
      players: [players],
      court_id,
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
    const { schedule_id, player_id, players, court_id } = req.body;
    const payload = {
      schedule_id,
      player_id,
      players: [players],
      court_id,
    };

    try {
      const response = await Booking.update(id, payload);
      res.status(200).json(response.value);
    } catch (error) {
      console.log(error);
    }
  }

  static async updatePlayers(req, res, next) {
    const { id } = req.params.id;
    const { players } = req.body;
    const payload = { players };

    try {
      const response = await Booking.update(id, payload);
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
