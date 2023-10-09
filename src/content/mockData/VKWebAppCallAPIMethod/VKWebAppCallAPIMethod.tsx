import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppCallAPIMethod = ({ vk, removeComponent }: any) => {
    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppCallAPIMethod");

            let delay = 20;
            if(item.data && item.data[vk.params.method]) {
                delay = item.data[vk.params.method].delay;
            }

            timer.current = setTimeout(() => {
                if(item.data && item.data[vk.params.method]) {
                    let isError = false;
                    if(item.data[vk.params.method]['isError']) {
                        isError = true;
                    }

                    const type = isError ? `VKWebAppCallAPIMethodFailed` : `VKWebAppCallAPIMethodResult`;
                    let ret: any = {
                        ...item.data[vk.params.method]['data']
                    }
                    if(isError) {
                        ret = {
                            error: {
                                ...item.data[vk.params.method]['error']
                            }
                        }
                    }

                    const detail: any = {
                        type: type,
                        data: {
                            "request_id": vk.params.request_id,
                            ...ret
                        }
                    };
    
                    const addHistory = {
                        type: type,
                        data: {
                            ...ret
                        },
                        handler: vk.handler,
                        isError: isError
                    };
    
                    window.postMessage(detail, "*");
                    chrome.runtime.sendMessage(addHistory);
                }

                removeComponent(vk.params.request_id);
            }, delay);
        }

        run();

        return () => {
            clearTimeout(timer.current);
        }
    }, []);


    return (<></>);
};

export default VKWebAppCallAPIMethod;