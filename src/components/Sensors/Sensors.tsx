import React, { useState } from "react";
import { Block } from "../../UI";
import { AiOutlineSend } from "react-icons/ai";
import './Sensors.scss';

import VKWebAppAccelerometerStart from './VKWebAppAccelerometerStart';
import VKWebAppDeviceMotionStart from "./VKWebAppDeviceMotionStart";
import VKWebAppGyroscopeStart from "./VKWebAppGyroscopeStart";
import VKWebAppScrollTopStart from "./VKWebAppScrollTopStart";

const arrSensors = [
    {name: "Accelerometer", eventName: "VKWebAppAccelerometerStart", platforms: ["Android", "iOS"]},
    {name: "DeviceMotion", eventName: "VKWebAppDeviceMotionStart", platforms: ["Android", "iOS"]},
    {name: "Gyroscope", eventName: "VKWebAppGyroscopeStart", platforms: ["Android", "iOS"]},
    {name: "ScrollTop", eventName: "VKWebAppScrollTopStart", platforms: ["Web"]},
];

export const Sensors = () => {
    const [activeIdx, setActiveIdx] = useState(0);

    function sendSafeInset() {
        chrome.tabs.sendMessage(
            chrome.devtools.inspectedWindow.tabId,
            {
                typeMessage: 'setSafeInset'
            }
        );
    }

    function clickItem(idx: number) {
        setActiveIdx(idx);
    }

    function clickSend(event: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) {

    }

    function getComponent() {
        switch (arrSensors[activeIdx]['eventName']) {
            case 'VKWebAppAccelerometerStart':
                return <VKWebAppAccelerometerStart/>
            case 'VKWebAppDeviceMotionStart':
                return <VKWebAppDeviceMotionStart/>
            case 'VKWebAppGyroscopeStart':
                return <VKWebAppGyroscopeStart/>
            case 'VKWebAppScrollTopStart':
                return <VKWebAppScrollTopStart/>
            default:
                return <VKWebAppAccelerometerStart/>
        }
    }

    return (
        <div className="wrap-root-content sensors">
            <Block style={{ width: 320, flexShrink: 0 }}
                   header={
                       <div>
                           Сенсоры
                       </div>
                   }
            >
                <div className="itemsWrap">
                    {arrSensors.map((item: any, i: number) => {

                        let className = 'itemWrap';
                        if (i === activeIdx) {
                            className = 'itemWrap active';
                        }
                        return (
                            <div key={i} className={className} onClick={() => clickItem(i)}>
                                {/*<div className="iconSend" title='Отправить событие' onClick={(event) => clickSend(event, i)}>*/}
                                {/*    <AiOutlineSend size={22}/>*/}
                                {/*</div>*/}

                                <div className="platformsWrap">
                                    {item.platforms.map((platform: string) => {
                                        return (
                                            <div key={platform} className="platformItem">
                                                {platform}
                                            </div>
                                        );
                                    })}
                                </div>
                                {item.name}
                                <div className="subTitle">
                                    {item.eventName}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Block>

            <Block style={{ flexGrow: 1 }} header={<div>Редактор датчиков</div>}>
                <div className="viewWrap">
                    <div className="viewContent">
                        {getComponent()}
                    </div>
                </div>
            </Block>
        </div>
    )
}