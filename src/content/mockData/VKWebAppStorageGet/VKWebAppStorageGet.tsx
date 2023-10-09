import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppStorageGet = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppStorageGet");

            timer.current = setTimeout(() => {
                sendEvent("VKWebAppStorageGet", vk);
    
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

export default VKWebAppStorageGet;