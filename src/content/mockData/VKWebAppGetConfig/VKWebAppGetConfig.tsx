import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppGetConfig = ({ vk, removeComponent }: any) => {
  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppGetConfig");

      timer.current = setTimeout(() => {
        sendEvent("VKWebAppGetConfig", vk);

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

export default VKWebAppGetConfig;