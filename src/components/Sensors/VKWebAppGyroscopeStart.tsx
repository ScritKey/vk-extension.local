import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Button, Div, FormItem, Slider } from "@vkontakte/vkui";
import { addSensor, removeSensor, updateDataSensor } from "../../store/sys/sysSlice";

const nameEvent = "VKWebAppGyroscopeStart";

const VKWebAppGyroscopeStart = () => {
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
            data: {x: 0, y: 0, z: 0}
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
                    <FormItem top={<span>x: {sensors[nameEvent]['data']['x']}</span>}>
                        <Slider step={0.02} min={-10} max={10}
                                value={Number(sensors[nameEvent]['data']['x'])}
                                aria-labelledby="x"
                                onChange={(n) => onChangeX("x", n)}/>
                    </FormItem>
                    <FormItem top={<span>y: {sensors[nameEvent]['data']['y']}</span>}>
                        <Slider step={0.02} min={-10} max={10}
                                value={Number(sensors[nameEvent]['data']['y'])}
                                aria-labelledby="y"
                                onChange={(n) => onChangeX("y", n)}/>
                    </FormItem>
                    <FormItem top={<span>z: {sensors[nameEvent]['data']['z']}</span>}>
                        <Slider step={0.02} min={-10} max={10}
                                value={Number(sensors[nameEvent]['data']['z'])}
                                aria-labelledby="z"
                                onChange={(n) => onChangeX("z", n)}/>
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

export default VKWebAppGyroscopeStart;