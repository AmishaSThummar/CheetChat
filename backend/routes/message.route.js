<<<<<<< HEAD
const router = require('express').Router();
const Message = require("../models/Message.model");
const multer = require('multer');
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


//add
router.post('/',upload.single('profile'), async (req,res) => {

    console.log("Inside message");
    const newMessage = new Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})

//get

router.get('/:conversationId',async (req,res)=>{
    
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(error);
    }
});

=======
const router = require('express').Router();
const Message = require("../models/Message.model");
const multer = require('multer');
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


//add
router.post('/',upload.single('profile'), async (req,res) => {

    console.log("Inside message");
    const newMessage = new Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})

//get

router.get('/:conversationId',async (req,res)=>{
    
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(error);
    }
});

>>>>>>> b2d3be2 (First commit)
module.exports = router;