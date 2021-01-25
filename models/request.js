const db = require("../config/mongo");
const request = db.collection("request");
const { ObjectId } = require("mongodb");

class Request {
  static create(payload) {
    return request.insertOne(payload);
  }
  static findAllSent(userId) {
    return request
      .find({
        "origin._id": ObjectId(userId),
        type: 1,
      })
      .toArray();
  }

  static findAllReceived(userId) {
    return request
      .find({
        "destination._id": userId,
      })
      .toArray();
  }

  static findOne(id) {
    return request.findOne({ _id: ObjectId(id) });
  }

  static destroy(id) {
    return request.findOneAndDelete({ _id: ObjectId(id) });
  }

  static update(id, payload) {
    return request.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: payload },
      { returnOriginal: false }
    );
  }
}

module.exports = Request;
