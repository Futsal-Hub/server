const db = require("../config/mongo");
const booking = db.collection("bookings");
const { ObjectId } = require("mongodb");

class Booking {
  static create(payload) {
    return booking.insertOne(payload);
  }
  static findAll() {
    return booking.find().toArray();
  }

  static findOne(id) {
    return booking.findOne({ _id: ObjectId(id) });
  }

  static destroy(id) {
    return booking.findOneAndDelete({ _id: ObjectId(id) });
  }

  static update(id, payload) {
    return booking.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: payload },
      { returnOriginal: false }
    );
  }
}

module.exports = Booking;
