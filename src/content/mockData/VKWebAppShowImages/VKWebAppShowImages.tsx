import React, { useEffect, useRef, useState } from "react";
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";

import classes from './Modal.module.scss';
import { Icon28ArrowLeftOutline, Icon28ArrowRightOutline, Icon48CancelOutline } from "@vkontakte/icons";
import sendLifeEvent from "../../../helpers/sendLifeEvent";

const VKWebAppShowImages = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [idx, setIdx] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppShowImages");

      if(vk && vk.params && vk.params.images) {
        setImages(vk.params.images);
      }
      if(vk && vk.params && vk.params.start_index) {
        setIdx(vk.params.start_index);
      }

      timer.current = setTimeout(() => {
        if (item.isError) {
          sendEvent("VKWebAppShowImages", vk, "failed");

          removeComponent(vk.params.request_id);
          return;
        }

        sendLifeEvent("VKWebAppViewHide", false);

        let addPropsStory = {
          moreEvents: ["VKWebAppViewHide", "VKWebAppViewRestore", "VKWebAppUpdateConfig"]
        };

        sendEvent("VKWebAppShowImages", vk, 'result', null, addPropsStory);

        setShowModal(true);
      }, item.delay);
    }

    run();

    return () => {
      clearTimeout(timer.current);
    }
  }, []);

  function getImageSrc() {
    if(images[idx]) {
      return images[idx];
    }
  }

  function clickLeft() {
    if(images[idx - 1]) {
      setIdx(idx - 1);
      return;
    }

    if(images[images.length - 1]) {
      setIdx(images.length - 1);
    }
  }

  function clickRight() {
    if(images[idx + 1]) {
      setIdx(idx + 1);
      return;
    }

    if(images[0]) {
      setIdx(0);
    }
  }

  function close() {
    sendLifeEvent("VKWebAppViewRestore", false);
    sendLifeEvent("VKWebAppUpdateConfig", false);

    removeComponent(vk.params.request_id);
  }



  if (!showModal) {
    return (
      <ModalPortal loading={true}/>
    );
  }



  return (
    <ModalPortal>
      <div className={classes.wrap}>
        <div className={classes.close} onClick={close}>
          <Icon48CancelOutline/>
        </div>

        <div className={classes.arrows + " " + classes.left} onClick={clickLeft}>
          <Icon28ArrowLeftOutline/>
        </div>
        <div className={classes.arrows + " " + classes.right} onClick={clickRight}>
          <Icon28ArrowRightOutline/>
        </div>

        <div className={classes.content}>
          {getImageSrc()? <img src={getImageSrc()} alt="dd"/> : null}
        </div>
      </div>
    </ModalPortal>
  );
};

export default VKWebAppShowImages;