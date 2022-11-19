<<<<<<< HEAD
const router = require('express').Router();
const Conversation = require("../models/Conversation.model");
const multer = require('multer');
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
        console.log('inside storage');
    },
    filename: (req, file, cb)=>{
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileName = (new Date()).getTime() + path.extname(file.originalname);
        cb(null, fileName)
    }
});


// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });


// new con
router.post("/",upload.single('profile'), async (req, res) => {
    console.log("inside conversation ", req.body.senderId);

    if (req.body.senderId != undefined) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });

        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);

        } catch (err) {
            res.status(500).json(err);
        }
    }
});


//get con of user
router.get("/:userId", async (req, res) => {

    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);

    } catch (err) {
        res.status(500).json(err);
    }
});

=======
const router = require('express').Router();
const Conversation = require("../models/Conversation.model");
const multer = require('multer');
var fs = require('fs');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
        console.log('inside storage');
    },
    filename: (req, file, cb)=>{
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileName = (new Date()).getTime() + path.extname(file.originalname);
        cb(null, fileName)
    }
});


// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });


// new con
router.post("/",upload.single('profile'), async (req, res) => {
    console.log("inside conversation ", req.body.senderId);

    if (req.body.senderId != undefined) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId],
        });

        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);

        } catch (err) {
            res.status(500).json(err);
        }
    }
});


//get con of user
router.get("/:userId", async (req, res) => {

    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);

    } catch (err) {
        res.status(500).json(err);
    }
});

>>>>>>> b2d3be2 (First commit)
module.exports = router;