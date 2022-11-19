<<<<<<< HEAD
const router = require('express').Router();
const Group = require("../models/Group.model");
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
        console.log('inside storage');
    },
    filename: (req, file, cb) => {
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

router.post('/createGroup/:userId', upload.single('img'), (req, res) => {
    console.log("Inside createGroup backend");
    // console.log(req.body.groupName);
    let group = new Group()
    group.members = [req.params.userId];
    group.admins = [req.params.userId];
    group.groupName = req.body.groupName;
    group.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.get('/getGroup/:groupId', (req, res) => {
    // console.log("Inside getgroup backend");
    Group.find({ _id: req.params.groupId })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
    })
})

router.put('/updateGroup/:groupId', upload.single('img') ,(req, res) => {
    console.log("Update group in backend");
    console.log(req.body);
    Group.findOneAndUpdate({ _id: req.params.groupId }, req.body, { useFindAndModify: false },
         (err, result)=> {
            if (err){
                console.log(err);
                return res.status(400).json({ error: err })
            }    
            return res.status(200).json({ result })
        });
})

router.delete('/removeGroup/:groupId', (req, res) => {
    console.log("inside remove group backend");
    Group.deleteOne({ _id: req.params.groupId }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result });
    })
})


=======
const router = require('express').Router();
const Group = require("../models/Group.model");
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/');
        console.log('inside storage');
    },
    filename: (req, file, cb) => {
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

router.post('/createGroup/:userId', upload.single('img'), (req, res) => {
    console.log("Inside createGroup backend");
    // console.log(req.body.groupName);
    let group = new Group()
    group.members = [req.params.userId];
    group.admins = [req.params.userId];
    group.groupName = req.body.groupName;
    group.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.get('/getGroup/:groupId', (req, res) => {
    // console.log("Inside getgroup backend");
    Group.find({ _id: req.params.groupId })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json(err);
    })
})

router.put('/updateGroup/:groupId', upload.single('img') ,(req, res) => {
    console.log("Update group in backend");
    console.log(req.body);
    Group.findOneAndUpdate({ _id: req.params.groupId }, req.body, { useFindAndModify: false },
         (err, result)=> {
            if (err){
                console.log(err);
                return res.status(400).json({ error: err })
            }    
            return res.status(200).json({ result })
        });
})

router.delete('/removeGroup/:groupId', (req, res) => {
    console.log("inside remove group backend");
    Group.deleteOne({ _id: req.params.groupId }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: err })
        }
        return res.status(200).json({ result });
    })
})


>>>>>>> b2d3be2 (First commit)
module.exports = router;