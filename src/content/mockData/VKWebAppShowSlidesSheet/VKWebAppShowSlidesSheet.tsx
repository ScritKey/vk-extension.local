import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";

const VKWebAppShowSlidesSheet = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppShowSlidesSheet");

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
    const { item } = await sendEvent("VKWebAppShowSlidesSheet", vk, isError ? "failed" : "result");

    removeComponent(vk.params.request_id);
  }


  if (!showModal) {
    return null;
  }

  return (
    <ModalPortal>
      <ModalCard logo
                 subTitle="Тут типа слайдер запустился"
                 buttonsWrap={
                   <>
                     <Button style={{ marginRight: 16 }} onClick={() => clickSend(false)}>
                       Готово
                     </Button>
                     <Button mode="secondary" onClick={() => clickSend(true)}>
                       Пропустить
                     </Button>
                   </>
                 }
                 onClose={() => clickSend(true)}
      >
        Слайдер типа
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppShowSlidesSheet;