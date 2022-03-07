const express= require('express');
const multer=require('multer');
const router=express.Router()



const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });



router.post('/', upload.single('image'), (req, res) => {
  res.send(req.file);
});




module.exports =router;
/*const express = require("express");
const multer = require("multer");
const Photo = require("../models/Photo");
const Router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg)$/)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const photo = new Photo(req.body);
    const file = req.file.buffer;
    photo.photo = file;
    await photo.save();
    res.send(photo);
  } catch (error) {
    res.status(500).send({ upload_error: error.message });
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});
Router.get("/", async (req, res) => {
  try {
    const result = await Photo.find();
    res.set("Content-Type", "image/jpeg");
    res.send(result);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

module.exports = Router;*/




