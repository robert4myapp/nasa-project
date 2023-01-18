const {getAllLaunches, scheduleNewLaunch, existsLaunchWithID, abortLaunchById} = require('../../models/launches.model');
const {getPagination} = require('../../services/query');
async function httpGetAllLaunches(req, res) {
    console.log(req.query);
    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip,limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {
        return res.status(400).json({
            error: 'Missing Data Field'
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    console.log('new launch date is ' + launch.launchDate);
    let now = new Date();
    if (!launch.launchDate >= now || isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid Launch Date',

        });
    }
    await scheduleNewLaunch(launch);
    res.status(201).json(launch);
}
async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithID(launchId);
    console.log('TRYING TO ABORT LAUNCH FOR ' + launchId);

    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }

    const aborted = await abortLaunchById(launchId);
    if (!aborted){
        return res.status(400).json({
            error: 'Launch Not Aborted',
        });
    }else {
        return res.status(200).json({
            ok: true
        });
    }
}

module.exports = {httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch};