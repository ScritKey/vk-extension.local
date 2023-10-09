import React, { useEffect, useRef, useState } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from '../../../UI';
import sendLifeEvent from "../../../helpers/sendLifeEvent";

const VKWebAppShowStoryBox = ({ vk, removeComponent }: any) => {
    const [showModal, setShowModal] = useState(false);

    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppShowStoryBox");

            timer.current = setTimeout(() => {
                if (item.isError) {
                    clickSend(true);
                    return;
                }

                sendLifeEvent("VKWebAppViewHide", false);
                
                setShowModal(true);
            }, item.delay);
        }

        run();

        return () => {
            clearTimeout(timer.current);
        }
    }, []);

    async function clickSend(isError = false) {
        sendLifeEvent("VKWebAppViewRestore", false);
        sendLifeEvent("VKWebAppUpdateConfig", false);

        let addPropsStory = {
            moreEvents: ["VKWebAppViewHide", "VKWebAppViewRestore", "VKWebAppUpdateConfig"]
        };

        const {item} = await sendEvent("VKWebAppShowStoryBox", vk, isError? "failed" : "result", null, addPropsStory);

        let remove = true;
        if (!isError && item.subEvents && item.subEvents.length) {
            const subItem = item.subEvents[item.defaultSubEvent];

            let delay = subItem.delay || 0;
            if (subItem.data) {
                setTimeout(() => {
                    const detail: any = {
                        type: subItem.subNameEvent,
                        data: {
                            ...subItem.data
                        }
                    };

                    const addHistory = {
                        type: subItem.subNameEvent,
                        data: {
                            ...subItem.data
                        },
                        handler: vk.handler,
                        isError: subItem.isError
                    };

                    window.postMessage(detail, "*");

                    chrome.runtime.sendMessage(addHistory);

                    removeComponent(vk.params.request_id);
                }, delay);
            }

            remove = false;
        }

        if (remove) {
            removeComponent(vk.params.request_id);
        } else {
            setShowModal(false);
        }
    }


    if (!showModal) {
        return null;
    }

    return (
        <ModalPortal>
            <ModalCard subTitle="Кнопки просто отправят событие"
                       buttonsWrap={
                           <>
                               <Button style={{ marginRight: 16 }} onClick={() => clickSend(false)}>
                                   Опубликовать
                               </Button>
                               <Button mode="secondary" onClick={() => clickSend(true)}>
                                   Отменить
                               </Button>
                           </>
                       }
                       onClose={() => clickSend(true)}
            >
                Тут типа создание истории
            </ModalCard>
        </ModalPortal>
    );
};

export default VKWebAppShowStoryBox;