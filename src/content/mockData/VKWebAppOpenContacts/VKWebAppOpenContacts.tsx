import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from "../../../helpers/getSettingsEvent";
import sendEvent from "../../../helpers/sendEvent";
import {ModalPortal } from "../../../UI";

import classes from "./Modal.module.scss";
import { IList } from "../../../store/listEvents/listEventsSlice";
import { Avatar, Cell } from "@vkontakte/vkui";
import { Icon48CancelOutline } from "@vkontakte/icons";
import sendLifeEvent from "../../../helpers/sendLifeEvent";

const VKWebAppOpenContacts = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState<IList>();

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppOpenContacts");

      setItem(item);

      timer.current = setTimeout(() => {
        if (item.isError) {
          sendEvent("VKWebAppOpenContacts", vk, "failed");
          return;
        }

        sendLifeEvent("VKWebAppViewHide", false);

        setShowModal(true);
      }, item.delay);
    }

    run();

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function clickItem(idx: number) {
    sendLifeEvent("VKWebAppViewRestore", false);
    sendLifeEvent("VKWebAppUpdateConfig", false);

    let addPropsStory = {
      moreEvents: ["VKWebAppViewHide", "VKWebAppViewRestore", "VKWebAppUpdateConfig"]
    };

    if(item && item.data.contacts && item.data.contacts[idx]) {
      sendEvent("VKWebAppOpenContacts", vk, "done", item.data.contacts[idx], addPropsStory);
    } else {
      sendEvent("VKWebAppOpenContacts", vk, "failed", null, addPropsStory);
    }

    removeComponent(vk.params.request_id);
  }

  function close() {
    sendLifeEvent("VKWebAppViewRestore", false);
    sendLifeEvent("VKWebAppUpdateConfig", false);

    let addPropsStory = {
      moreEvents: ["VKWebAppViewHide", "VKWebAppViewRestore", "VKWebAppUpdateConfig"]
    };

    sendEvent("VKWebAppOpenContacts", vk, "closed", {}, addPropsStory);

    removeComponent(vk.params.request_id);
  }


  if (!showModal) {
    return (
      <ModalPortal loading={true} />
    );
  }

  return (
    <ModalPortal>
      <div className={classes.wrap}>
        <div className={classes.close} onClick={close}>
          <Icon48CancelOutline />
        </div>

        <div className={classes.content}>
          {item && item.data.contacts? item.data.contacts.map((e: any, i: number) => {
            return (
              <Cell key={i}
                    before={<Avatar size={40} />}
                    subtitle={e.phone}
                    style={{ padding: "7px 0" }}
                    onClick={() => clickItem(i)}
              >
                {e.first_name + " " + e.last_name}
              </Cell>
            );
          }) : null}
        </div>
      </div>
    </ModalPortal>
  );
};

export default VKWebAppOpenContacts;