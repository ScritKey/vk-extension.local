import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Button, Div, FormItem, Slider } from "@vkontakte/vkui";
import { addSensor, removeSensor, updateDataSensor } from "../../store/sys/sysSlice";
import { useRef } from "react";

const nameEvent = "VKWebAppScrollTopStart";

const VKWebAppScrollTopStart = () => {
    const sensors = useAppSelector(state => state.sys.sensors);

    const dispatch = useAppDispatch();

    const timer = useRef(null);

    function onChangeX(t: string, n: number) {
        const detail: any = {
            type: "VKWebAppScrollTop",
            data: {
                scrollTop: n
            }
        };

        chrome.tabs.sendMessage(
            chrome.devtools.inspectedWindow.tabId,
            {
                detail,
                addHistory: {},
                typeMessage: 'sensorOnlyChange'
            }
        );

        dispatch(updateDataSensor({
            name: nameEvent,
            data: {
                [t]: n
            }
        }));
    }

    function clickActivate() {
        dispatch(addSensor({
            name: nameEvent,
            refresh_rate: 1000,
            data: {scrollTop: 0}
        }));
    }

    function disableSensor() {
        dispatch(removeSensor({
            name: nameEvent
        }));
    }

    return (
        <>
            {sensors[nameEvent]? (
                <>
                    <FormItem top={<span>scrollTop: {sensors[nameEvent]['data']['scrollTop']}</span>}>
                        <Slider step={10} min={0} max={4000}
                                value={Number(sensors[nameEvent]['data']['scrollTop'])}
                                aria-labelledby="scrollTop"
                                onChange={(n) => onChangeX("scrollTop", n)}/>
                    </FormItem>

                    <Div>
                        Можно отключить принудительно<br/><br/>
                        <Button onClick={disableSensor}>
                            Отключить
                        </Button>
                    </Div>
                </>
            ) : (
                <div style={{paddingTop: 14, textAlign: "center"}}>
                    Для управления необходимо отправить событие <br/>
                    bridge("{nameEvent}");<br/><br/>

                    Или активировать событие принудительно<br/>
                    <Button onClick={clickActivate}>
                        Активировать
                    </Button>
                </div>
            )}
        </>
    );
}

export default VKWebAppScrollTopStart;