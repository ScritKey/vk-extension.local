import React, { useEffect, useRef, useState } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Modal, ModalPortal } from '../../../UI';

const VKWebAppAddToHomeScreen = ({ vk, removeComponent }: any) => {
    const [showModal, setShowModal] = useState(false);

    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppAddToHomeScreen");

            timer.current = setTimeout(() => {
                if (item.isError) {
                    clickSend(true);
                    return;
                }

                setShowModal(true);
            }, item.delay);
        }

        run();

        return () => {
            clearTimeout(timer.current);
        }
    }, []);

    async function clickSend(isError = false) {
        sendEvent("VKWebAppAddToHomeScreen", vk, isError? "failed" : "result");

        removeComponent(vk.params.request_id);
    }

    if (!showModal) {
        return null;
    }

    return (
        <>
            <ModalPortal>
                <Modal>
                    <div onClick={() => clickSend(false)}>
                        Добавить
                    </div>
                    <div onClick={() => clickSend(true)}>
                        Отмена
                    </div>
                </Modal>
            </ModalPortal>
        </>
    );
};

export default VKWebAppAddToHomeScreen;