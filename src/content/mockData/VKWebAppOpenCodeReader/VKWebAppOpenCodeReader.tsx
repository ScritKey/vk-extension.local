import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppOpenCodeReader = ({ vk, removeComponent }: any) => {
  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppOpenCodeReader");

      timer.current = setTimeout(() => {
        sendEvent("VKWebAppOpenCodeReader", vk);

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

export default VKWebAppOpenCodeReader;