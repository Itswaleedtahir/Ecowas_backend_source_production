const express = require("express");
const router = express.Router();
const addnodes = require("../models/sankeynodes");
const multer = require("multer");

// Configure Multer for storing profile images
const storage = multer.diskStorage({
    // Setup destination folder for uploaded images
    destination: function (req, file, next) {
        next(null, "public/nodes");
    },
    // Setup filename for uploaded image
    filename: function (req, file, next) {
        let { id} = req.body;
        next(null,  id + ".png");
    },
});

const nodes = multer({ storage });

router.post("/", nodes.single("image"), async (req, res) => {
   try {
    const { role } = req.authData;
    if(req.authData)
    if (role !== "admin") {
        throw { status: 403, message: "Access forbidden. You are not an admin." };
      }
    
    const { id, colour } = req.body;

   if(!id ) return res.status(400).send("Required field cannot be empty");
   
    const node = await addnodes.findOne({ where:{id:id}})
    if (node) return res.status(400).send('This node already exists.');

    const img = req.file ? req.file.filename: node.image;

    let addnode = await addnodes.create(
        {
            id: id,
            colour: colour,
            image: img
        }
    );
    return res.status(200).send({ message:"Node added successfully",addnode });
   } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
   }
});

module.exports = router;
