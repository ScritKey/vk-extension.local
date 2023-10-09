import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppGyroscopeStop = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    // const dispatch = useAppDispatch();

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppGyroscopeStop");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppGyroscopeStop", vk);

                const sensor = {
                    name: "VKWebAppGyroscopeStart",
                    refresh_rate: vk.params.refresh_rate || 1000,
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

export default VKWebAppGyroscopeStop;