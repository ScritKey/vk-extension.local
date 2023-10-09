import React, { useState } from "react";
import { Block, Button } from "../../UI";
import { useAppDispatch, useAppSelector } from "../../store/hook";

import './Device.scss';
import { DeviceIPhone } from "../../content/components/Device/DeviceIPhone";
import { DeviceAndroid } from "../../content/components/Device/DeviceAndroid";
import { updateDevice } from "../../store/sys/sysSlice";

export const Device = () => {
    const [active, setActive] = useState('iphone');

    const device = useAppSelector(state => state.sys.device);

    const dispatch = useAppDispatch();

    function sendSafeInset() {
        let nameComponent = undefined;

        if(active === "iphone") {
            chrome.tabs.sendMessage(
                chrome.devtools.inspectedWindow.tabId,
                {
                    typeMessage: 'setDevice',
                    nameComponent: "DeviceIPhone",
                    device: device
                }
            );

            nameComponent = "DeviceIPhone";
        }

        if(active === "android") {
            chrome.tabs.sendMessage(
                chrome.devtools.inspectedWindow.tabId,
                {
                    typeMessage: 'setDevice',
                    nameComponent: "DeviceAndroid",
                    device: device
                }
            );

            nameComponent = "DeviceAndroid";
        }

        dispatch(updateDevice({
            nameComponent: nameComponent
        }));
    }

    function removeDevice() {
        chrome.tabs.sendMessage(
            chrome.devtools.inspectedWindow.tabId,
            {
                typeMessage: 'setDevice',
                nameComponent: "",
                device: device
            }
        );

        dispatch(updateDevice({
            nameComponent: undefined
        }));
    }

    function clickItem(name: string) {
        setActive(name);
    }

    return (
        <div className="wrap-root-content deviceWrap">
            <Block style={{ width: 320, flexShrink: 0 }}
                   header={
                       <div>
                           Устройства
                       </div>
                   }
            >
                <div style={{margin: 8, padding: 6, borderRadius: 8, textAlign: "center", background: "#595959"}}>
                    Работает только с VKUI. Просто изменяет css токены
                </div>

                <div className="itemsWrap">
                    <div className={active === "iphone"? "itemWrap active" : "itemWrap"} onClick={() => clickItem("iphone")}>
                        iPhone
                        <div className="subTitle">
                            Челка
                        </div>
                    </div>
                    <div className={active === "android"? "itemWrap active" : "itemWrap"} onClick={() => clickItem("android")}>
                        Android
                        <div className="subTitle">
                            Цвет инфо-бара
                        </div>
                    </div>
                </div>
            </Block>

            <Block style={{ flexGrow: 1 }} header={
                <div>
                    Настройки девайса
                </div>
            }>
                <div>
                    <div className="viewContent">
                        <div className="deviceView">
                            {active === "iphone"? (
                                <DeviceIPhone deviceProps={device} styleRoot={{position: "absolute"}}/>
                            ) : (
                                <DeviceAndroid deviceProps={device} styleRoot={{position: "absolute"}}/>
                            )}

                            <div className="contentP">
                                <div>
                                    <Button onClick={sendSafeInset}>
                                        Вывести (показать)
                                    </Button>
                                    <div style={{height: 6}}/>
                                    <Button onClick={removeDevice}>
                                        Убрать (скрыть)
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Block>
        </div>
    )
}