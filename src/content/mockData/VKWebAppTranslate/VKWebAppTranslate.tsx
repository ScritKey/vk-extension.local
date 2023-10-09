import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppTranslate = ({ vk, removeComponent }: any) => {
  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppTranslate");

      timer.current = setTimeout(() => {
        sendEvent("VKWebAppTranslate", vk);

        removeComponent(vk.params.request_id);
      }, item.delay);
    }

    run();

    return () => {
      clearTimeout(timer.current);
    }
  }, []);

  return (<></>);
};

export default VKWebAppTranslate;