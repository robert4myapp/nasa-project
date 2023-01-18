const http = require('http');
require('dotenv').config();
const app = require('./app');
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const {loadPlanetsData} = require('./models/planets.model');
const {mongoConnect} = require("./services/mongo");
const {loadLaunchData} = require('./models/launches.model');

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    server.listen(PORT, () => {
        console.log(`Server Listing on port: ${PORT}`);
    });
    console.log('All planets should be loaded');
}

startServer();


