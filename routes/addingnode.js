const express = require("express");
const router = express.Router();
const addnodes = require("../models/sankeynodes");
const multer = require("multer");
const AWS = require("aws-sdk");

// Configure Multer for storing profile images
const storage = multer.memoryStorage(); // Use memory storage for uploading to S3

const nodes = multer({ storage });

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const defaultImageUrl = "https://nodes-8-8-23.s3.amazonaws.com/logo-new-1.jpeg"

router.post("/", nodes.single("image"), async (req, res) => {
  try {
    const { role } = req.authData;
    if (req.authData)
      if (role !== "admin") {
        throw {
          status: 403,
          message: "Access forbidden. You are not an admin.",
        };
      }

    const { id, colour } = req.body;

    if (!id) return res.status(400).send("Required field cannot be empty");

    const node = await addnodes.findOne({ where: { id: id } });
    if (node) return res.status(400).send("This node already exists.");

    let img = node ? node.image : "";

    // Upload to S3 if a new image is provided
    if (req.file) {
      const fileExtension = req.file.originalname.split(".").pop();
      const fileName = `${id}-${Date.now()}.${fileExtension}`;

      const params = {
        Bucket: "nodes-8-8-23", // Replace with your S3 bucket name
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: "",
      };
      const uploadResult = await s3.upload(params).promise();
      img = uploadResult.Location;
    } else {
      img = defaultImageUrl; // Use the default image URL
    }

    let addnode = await addnodes.create({
      id: id,
      colour: colour,
      image: img,
    });

    return res
      .status(200)
      .send({ message: "Node added successfully", addnode });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
  }
});

module.exports = router;
