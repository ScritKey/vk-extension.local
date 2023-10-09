import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppDeviceMotionStop = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    // const dispatch = useAppDispatch();

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppDeviceMotionStop");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppDeviceMotionStop", vk);

                // именно VKWebAppDeviceMotionStart нужно передавать
                const sensor = {
                    name: "VKWebAppDeviceMotionStart",
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

export default VKWebAppDeviceMotionStop;