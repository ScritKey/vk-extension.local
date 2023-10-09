import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppAccelerometerStop = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    // const dispatch = useAppDispatch();

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppAccelerometerStop");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppAccelerometerStop", vk);

                // именно VKWebAppAccelerometerStart нужно передавать
                const sensor = {
                    name: "VKWebAppAccelerometerStart",
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

export default VKWebAppAccelerometerStop;