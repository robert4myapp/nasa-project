const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
//MONGO_URL = "mongodb+srv://nasa-api:8rnaqwD2gp7Mt3bR@nasa-project.r8yey5p.mongodb.net/nasa?retryWrites=true&w=majority"
mongoose.connection.once('open', ()=> {
    console.log('MongoDB Connection Ready')
});
mongoose.connection.on('error', (e) =>{
    console.error('mongoose error ' + e);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL, {
        useNewURLParser: true,
        //useFindAndModify: false,
        //useCreateIndex: true,
        useUnifiedTopology: true
    });
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports = {mongoConnect, mongoDisconnect}