import { useAppSelector } from "../../store/hook";
import { useEffect, useRef } from "react";

const nameEvent = "VKWebAppGyroscopeStart";

export const Gyroscope = () => {
    const sensors = useAppSelector(state => state.sys.sensors);

    const timer = useRef(null);

    useEffect(() => {
        if(sensors[nameEvent]) {
            const detail: any = {
                type: "VKWebAppGyroscopeChanged",
                data: sensors[nameEvent]['data']
            };

            let sec = 1000;
            if(sensors[nameEvent]) {
                sec = sensors[nameEvent]['refresh_rate'];
            }

            timer.current = setInterval(() => {
                chrome.tabs.sendMessage(
                    chrome.devtools.inspectedWindow.tabId,
                    {
                        detail,
                        addHistory: {},
                        typeMessage: 'sensorOnlyChange'
                    }
                );
            }, sec);
        }

        return () => {
            clearInterval(timer.current);
        }
    }, [sensors]);

    return (
        <div className={sensors[nameEvent]? "item active" : "item"}>
            Gyroscope
            <div className={sensors[nameEvent]? "circle active" : "circle"}/>
        </div>
    );
}