import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";

const VKWebAppJoinGroup = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppJoinGroup");

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
    const { item } = await sendEvent("VKWebAppJoinGroup", vk, isError ? "failed" : "result");

    removeComponent(vk.params.request_id);
  }


  if (!showModal) {
    return null;
  }

  return (
    <ModalPortal>
      <ModalCard logo
                 subTitle="Приложение предлагает вам подписаться на сообщества."
                 buttonsWrap={
                   <Button style={{ marginBottom: 16 }} onClick={() => clickSend(false)}>
                     Подписаться
                   </Button>
                 }
                 onClose={() => clickSend(true)}
      >
        Сообщество
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppJoinGroup;