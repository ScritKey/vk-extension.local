import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";
import sendLifeEvent from "../../../helpers/sendLifeEvent";

const VKWebAppShowWallPostBox = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppShowWallPostBox");

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

    const { item } = await sendEvent("VKWebAppShowWallPostBox", vk, isError ? "failed" : "result", null, addPropsStory);

    removeComponent(vk.params.request_id);
  }


  if (!showModal) {
    return null;
  }

  return (
    <ModalPortal>
      <ModalCard>
        <div style={{ marginBottom: 16 }}>
          Тут типа пост на стену
        </div>
        <Button style={{ marginBottom: 16 }} onClick={() => clickSend(false)}>
          Опубликовать
        </Button>
        <Button onClick={() => clickSend(true)} mode="secondary">
          Отмена
        </Button>
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppShowWallPostBox;