const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
User = require('./api/models/userModel')
Cast = require('./api/models/castModel')
Movie = require('./api/models/movieModel')
Award = require('./api/models/movieModel')
const bodyParser = require('body-parser');
//app.get('/', (req, res) => res.send('Hello World! '));
//app.listen(port, () => console.log('Example app listening on port '+port));

// MongoDB URI building
var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "MovieWebDb";
var mongoDBURI = "mongodb://" + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;

mongoose.set('useCreateIndex', true); //removes a deprecation warning
mongoose.connect(mongoDBURI, {
    //reconnectTries: 10,
    //reconnectInterval: 500,
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routesUsers = require('./api/routes/userRoutes');
var routesCast = require('./api/routes/castRoutes');
var routesMovies = require('./api/routes/movieRoutes');
var routesAwards = require('./api/routes/awardRoutes');

routesUsers(app);
routesCast(app);
routesMovies(app);
routesAwards(app);

console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
    app.listen(port, function () {
        console.log('MovieWebDb RESTful API server started on the port number: ' + port);
    });
});

mongoose.connection.on("error", function (err, conn) {
    console.error("DB init error " + err);
});