import {useCallback, useEffect, useState} from "react";

import {httpAbortLaunch, httpGetLaunches, httpSubmitLaunch,} from './requests';

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
    console.log("uselaunches uselaunches called");
    const [launches, saveLaunches] = useState([]);
    const [isPendingLaunch, setPendingLaunch] = useState(false);

    const getLaunches = useCallback(async () => {
        console.log('----use launchees useCallBack Called!!');
        const fetchedLaunches = await httpGetLaunches();
        console.log('use launches has completed fetched launches ');
        saveLaunches(fetchedLaunches);
    }, []);

    useEffect(() => {
        getLaunches();
    }, [getLaunches]);

    const submitLaunch = useCallback(async (e) => {
        console.log("uselaunches submitlanch called");
        e.preventDefault();
        setPendingLaunch(true);
        const data = new FormData(e.target);
        console.log("usecallback data SHOWS " + JSON.stringify(data));
        console.log("usecallback data SHOWS " + data);
        const launchDate = new Date(data.get("launch-day"));
        const mission = data.get("mission-name");
        const rocket = data.get("rocket-name");
        const target = data.get("planets-selector");
        const response = await httpSubmitLaunch({
            launchDate,
            mission,
            rocket,
            target,
        });
        console.log('use launches response was ' + JSON.stringify(response));
        // TODO: Set success based on response.
        const success = response.ok;
        if (success) {
            getLaunches();
            setTimeout(() => {
                setPendingLaunch(false);
                onSuccessSound();
            }, 800);
        } else {
            onFailureSound();
        }
    }, [getLaunches, onSuccessSound, onFailureSound]);

    const abortLaunch = useCallback(async (id) => {
        const response = await httpAbortLaunch(id);

        // TODO: Set success based on response.
        const success = response.ok;
        if (success) {
            console.log('uselaunches abort success true');
            getLaunches();
            onAbortSound();
        } else {
            console.log('uselaunches abort success false');
            onFailureSound();
        }
    }, [getLaunches, onAbortSound, onFailureSound]);

    return {
        launches,
        isPendingLaunch,
        submitLaunch,
        abortLaunch,
    };
}

export default useLaunches;