const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const api = require('./routes/api');
const app = express();

//app.set('view engine', 'html');
app.use(cors({origin: 'http://localhost:3000'}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/v1',api);
//app.use('/v1', v2Router);



// app.get('/*', (req,res) =>{
//     res.send(path.join(__dirname, '..', 'public', 'index.html'));
// });
app.get('/*',function (req,res) {
    res.redirect('/');
});

module.exports = app;