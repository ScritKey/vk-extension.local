import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppScrollTopStart = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    // const dispatch = useAppDispatch();

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppScrollTopStart");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppScrollTopStart", vk);

                const sensor = {
                    name: "VKWebAppScrollTopStart",
                    refresh_rate: 1000,
                    sensorActive: true
                };
                chrome.runtime.sendMessage(sensor);
    
                removeComponent(vk.params.request_id);
            }, item.delay);
        }

        run();

        return () => {
            clearTimeout(timer.current);
        }
    }, []);


    return (<></>);
};

export default VKWebAppScrollTopStart;