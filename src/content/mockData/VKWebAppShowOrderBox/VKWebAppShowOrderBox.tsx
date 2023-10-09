import React, { useEffect, useRef, useState } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";
import axios from "axios";
import { getRandomInt } from "../../../helpers/misc";


const md5 = require("blueimp-md5");


const VKWebAppShowOrderBox = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppShowOrderBox");

      timer.current = setTimeout(() => {
        if (item.isError) {
          clickSend(true);
          return;
        }


        const unordered: any = {
          'app_id': item.order.app_id,
          'item': vk.params.item, // vk.params.item
          'lang': 'ru',
          'notification_type': item.order.isTest? 'get_item_test' : 'get_item',
          'order_id': getRandomInt(1000, 999999),
          'receiver_id': item.order.user_id,
          'user_id': item.order.user_id,
        };

        let stringArr = "";
        const ordered = Object.keys(unordered).sort().reduce(
          (obj: any, key: any) => {
            obj[key] = unordered[key];
            stringArr += key + "=" + unordered[key];
            return obj;
          },
          {}
        );


        const formData = new FormData();

        Object.keys(unordered).map((key) => {
          formData.append(key, unordered[key]);
          return true;
        });

        formData.append("sig", md5(stringArr + item.order.api_secret));

        axios.post(item.order.url, formData).then(async (res) => {
          setShowModal(true);
        }).catch((e) => {
          console.log(e);
        });
      }, item.delay);
    }

    run();

    return () => {
      clearTimeout(timer.current);
    }
  }, []);

  async function clickSend(isError = false) {
    if(isError) {
      const {item} = await sendEvent("VKWebAppShowOrderBox", vk, isError? "failed" : "result");

      removeComponent(vk.params.request_id);

      return;
    }

    const item = await getSettingsEvent("VKWebAppShowOrderBox");

    const unordered: any = {
      'app_id': item.order.app_id,
      'date': 1111,
      'item': vk.params.item,
      'item_discount': "Тут типа описание",
      'item_id': getRandomInt(1000, 9999),
      'lang': 'ru',
      'status': 'chargeable',
      'notification_type': item.order.isTest? 'order_status_change_test' : 'order_status_change',
      'order_id': getRandomInt(1000, 9999999),
      'receiver_id': item.order.user_id,
      'user_id': item.order.user_id,
    };

    let stringArr = "";
    const ordered = Object.keys(unordered).sort().reduce(
      (obj: any, key: any) => {
        obj[key] = unordered[key];
        stringArr += key + "=" + unordered[key];
        return obj;
      },
      {}
    );


    const formData = new FormData();

    Object.keys(unordered).map((key) => {
      formData.append(key, unordered[key]);
      return true;
    });

    formData.append("sig", md5(stringArr + item.order.api_secret));

    axios.post(item.order.url, formData).then(async (res) => {
      const {item} = await sendEvent("VKWebAppShowOrderBox", vk, isError? "failed" : "result");
      removeComponent(vk.params.request_id);
    }).catch((e) => {
      removeComponent(vk.params.request_id);
    });
  }


  if (!showModal) {
    return null;
  }

  return (
    <ModalPortal>
      <ModalCard logo
                 subTitle="Тут типа идет покупка"
                 buttonsWrap={
                   <>
                     <Button style={{ marginRight: 16 }} onClick={() => clickSend(false)}>
                       Купить
                     </Button>
                     <Button mode="secondary" onClick={() => clickSend(true)}>
                       Отменить
                     </Button>
                   </>
                 }
                 onClose={() => clickSend(true)}
      >
        Тут должен происходить платеж
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppShowOrderBox;