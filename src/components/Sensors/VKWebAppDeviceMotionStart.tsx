import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Button, Div, FormItem, Slider } from "@vkontakte/vkui";
import { addSensor, removeSensor, updateDataSensor } from "../../store/sys/sysSlice";

const nameEvent = "VKWebAppDeviceMotionStart";

const VKWebAppDeviceMotionStart = () => {
    const sensors = useAppSelector(state => state.sys.sensors);

    const dispatch = useAppDispatch();

    function onChangeX(t: string, n: number) {
        // setValueStep(x);
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
            data: {
                alpha: 0,
                beta: 0,
                gamma: 0
            }
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
                    <FormItem top={<span>alpha: {sensors[nameEvent]['data']['alpha']}</span>}>
                        <Slider step={0.02} min={-10} max={10}
                                value={Number(sensors[nameEvent]['data']['alpha'])}
                                aria-labelledby="alpha"
                                onChange={(n) => onChangeX("alpha", n)}/>
                    </FormItem>
                    <FormItem top={<span>beta: {sensors[nameEvent]['data']['beta']}</span>}>
                        <Slider step={0.02} min={-10} max={10}
                                value={Number(sensors[nameEvent]['data']['beta'])}
                                aria-labelledby="beta"
                                onChange={(n) => onChangeX("beta", n)}/>
                    </FormItem>
                    <FormItem top={<span>gamma: {sensors[nameEvent]['data']['gamma']}</span>}>
                        <Slider step={0.02} min={-10} max={10}
                                value={Number(sensors[nameEvent]['data']['gamma'])}
                                aria-labelledby="gamma"
                                onChange={(n) => onChangeX("gamma", n)}/>
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

export default VKWebAppDeviceMotionStart;