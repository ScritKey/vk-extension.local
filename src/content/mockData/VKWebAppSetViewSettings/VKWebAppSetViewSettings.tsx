import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppSetViewSettings = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppSetViewSettings");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppSetViewSettings", vk);

                const d = {
                    status_bar_style: vk.params.status_bar_style,
                    action_bar_color: vk.params.action_bar_color,
                    deviceChange: true
                };
                chrome.runtime.sendMessage(d);
    
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

export default VKWebAppSetViewSettings;