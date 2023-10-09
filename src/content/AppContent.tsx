import React, { useEffect, useRef, useState } from 'react';
import m from './mockData/';
import { DeviceIPhone } from "./components/Device/DeviceIPhone";
import { DeviceAndroid } from "./components/Device/DeviceAndroid";
import { IDevice } from "../store/sys/sysSlice";

const AppContent = () => {
    const [s, setS] = useState(true);
    const [d, setD] = useState<any>({});

    const [subComponent, setSubComponent] = useState<any>();
    const [deviceProps, setDeviceProps] = useState<IDevice>();

    const componentsRef = useRef<any>({});

    useEffect(() => {
        /**
         * Принимает сообщение от ВК
         * Проверяет, что это именно от ВК
         * Устанавливет propsComponent, создает динамический компонет, на основе вызвоннго события
         * например VKWebAppGetFriends, будет создан компонет именно VKWebAppGetFriends
         */
        function createComponents(event: MessageEvent<any>) {
            // if(!(window as any).startVK) {
            //     return;
            // }

            // let lol = window.ids.find((e: number) => e === chrome.devtools.inspectedWindow.tabId);
            // console.log(lol);

            if ((window as any).extensionEnable && event.data && event.data.params && event.data.params.request_id && event.data.handler) {
                if ((m as any)[event.data.handler]) {
                    const allComponents = {...componentsRef.current};

                    allComponents["vk" + event.data.params.request_id] = {
                        componentName: event.data.handler,
                        props: {
                            vk: {...event.data}
                        }
                    };

                    componentsRef.current = allComponents;

                    // setS((s) => !s);
                    setD({...allComponents})
                }
            }
        }

        window.addEventListener("message", createComponents, false);

        return () => {
            window.removeEventListener("message", createComponents, false);
        }

    }, []);
    
    useEffect(() => {
        chrome.runtime.onMessage.addListener(({ detail, addHistory, typeMessage, ...resProps }, sender, sendResponse) => {
            if(typeMessage === "setDevice") {
                let d = document.documentElement.style;

                if(resProps.nameComponent === "DeviceIPhone") {
                    d.setProperty('--vkui_internal--safe_area_inset_top', `${resProps.device.safeTop}px`);
                    d.setProperty('--vkui_internal--safe_area_inset_bottom', `${resProps.device.safeBottom}px`);
                } else {
                    d.removeProperty('--vkui_internal--safe_area_inset_top');
                    d.removeProperty('--vkui_internal--safe_area_inset_bottom');
                }
                setSubComponent(resProps.nameComponent);
                setDeviceProps(resProps.device);

                return;
            }

            if (typeMessage === "sensorOnlyChange") {
                // console.log(detail, addHistory, typeMessage, 555);
                window.postMessage(detail, "*");
                return;
            }

            if (typeMessage !== "imSender") {
                // sendResponse(true);
                return;
            }

            setTimeout(() => {
                // console.log(detail, addHistory, typeMessage, 9999);

                window.postMessage(detail, "*");

                chrome.runtime.sendMessage(addHistory);
            }, 1);

            // sendResponse(true);
            // return true;
        });
    }, []);

    function removeComponent(request_id: any) {
        const allComponents = {...componentsRef.current};

        if (allComponents["vk" + request_id]) {
            delete allComponents["vk" + request_id];
        }
        componentsRef.current = allComponents;

        // setS((s) => !s);
        setD({...allComponents})
    }


    function getSubComponent() {
        switch (subComponent) {
            case 'DeviceIPhone':
                return <DeviceIPhone deviceProps={deviceProps}/>;
            case 'DeviceAndroid':
                return <DeviceAndroid deviceProps={deviceProps}/>;
            default:
                return null;
        }
    }

    return (
      <>
            {Object.keys(d).map((keyName: any) => {
                let Component = (m as any)[d[keyName].componentName];

                return <Component
                    key={d[keyName].props.vk.params.request_id}
                    {...d[keyName].props}
                    removeComponent={removeComponent} />
            })}

          {subComponent? (
              getSubComponent()
          ) : null}
      </>
    );
}

export default AppContent;