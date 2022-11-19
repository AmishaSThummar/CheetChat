<<<<<<< HEAD
const express = require('express');
// use to enable to send data through HTTP request body
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const session = require('express-session');

const userRoute = require('./routes/user.route');
const conversationRoute = require('./routes/conversation.route');
const messageRoute = require('./routes/message.route');
const groupRoute = require('./routes/group.route');

mongoose.connect("mongodb://127.0.0.1:27017/cheetchat",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbCon = mongoose.connection;
// dbCon.on('error', console.error.bind(console, 'connection error:'));

dbCon.once('open',() => {console.log("Mongodb database connection created successfully.")}
);



const app = express();


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
// Make "public" Folder Publicly Available
app.use('/public', express.static('public'))
// API Route
app.use('/users', userRoute);
// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/conversations', conversationRoute);
app.use('/messages', messageRoute);
app.use('/groups', groupRoute);


const port = 5001;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'))
  })
})
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})


// app.use(session({ secret: 'ABC', resave: false, saveUninitialized: true, }));
// app.set("view engine", "ejs");

// app.listen(port, ()=>{
//     console.log(`Server is running on port: ${port}`);
// })
=======
const express = require('express');
// use to enable to send data through HTTP request body
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const session = require('express-session');

const userRoute = require('./routes/user.route');
const conversationRoute = require('./routes/conversation.route');
const messageRoute = require('./routes/message.route');
const groupRoute = require('./routes/group.route');

mongoose.connect("mongodb://127.0.0.1:27017/cheetchat",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dbCon = mongoose.connection;
// dbCon.on('error', console.error.bind(console, 'connection error:'));

dbCon.once('open',() => {console.log("Mongodb database connection created successfully.")}
);



const app = express();


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
// Make "public" Folder Publicly Available
app.use('/public', express.static('public'))
// API Route
app.use('/users', userRoute);
// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/conversations', conversationRoute);
app.use('/messages', messageRoute);
app.use('/groups', groupRoute);


const port = 5001;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'))
  })
})
app.use(function (err, req, res, next) {
  console.error(err.message)
  if (!err.statusCode) err.statusCode = 500
  res.status(err.statusCode).send(err.message)
})


// app.use(session({ secret: 'ABC', resave: false, saveUninitialized: true, }));
// app.set("view engine", "ejs");

// app.listen(port, ()=>{
//     console.log(`Server is running on port: ${port}`);
// })
>>>>>>> b2d3be2 (First commit)
