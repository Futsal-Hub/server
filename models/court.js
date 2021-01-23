const db = require("../config/mongo");
const court = db.collection("courts");
const { ObjectId } = require("mongodb");

class Court {
  static create(payload) {
    return court.insertOne(payload);
  }
  static findAll() {
    return court.find().toArray();
  }

  static findOne(id) {
    return court.findOne({ _id: ObjectId(id) });
  }

  static destroy(id) {
    return court.findOneAndDelete({ _id: ObjectId(id) });
  }

  static update(id, payload) {
    return court.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: payload },
      { returnOriginal: false }
    );
  }
}

module.exports = Court;
