const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', ()=> {
    console.log('MongoDB Connection Ready')
});
mongoose.connection.on('error', (e) =>{
    console.error('Mongoose error ' + e);
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