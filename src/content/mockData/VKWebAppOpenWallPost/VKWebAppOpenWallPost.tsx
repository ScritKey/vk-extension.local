import React, { useEffect, useRef } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';

const VKWebAppOpenWallPost = ({ vk, removeComponent }: any) => {
  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppOpenWallPost");

      timer.current = setTimeout(() => {
        sendEvent("VKWebAppOpenWallPost", vk);

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

export default VKWebAppOpenWallPost;