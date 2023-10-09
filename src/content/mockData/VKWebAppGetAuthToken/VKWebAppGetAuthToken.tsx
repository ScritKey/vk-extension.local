import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";

const VKWebAppGetAuthToken = ({ vk, removeComponent }: any) => {
    const [showModal, setShowModal] = useState(false);

    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppGetAuthToken");

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
        sendEvent("VKWebAppGetAuthToken", vk, isError? "failed" : "result");

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
                        Отменить
                    </Button>
                    <Button onClick={() => clickSend(false)}>
                        Выдать
                    </Button>
                </>
            }
                       subTitle="Будет выдан токен"
            >
                Выдать токен иле нет
            </ModalCard>
        </ModalPortal>
    );
};

export default VKWebAppGetAuthToken;