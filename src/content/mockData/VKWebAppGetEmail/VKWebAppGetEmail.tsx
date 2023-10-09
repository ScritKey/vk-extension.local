import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";

const VKWebAppGetEmail = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppGetEmail");

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
    const { item } = await sendEvent("VKWebAppGetEmail", vk, isError ? "failed" : "result");

    removeComponent(vk.params.request_id);
  }


  if (!showModal) {
    return null;
  }

  return (
    <ModalPortal>
      <ModalCard>
        <div style={{ marginBottom: 16 }}>
          Запрос на получение email
        </div>
        <Button style={{ marginBottom: 16 }} onClick={() => clickSend(false)}>
          Получить
        </Button>
        <Button onClick={() => clickSend(true)} mode="secondary">
          Отмена
        </Button>
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppGetEmail;