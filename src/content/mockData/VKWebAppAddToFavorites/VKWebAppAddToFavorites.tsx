import React, { useEffect, useRef, useState } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from '../../../UI';

const VKWebAppAddToFavorites = ({ vk, removeComponent }: any) => {
    const [showModal, setShowModal] = useState(false);

    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppAddToFavorites");

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
        sendEvent("VKWebAppAddToFavorites", vk, isError? "failed" : "result");

        removeComponent(vk.params.request_id);
    }

    if (!showModal) {
        return null;
    }

    return (
        <ModalPortal>
            <ModalCard buttonsWrap={
                <>
                    <Button style={{ marginRight: 16 }} mode="secondary" onClick={() => clickSend(true)}>
                        Запретить
                    </Button>
                    <Button onClick={() => clickSend(false)}>
                        Добавить
                    </Button>
                </>
            }
                logo={true}
                subTitle="Приложение предлагает вам добавить его в избранное"
            >
                Добавить приложение в избранное?
            </ModalCard>
        </ModalPortal>
    );
};

export default VKWebAppAddToFavorites;