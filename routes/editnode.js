const express = require("express");
const router = express.Router();
const getnodes = require("../models/sankeynodes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AWS = require("aws-sdk"); // Add AWS SDK

 

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

 

router.put("/", nodes.single("image"), async (req, res) => {
  try {
    const { role } = req.authData;
    if (req.authData)
      if (role !== "admin") {
        throw {
          status: 403,
          message: "Access forbidden. You are not an admin.",
        };
      }

 

    const { old_id, new_id, colour } = req.body;

 

    if (!old_id) return res.status(400).send("Required field cannot be empty");

 

    const node = await getnodes.findOne({ where: { id: old_id } });
    if (!node) return res.status(400).send("No such node exists.");

 

    const imagepath = path.join(__dirname, "..", "public/nodes", node.image);
    if (
      fs.existsSync(imagepath) &&
      node.image &&
      req?.file?.buffer
    )
      fs.unlinkSync(imagepath);

 

    let img = node.image;
    // Upload to S3 if a new image is provided
    if (req.file) {
      const fileExtension = req.file.originalname.split(".").pop();
      const fileName = `${new_id ? new_id : old_id}-${Date.now()}.${fileExtension}`;
      const params = {
        Bucket: "nodes-8-8-23", // Replace with your S3 bucket name
        Key: fileName,
        Body: req.file.buffer,
        ACL: "",
      };
      const uploadResult = await s3.upload(params).promise();
      img = uploadResult.Location;
    }
    let updatednode = await getnodes.update(
      {
        id: new_id,
        colour: colour ? colour : node.colour,
        image: img,
      },
      {
        where: { id: old_id },
        returning: true,
        plain: true,
      }
    );

 

    return res.status(200).send({ message: "Node updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
  }
});

 

module.exports = router;