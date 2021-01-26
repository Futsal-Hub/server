const { Court } = require("../models");
const axios = require("axios");
const imgur = require("../config/imgur");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");

class CourtController {
  static async create(req, res, next) {
    try {
      const {
        name,
        price,
        type,
        position,
        schedule,
        address,
        owner,
        photos,
      } = req.body;
      if (name === undefined || name === "") {
        throw {
          status: 500,
          message: "Internal server error",
        };
      }
      const payload = {
        name,
        price,
        type,
        position,
        schedule,
        address,
        owner,
        photos,
      };

      const files = await imagemin([`./testPhoto/${req.file.originalname}`], {
        destination: "./compressed/",
        plugins: [
          imageminMozjpeg({
            quality: 50,
          }),
        ],
      });

      const responseImageUpload = await imgur.uploadFile(
        `./compressed/${req.file.originalname}`
      );
      payload.photos = responseImageUpload.data.link;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${payload.address}&key=${process.env.GOOGLE_MAP_API}`
      );
      if (data.status === "OK") {
        payload.position = {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        };
        const response = await Court.create(payload);
        res.status(201).json(response.ops[0]);
      } else {
        throw { status: 400, message: `Invalid address` };
      }
    } catch (error) {
      if (error.status) {
        res.status(500).json({ message: error.message });
      }
      console.log(error);
    }
  }

  static async findAll(req, res, next) {
    try {
      const response = await Court.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async findOne(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Court.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async update(req, res, next) {
    const id = req.params.id;
    const {
      name,
      price,
      type,
      position,
      schedule,
      address,
      owner,
      photos,
    } = req.body;
    try {
      const payload = {
        name,
        price,
        type,
        position,
        schedule,
        address,
        owner,
        photos,
      };
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${payload.address}&key=${process.env.GOOGLE_MAP_API}`
      );
      if (data.status === "OK") {
        payload.position = {
          lat: data.results[0].geometry.location.lat,
          lng: data.results[0].geometry.location.lng,
        };
        const response = await Court.update(id, payload);
        res.status(200).json(response.value);
      } else {
        throw { status: 400, message: `Invalid address` };
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async destroy(req, res, next) {
    const id = req.params.id;

    try {
      const response = await Court.destroy(id);
      res.status(200).json({ message: "Resource Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = CourtController;
