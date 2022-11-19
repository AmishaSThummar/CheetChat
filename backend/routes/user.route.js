<<<<<<< HEAD
const router = require('express').Router();
let User = require('../models/user.model');
const multer = require('multer');
var fs = require('fs');
var path = require('path');
const { default: mongoose } = require('mongoose');

// Multer file upload settings 
// In DIR we have path where all images will be stored.

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
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

// var upload = multer({storage: storage});



router.post('/loginUser', upload.single('imageInput'), (req, res) => {
    let name = req.body.userName;
    let pass = req.body.password;

    // console.log(req.body.userName);
    User.findOne({ userName: name }, { __v: 0 }, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'not found' });
        }
        else if (!user) {
            console.log('Invalid Username and password.');
            return res.status(400).json({ message: "Invalid Username and password." });

        }
        else if (user.password != pass) {
            // req.session.msg = "Invalid password.";
            console.log('Invalid password.');
            return res.status(401).json({ message: "Invalid password." });
        }
        // req.session.userId = user._id;
        console.log("User logged in.")

        return res.status(200).json(user);
    });

});

//Profile management
router.post('/addUser', upload.single('profile'), (req, res, next) => {
    console.log("Inside addUser route of backend routes");
    
    const url = req.protocol + '://' + req.get('host');
    console.log("Url is :"+url);
    // console.log(req.file);

    var user = new User(req.body);

    if(req.file != null){
        user.profile = url + '/public/' + req.file.filename;
    }
    else{
        user.profile = url + '/public/user.jpg';
    }

    console.log(user);
    // user.create(user, (err,item)=>{
    //     if(err){
    //         console.log(err);
    //     }
    // })
    user.save()
        .then(user => {
            console.log(user)
            res.json(user)
        })
        .catch(error => {
            // res.json(error)
            console.log(error);
            if (error.code == 11000) {
                res.status(401).json({ message: "Username is already taken." })
            }
            
        })
});

router.get('/viewUser/:id', (req, res) => {
    console.log("inside viewUser backend");
    User.findOne({ _id: req.params.id }, { _id: 0, __v: 0 }, (err, user) => {
        if (err) {
            return res.status(400).json({ error: 'User not found!!' })
        }
        if (!user) {
            return res.status(400).json({ error: 'Something went wrong.User is not present' });
        }
        return res.status(200).json(user);
    })
})

router.put('/updateUser/:id', upload.single('imageInput'), (req, res) => {
    console.log("Inside update user backend of user route");
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false },
        function (err, result) {
            if (err)
                return res.status(400).json({ error: err })
            return res.status(200).json({ result })
        });
});

router.delete('/removeUser/:id', (req, res) => {
    console.log("inside remove User backend");
    User.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result });
    })
})



//For contacts of user
router.get('/findUser/:userName',(req,res)=>{
    User.findOne({userName:req.params.userName},{__v:0},(err,user)=>{
        if(err){
            return res.status(400).json({error:'User not found!!'})
        }
        if(!user){
            return res.status(400).json({error:'Something went wrong.User is not present'});
        }
        return res.status(200).json(user);
    })
});

router.post('/addContact/:id',upload.single('profile'),(req,res)=>{
    let user = User.findOne({_id:req.params.id});
    User.findOne({userName:req.body.userName}, { __v: 0 },(err,contact)=>{
        if(err){
            return res.status(400).json({ message: err.message });
        }
        else if(!contact){
            return res.status(400).json({ message: "This user is not present." });
        }
        
        User.findOneAndUpdate({_id:req.params.id},{})
    })
})

router.get('/allContacts',(req,res)=>{
    User.find({},{_id:0,__v:0,password:0,email:0,contacts:0,messages:0,status:0,mobile:0,groups:0,profile:0},(err,data)=>{
        if(err){
            return res.status(400).json(err);
        }
        else if(data){
            return res.status(200).json(data);
        }
    })
})


