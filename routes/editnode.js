const express = require("express");
const router = express.Router();
const getnodes = require("../models/sankeynodes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure Multer for storing profile images
const storage = multer.diskStorage({
    // Setup destination folder for uploaded images
    destination: function (req, file, next) {
        next(null, "public/nodes");
    },
    // Setup filename for uploaded image
    filename: function (req, file, next) {
        let { old_id , new_id } = req.body;
        next(null,  new_id ? new_id + Date.now() + ".png" : old_id + Date.now() + ".png");
    },
});

const nodes = multer({ storage });

router.put("/", nodes.single("image"), async (req, res) => {
   try {
    
    const { old_id, new_id , colour } = req.body;

   if(!old_id ) return res.status(400).send("Required field cannot be empty");
   
    const node = await getnodes.findOne({ where:{id:old_id}})
    if (!node) return res.status(400).send('No such node exists.');

    const imagepath = path.join(__dirname, '..', 'public/nodes', node.image)
    if (fs.existsSync(imagepath) && node.image && req.file.filename) fs.unlinkSync(imagepath) 

    const img = req.file ? req.file.filename: node.image;

    let updatednode = await getnodes.update(
        {
            id: new_id,
            colour: colour ? colour: node.colour,
            image: img
        },
        {
            where: { id: old_id},
            returning: true,
            plain: true,
        }
    );
    return res.status(200).send({ message:"Node updated successfully"});
   } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
   }
});

module.exports = router;
