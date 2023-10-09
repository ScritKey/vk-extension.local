import React, { useEffect, useRef, useState } from 'react';
import getSettingsEvent from '../../../helpers/getSettingsEvent';
import sendEvent from '../../../helpers/sendEvent';
import {Modal, ModalCard, ModalPortal } from "../../../UI";

import classes from './Modal.module.scss';
import { IList } from "../../../store/listEvents/listEventsSlice";
import { Avatar, ButtonGroup, Cell, Button } from "@vkontakte/vkui";
import { Icon16DoneCircle } from "@vkontakte/icons";

const VKWebAppGetFriends = ({ vk, removeComponent }: any) => {
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState<IList>();
    const [taken, setTaken] = useState<{[key: number | string]: boolean}>({});

    const timer = useRef(null);

    useEffect(() => {
        async function run() {
            const item = await getSettingsEvent("VKWebAppGetFriends");

            setItem(item);

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
        let users: any[] = [];
        item.data.users.forEach((e: any, i: number) => {
            if(taken[i]) {
                users.push(e);
            }
        });

        sendEvent("VKWebAppGetFriends", vk, isError? "failed" : "result", {users: users});

        removeComponent(vk.params.request_id);
    }

    function clickItem(idx: number) {
        let a = {...taken};
        if(a[idx]) {
            delete a[idx];
        } else {
            a[idx] = true;
        }

        setTaken(a);
    }


    if (!showModal) {
        return (
            <ModalPortal loading={true}/>
        );
    }

    return (
        <ModalPortal>
            <div className={classes.wrap}>
                {item && item.data.users? item.data.users.map((e: any, i: number) => {
                    return (
                      <Cell key={i}
                            before={<Avatar src={e.photo_200} size={40}/>}
                            after={taken[i]? <Icon16DoneCircle/> : null}
                            style={{padding: "7px 0"}}
                            onClick={() => clickItem(i)}
                      >
                          {e.first_name + " " + e.last_name}
                      </Cell>
                    );
                }) : null}

                <ButtonGroup mode="horizontal" style={{width: "100%", textAlign: "center", justifyContent: "flex-end"}}>
                    <Button mode="secondary" onClick={() => clickSend(true)}>
                        Отмена
                    </Button>
                    <Button onClick={() => clickSend(false)}>
                        Готово
                    </Button>
                </ButtonGroup>
            </div>
        </ModalPortal>
    );
};

export default VKWebAppGetFriends;