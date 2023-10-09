import React, { useEffect, useRef, useState } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import { Button, ModalCard, ModalPortal } from "../../../UI";
import axios from "axios";
import { getRandomInt } from "../../../helpers/misc";


const md5 = require("blueimp-md5");


const VKWebAppShowSubscriptionBox = ({ vk, removeComponent }: any) => {
  const [showModal, setShowModal] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    async function run() {
      const item = await getSettingsEvent("VKWebAppShowSubscriptionBox");

      timer.current = setTimeout(() => {
        if (item.isError) {
          clickSend(true);
          return;
        }

        const unordered: any = {
          'app_id': item.order.app_id,
          'item': "d", // vk.params.item
          'lang': 'ru',
          'notification_type': item.order.isTest? 'get_subscription_test' : 'get_subscription',
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
          console.log(res);
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
      const {item} = await sendEvent("VKWebAppShowSubscriptionBox", vk, isError? "failed" : "result");

      removeComponent(vk.params.request_id);

      return;
    }

    const item = await getSettingsEvent("VKWebAppShowSubscriptionBox");

    const unordered: any = {
      'app_id': item.order.app_id,
      'cancel_reason': item.order.cancel_reason,
      'item_id': vk.params.item,
      'item_price': vk.params.price,
      'notification_type': item.order.isTest? 'subscription_status_change_test' : 'subscription_status_change',
      'status': item.order.status,
      'next_bill_time': item.order.next_bill_time,
      'pending_cancel': item.order.pending_cancel,
      'subscription_id': item.order.subscription_id,
      'user_id': item.order.user_id,
      // 'lang': 'ru',
      // 'date': 1111,
      // 'item_discount': "Тут типа описание",
      // 'order_id': getRandomInt(1000, 9999999),
      // 'receiver_id': item.order.user_id,
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
      const {item} = await sendEvent("VKWebAppShowSubscriptionBox", vk, isError? "failed" : "result");
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
                 subTitle="Тут типа идет покупка подписки"
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
        Тут должна происходить подписка
      </ModalCard>
    </ModalPortal>
  );
};

export default VKWebAppShowSubscriptionBox;