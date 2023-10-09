import React, { useLayoutEffect, useState } from "react";
import { historyEventsAdd } from '../../store/historyEvents/historyEventsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { listEventsUpdate, listEventsUpdateActive } from '../../store/listEvents/listEventsSlice';
import { sysUpdate, updateScrolls } from "../../store/sys/sysSlice";
import './BridgeMethods.scss';

import {MdKeyboardArrowDown, MdKeyboardArrowUp} from 'react-icons/md';
import { getNameWithPrefix } from "../../helpers/getNameWithPrefix";
import { Icon24Search } from "@vkontakte/icons";

export interface BridgeMethodsProps extends React.ImgHTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
}

const BridgeMethods = ({ children }: BridgeMethodsProps) => {
    const [search, setSearch] = useState("");

    const listEvents = useAppSelector(state => state.listEvents.list);

    const dispatch = useAppDispatch();

    function bgFun(idx: number) {
        // getEvent('VKWebAppGetFriends').then((e) => {
        //     console.log(e);
        // }); 

        dispatch(listEventsUpdateActive(idx));
        dispatch(sysUpdate({
            route: "edit"
        }));
    }

    function sendEventResult(item: any) {
        let type = getNameWithPrefix(item.nameEvent)[0];

        const detail: any = {
            type: type,
            data: {
                ...item.data
            }
        };

        const addHistory = {
            type: type,
            data: {
                ...item.data
            },
            handler: item.nameEvent,
            imSender: true,
        };

        // Отправляет в content_scripts
        if (process.env.NODE_ENV === "production") {
            chrome.tabs.sendMessage(
                chrome.devtools.inspectedWindow.tabId,
                {
                    detail,
                    addHistory,
                    typeMessage: 'imSender'
                }
            );

            return;
        }

        // TODO Это только для проверок
        // Нужно будет удалить
        dispatch(historyEventsAdd(addHistory));
    }

    function sendEventFailed(item: any) {
        let type = getNameWithPrefix(item.nameEvent)[1];

        const detail: any = {
            type: type,
            data: {
                ...item.error
            }
        };

        const addHistory = {
            type: type,
            data: {
                ...item.error
            },
            handler: item.nameEvent,
            imSender: true,
            isError: true,
        };

        if (process.env.NODE_ENV === "production") {
            chrome.tabs.sendMessage(
                chrome.devtools.inspectedWindow.tabId,
                {
                    detail,
                    addHistory,
                    typeMessage: 'imSender'
                }
            );

            return;
        }

        // TODO Это только для проверок
        // Нужно будет удалить
        dispatch(historyEventsAdd(addHistory));
    }

    function sendEventSub(item: any, subItem: any) {
        const detail: any = {
            type: subItem.subNameEvent,
            data: {
                ...subItem.data
            }
        };

        const addHistory = {
            type: subItem.subNameEvent,
            data: {
                ...subItem.data
            },
            handler: item.nameEvent,
            imSender: true,
            isError: subItem.isError
        };

        if (process.env.NODE_ENV === "production") {
            chrome.tabs.sendMessage(
                chrome.devtools.inspectedWindow.tabId,
                {
                    detail,
                    addHistory,
                    typeMessage: 'imSender'
                }
            );

            return;
        }

        // TODO Это только для проверок
        // Нужно будет удалить
        dispatch(historyEventsAdd(addHistory));
    }

    function toggleShowHide(idx: number) {
        const arr = [...listEvents];

        arr[idx] = {
            ...arr[idx],
            isOpen: arr[idx]['isOpen'] ? false : true
        };

        dispatch(listEventsUpdate({
            list: arr
        }));
    }


    let resultsList = !search
        ? listEvents
        : listEvents.filter(item =>
            item.nameEvent.toLowerCase().includes(search.toLocaleLowerCase())
        );

    return (
        <div className="bridgeMethods">
            <div className="searchWrap">
                <input className="inputSearch" placeholder="Поиск события" type="text" onChange={(e) => setSearch(e.target.value)}/>
                <div className="iconSearch">
                    <Icon24Search/>
                </div>
            </div>

            <div className="itemsWrap">
                {resultsList.map((e) => {
                    return (
                        <div key={e.nameEvent} className="itemWrap" style={e.isError ? { color: "#df3131" } : {}}>
                            <div className="platformsWrap">
                                {e.platforms.map((platform) => {
                                    return (
                                        <div key={platform} className="platformItem">
                                            {platform}
                                        </div>
                                    );
                                })}
                            </div>
                            <div>
                                <div style={{paddingRight: 30, wordBreak: "break-word"}} onClick={() => bgFun(e.idx)}>
                                    {e.nameEvent}
                                    {e.isError ? (
                                        <div style={{ fontSize: 10 }}>
                                            Событие вернет ошибку
                                        </div>
                                    ) : null}
                                </div>

                                {e.isOpen ? (
                                    <div>
                                        <div className='sendItem' onClick={() => sendEventResult(e)}>
                                            {getNameWithPrefix(e.nameEvent)[0]}
                                        </div>
                                        <div className='sendItem' onClick={() => sendEventFailed(e)}>
                                            {getNameWithPrefix(e.nameEvent)[1]}
                                        </div>
                                        {e.subEvents ? (
                                            e.subEvents.map((s: any) => {
                                                return (
                                                    <div key={s.subNameEvent} className='sendItem' onClick={() => sendEventSub(e, s)}>
                                                        {s.subNameEvent}
                                                    </div>
                                                );
                                            })
                                        ) : null}
                                    </div>
                                ) : null}
                            </div>

                            <div className='iconOpen' onClick={() => toggleShowHide(e.idx)}>
                                {e.isOpen? <MdKeyboardArrowUp size={24}/> : <MdKeyboardArrowDown size={24}/>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BridgeMethods;