=======
const router = require('express').Router();
let User = require('../models/user.model');
const multer = require('multer');
var fs = require('fs');
var path = require('path');
const { default: mongoose } = require('mongoose');

// Multer file upload settings 
// In DIR we have path where all images will be stored.

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
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
  });

// var upload = multer({storage: storage});



router.post('/loginUser', upload.single('imageInput'), (req, res) => {
    let name = req.body.userName;
    let pass = req.body.password;

    // console.log(req.body.userName);
    User.findOne({ userName: name }, { __v: 0 }, (err, user) => {
        if (err) {
            return res.status(400).json({ message: 'not found' });
        }
        else if (!user) {
            console.log('Invalid Username and password.');
            return res.status(400).json({ message: "Invalid Username and password." });

        }
        else if (user.password != pass) {
            // req.session.msg = "Invalid password.";
            console.log('Invalid password.');
            return res.status(401).json({ message: "Invalid password." });
        }
        // req.session.userId = user._id;
        console.log("User logged in.")

        return res.status(200).json(user);
    });

});

//Profile management
router.post('/addUser', upload.single('profile'), (req, res, next) => {
    console.log("Inside addUser route of backend routes");
    
    const url = req.protocol + '://' + req.get('host');
    console.log("Url is :"+url);
    // console.log(req.file);

    var user = new User(req.body);

    if(req.file != null){
        user.profile = url + '/public/' + req.file.filename;
    }
    else{
        user.profile = url + '/public/user.jpg';
    }

    console.log(user);
    // user.create(user, (err,item)=>{
    //     if(err){
    //         console.log(err);
    //     }
    // })
    user.save()
        .then(user => {
            console.log(user)
            res.json(user)
        })
        .catch(error => {
            // res.json(error)
            console.log(error);
            if (error.code == 11000) {
                res.status(401).json({ message: "Username is already taken." })
            }
            
        })
});

router.get('/viewUser/:id', (req, res) => {
    console.log("inside viewUser backend");
    User.findOne({ _id: req.params.id }, { _id: 0, __v: 0 }, (err, user) => {
        if (err) {
            return res.status(400).json({ error: 'User not found!!' })
        }
        if (!user) {
            return res.status(400).json({ error: 'Something went wrong.User is not present' });
        }
        return res.status(200).json(user);
    })
})

router.put('/updateUser/:id', upload.single('imageInput'), (req, res) => {
    console.log("Inside update user backend of user route");
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false },
        function (err, result) {
            if (err)
                return res.status(400).json({ error: err })
            return res.status(200).json({ result })
        });
});

router.delete('/removeUser/:id', (req, res) => {
    console.log("inside remove User backend");
    User.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result });
    })
})



//For contacts of user
router.get('/findUser/:userName',(req,res)=>{
    User.findOne({userName:req.params.userName},{__v:0},(err,user)=>{
        if(err){
            return res.status(400).json({error:'User not found!!'})
        }
        if(!user){
            return res.status(400).json({error:'Something went wrong.User is not present'});
        }
        return res.status(200).json(user);
    })
});

router.post('/addContact/:id',upload.single('profile'),(req,res)=>{
    let user = User.findOne({_id:req.params.id});
    User.findOne({userName:req.body.userName}, { __v: 0 },(err,contact)=>{
        if(err){
            return res.status(400).json({ message: err.message });
        }
        else if(!contact){
            return res.status(400).json({ message: "This user is not present." });
        }
        
        User.findOneAndUpdate({_id:req.params.id},{})
    })
})

router.get('/allContacts',(req,res)=>{
    User.find({},{_id:0,__v:0,password:0,email:0,contacts:0,messages:0,status:0,mobile:0,groups:0,profile:0},(err,data)=>{
        if(err){
            return res.status(400).json(err);
        }
        else if(data){
            return res.status(200).json(data);
        }
    })
})


>>>>>>> b2d3be2 (First commit)
module.exports = router;