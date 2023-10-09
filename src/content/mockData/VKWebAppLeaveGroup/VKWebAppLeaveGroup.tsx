import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";

const VKWebAppLeaveGroup = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppLeaveGroup");

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
    const { item } = await sendEvent("VKWebAppLeaveGroup", vk, isError ? "failed" : "result");

    removeComponent(vk.params.request_id);
  }


  if (!showModal) {
    return null;
  }

  return (
    <ModalPortal>
      <ModalCard logo
                 subTitle="Приложение предлагает вам отписаться от данного сообщества."
                 buttonsWrap={
                   <Button style={{ marginBottom: 16 }} onClick={() => clickSend(false)}>
                     Отписаться
                   </Button>
                 }
                 onClose={() => clickSend(true)}
      >
        Сообщество
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppLeaveGroup;