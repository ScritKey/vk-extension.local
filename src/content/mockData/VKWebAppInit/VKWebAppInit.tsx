import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import sendLifeEvent from '../../../helpers/sendLifeEvent';

const VKWebAppInit = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppInit");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppInit", vk);

                sendLifeEvent('VKWebAppUpdateConfig');
    
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

export default VKWebAppInit;