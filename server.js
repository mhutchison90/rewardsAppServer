// --IMPORTS--
require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , user_controller = require('./controllers/user_controller');


// --SETUP APP--
const app = express();
app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

// --MASSIVE--
massive(process.env.CONNECTION_STRING).then(db => {
    app.set('db', db);
})


// --ENDPOINTS--
app.get('/api/user/:id', user_controller.getUser);
app.put('/api/user/:id', user_controller.updateUser);

// --SETUP APP TO LISTEN TO PORT--
const PORT = 3050; // Development Port
// const PORT = 8088; // Deployment Port

app.listen(PORT, () => console.log(`Listening on ${PORT}`))