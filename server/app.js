const express = require('express');
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require('./config/db');

// MIDDLEWARE
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24 * 1000
      },
    })
  );



// ROUTES
app.use(require('./routes/auth'));
app.use(require('./routes/links'));


const port = process.env.port || 3040;


app.listen(port, () => {
    console.log("Running server", port);
});


