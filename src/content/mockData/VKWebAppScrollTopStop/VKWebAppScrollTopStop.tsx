import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppScrollTopStop = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    // const dispatch = useAppDispatch();

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppScrollTopStop");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppScrollTopStop", vk);

                // именно VKWebAppScrollTopStart нужно передавать
                const sensor = {
                    name: "VKWebAppScrollTopStart",
                    sensorStop: true
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

export default VKWebAppScrollTopStop;