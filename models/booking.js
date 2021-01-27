const db = require("../config/mongo");
const booking = db.collection("bookings");
const { ObjectId } = require("mongodb");

class Booking {
  static create(payload) {
    payload.host._id = ObjectId(payload.host._id);
    payload.court.owner._id = ObjectId(payload.court.owner._id);
    return booking.insertOne(payload);
  }
  static findAll() {
    return booking.find().toArray();
  }

  static findOne(id) {
    return booking.findOne({ _id: ObjectId(id) });
  }

  static findByOwner(id) {
    return booking.find({ "court.owner._id": ObjectId(id) }).toArray();
  }

  static findByPlayer(id) {
    return booking.find({ "host._id": ObjectId(id) }).toArray();
  }

  static destroy(id) {
    return booking.findOneAndDelete({ _id: ObjectId(id) });
  }

  static update(id, payload) {
    if (payload.host && payload.court) {
      payload.host._id = ObjectId(payload.host._id);
      payload.court.owner._id = ObjectId(payload.court.owner._id);
    }
    payload.players = payload.players.map((player) => {
      player._id = ObjectId(player._id);
      return player;
    });

    return booking.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: payload },
      { returnOriginal: false }
    );
  }
}

module.exports = Booking;
