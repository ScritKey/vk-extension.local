import React, { useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

import defSettings from '../content/mockData/defSettings';
import allNamesEvents from '../helpers/allNamesEvents';
import Main from '../components/Main/Main';
import Edit from '../components/Edit/Edit';
import Lifecycle from '../components/Lifecycle/Lifecycle';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { listEventsUpdate } from '../store/listEvents/listEventsSlice';
import { historyEventsAdd } from '../store/historyEvents/historyEventsSlice';
import LaunchParams from '../components/LaunchParams/LaunchParams';
import { Device } from "../components/Device/Device";
import { Sensors } from "../components/Sensors/Sensors";
import { addSensor, removeSensor, updateDevice } from "../store/sys/sysSlice";

function App() {
    const route = useAppSelector(state => state.sys.route);
    const device = useAppSelector(state => state.sys.device);

    const dispatch = useAppDispatch();

    useEffect(() => {
        chrome.runtime.onMessage.addListener((addHistory, sender, sendResponse) => {
            if(addHistory.sensorActive) {
                let data: any = {x: 0, y: 0, z: 0};

                if(addHistory.name === "VKWebAppDeviceMotionStart") {
                    data = {alpha: 0, beta: 0, gamma: 0};
                }
                if(addHistory.name === "VKWebAppScrollTopStart") {
                    data = {scrollTop: 0};
                }
                dispatch(addSensor({
                    name: addHistory.name,
                    refresh_rate: addHistory.refresh_rate,
                    data: data
                }));

                return;
            }

            if(addHistory.sensorStop) {
                dispatch(removeSensor({
                    name: addHistory.name
                }));

                return;
            }

            setTimeout(() => {
                if (addHistory.handler) {
                    dispatch(historyEventsAdd(addHistory));
                }
            }, 20);

            // sendResponse(true);
            // return true;
        });

        // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        //     // if (changeInfo && changeInfo.status === 'loading') {
        //     //     dispatch(historyEventsUpdate({
        //     //         list: []
        //     //     }));
        //     // }
        //     console.log(tabId);
        //     console.log(changeInfo);
        //     console.log(tab);
        // });
    }, [dispatch]);
    
    useEffect(() => {
        function fn(obg: any) {
            if(obg.deviceChange) {
                dispatch(updateDevice({
                    statusBarStyle: obg.status_bar_style,
                    actionBarColor: obg.action_bar_color,
                }));

                chrome.tabs.sendMessage(
                    chrome.devtools.inspectedWindow.tabId,
                    {
                        typeMessage: 'setDevice',
                        nameComponent: device.nameComponent,
                        device: {
                            ...device,
                            statusBarStyle: obg.status_bar_style,
                            actionBarColor: obg.action_bar_color,
                        }
                    }
                );

                return;
            }
        }
        
        chrome.runtime.onMessage.addListener(fn);
        
        return () => {
            chrome.runtime.onMessage.removeListener(fn);
        }
    }, [device, dispatch])

    useEffect(() => {
        async function run() {
            let localStore: any = await chrome.storage.local.get(null);

            const arr: any = [];
            allNamesEvents.forEach((name: any, i: number) => {
                if (name && localStore[name]) {
                    arr.push({
                        nameEvent: name,
                        idx: i,
                        ...localStore[name]
                    });
                } else if ((defSettings as any)[name]) {
                    arr.push({
                        nameEvent: name,
                        idx: i,
                        ...(defSettings as any)[name]
                    });
                }
            });

            dispatch(listEventsUpdate({
                list: arr
            }));
        }

        run();
    }, [dispatch]);

    function getComponent() {
        switch (route) {
            case 'main':
                return <Main />;
            case 'edit':
                return <Edit />;
            case 'lifecycle':
                return <Lifecycle />;
            case 'launch-params':
                return <LaunchParams />;
            case 'device':
                return <Device />;
            case 'sensors':
                return <Sensors />;
            default:
                return <Main />;
        }
    }

    return (
        <div className="wrapper">
            <Header />

            {getComponent()}

            <Footer />
        </div>
    );
}

export default App;