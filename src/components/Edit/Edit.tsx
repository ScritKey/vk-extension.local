import { Button, Checkbox, Div, FormItem, Group, Header, Input, SimpleCell, Textarea } from "@vkontakte/vkui";
import React, { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { listEventsUpdate } from "../../store/listEvents/listEventsSlice";
import { sysUpdate } from "../../store/sys/sysSlice";
import { Block } from "../../UI";
import { VKWebAppShowOrderBox } from "./components/VKWebAppShowOrderBox";

import classesBlock from "../../UI/Block/Block.module.scss";
import classes from "./Edit.module.scss";
import { Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { getNameWithPrefix } from "../../helpers/getNameWithPrefix";
import { VKWebAppShowSubscriptionBox } from "./components/VKWebAppShowSubscriptionBox";
import { Modal } from "../Modal/Modal";

const Edit = () => {
    const [code, setCode] = useState<any>([]);
    const [u, setU] = useState(false);
    const [savingLoading, setSavingLoading] = useState(false);
    const [editor, setEditor] = useState<{ el: number | string, type: string }>({ el: 'data', type: 'def' });

    const [modalAdd, setModalAdd] = useState(false);
    const [nameMethod, setNameMethod] = useState("");
    const [jsonMethod, setJsonMethod] = useState("");

    const listEvents = useAppSelector(state => state.listEvents.list);
    const activeIdxEvent = useAppSelector(state => state.listEvents.activeIdxEvent);

    const cloneRef = useRef(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cloneRef.current !== null) {
            return;
        }

        cloneRef.current = JSON.parse(JSON.stringify(listEvents[activeIdxEvent]));

        // if(listEvents[activeIdxEvent]['nameEvent'] === 'VKWebAppCallAPIMethod') {
        //     setCode(JSON.stringify([], null, 2));
        //     return;
        // }

        setCode(JSON.stringify(listEvents[activeIdxEvent]['data'], null, 2));

        // setActiveEvent({
        //     ...listEvents[activeIdxEvent]
        // });
    }, [activeIdxEvent, listEvents]);

    function changeCode(e: any) {
        setCode(e.target.value);
    }

    function checkboxError(checked: any, method?: string) {
        // const ev = { ...activeEvent };

        // ev.isError = e.target.checked;

        // setActiveEvent(ev);

        if(method) {
            cloneRef.current.data[method].isError = checked;

            return;
        }

        cloneRef.current.isError = checked;
    }

    function changeDelay(e: React.ChangeEvent<HTMLInputElement>) {
        // const ev = { ...activeEvent };

        // ev.delay = Number(e.target.value);

        // setActiveEvent(ev);

        cloneRef.current.delay = Number(e.target.value);
    }

    function changeDelaySub(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
        cloneRef.current.subEvents[idx].delay = Number(e.target.value);
    }

    function changeDelayMethod(e: React.ChangeEvent<HTMLInputElement>, method?: string) {
        cloneRef.current.data[method].delay = Number(e.target.value);
    }


    function changeEditor(t: any, type = 'def') {
        // const ev = { ...activeEvent };

        if(modalAdd) {
            setModalAdd(false);
        }

        if (editor.type === 'def') {
            // ev[editor.el] = JSON.parse(code);
            cloneRef.current[editor.el] = JSON.parse(code);
        } else if (editor.type === 'sub') {
            // const subEv: any = [...ev.subEvents];
            // subEv[editor.el] = {
            //     ...subEv[editor.el],
            //     data: JSON.parse(code)
            // }

            // ev.subEvents = subEv;

            cloneRef.current.subEvents[editor.el]['data'] = JSON.parse(code);
        } else if (editor.type === 'method' && cloneRef.current.data[editor.el]) {
            cloneRef.current.data[editor.el]['data'] = JSON.parse(code);
        }

        let c = cloneRef.current['data'];
        if (type === 'def') {
            c = cloneRef.current[t];
        } else if (type === 'sub') {
            c = cloneRef.current.subEvents[t]['data'];
        } else if (type === 'method') {
            c = cloneRef.current.data[t]['data'];
        }

        // console.log(c);

        // setActiveEvent(ev);
        setEditor({
            type: type,
            el: t
        });

        setCode(JSON.stringify(c, null, 2));
    }


    function checkboxErrorSS(idx: number) {
        cloneRef.current.defaultSubEvent = idx;

        setU(!u);
    }


    async function save() {
        setSavingLoading(true);

        if (editor.type) {
            changeEditor(editor.el, editor.type);
        }

        const arr = [...listEvents];

        arr[activeIdxEvent] = {
            ...arr[activeIdxEvent],
            ...cloneRef.current
        };

        cloneRef.current = JSON.parse(JSON.stringify(arr[activeIdxEvent]));

        dispatch(listEventsUpdate({
            list: arr
        }));

        await chrome.storage.local.set({
            [cloneRef.current.nameEvent]: arr[activeIdxEvent]
        });

        setSavingLoading(false);
    }

    function deleteMethod(name: string) {
        if(listEvents[activeIdxEvent].data && listEvents[activeIdxEvent].data[name]) {
            let k = Object.keys(listEvents[activeIdxEvent].data);

            if(k && k.length <= 1) {
                alert("Нужно оставить хотя бы один метод");
                return;
            }

            setEditor({
                type: "data",
                el: 'def'
            });

            const arr = [...listEvents];

            // cloneRef.current.data[editor.el]['data'] = JSON.parse(code);

            delete cloneRef.current.data[name];

            arr[activeIdxEvent] = {
                ...arr[activeIdxEvent],
                ...cloneRef.current
            };

            cloneRef.current = JSON.parse(JSON.stringify(arr[activeIdxEvent]));

            // setCode(JSON.stringify(cloneRef.current.data, null, 2));

            dispatch(listEventsUpdate({
                list: arr
            }));
        }
    }

    function addMethod() {
        const arr = [...listEvents];

        cloneRef.current.data[nameMethod] = {
            data: {
                response: JSON.parse(jsonMethod)
            },
            delay: 30,
            isError: false,
            error: {
                "error_code": 104,
                "error_msg": "Not found",
                "request_params": [
                    {
                        "key": "v",
                        "value": "5.100"
                    },
                    {
                        "key": "method",
                        "value": "status.getImage"
                    },
                    {
                        "key": "oauth",
                        "value": "1"
                    }
                ]
            },
        };

        arr[activeIdxEvent] = {
            ...arr[activeIdxEvent],
            ...cloneRef.current
        };

        cloneRef.current = JSON.parse(JSON.stringify(arr[activeIdxEvent]));

        setCode(JSON.stringify(cloneRef.current.data, null, 2));

        dispatch(listEventsUpdate({
            list: arr
        }));
    }


    function dopComponent() {
        switch (listEvents[activeIdxEvent]['nameEvent']) {
            case "VKWebAppShowOrderBox":
                return <VKWebAppShowOrderBox clone={cloneRef.current}/>;
            case "VKWebAppShowSubscriptionBox":
                return <VKWebAppShowSubscriptionBox clone={cloneRef.current}/>;
            default:
                return null;
        }
    }



    if (cloneRef.current === null) {
        return null;
    }


    if(listEvents[activeIdxEvent]['nameEvent'] === 'VKWebAppCallAPIMethod') {
        return (
            <div className="wrap-root-content">
                {/*<Modal title="lol" onClose={() => setModalAdd(true)}>*/}
                {/*    <div style={{padding: "8px 16px"}}>*/}
                {/*        <FormItem top="Метод api" bottom="Полное название например: users.get">*/}
                {/*            <Input value={nameMethod} placeholder="users.get" onChange={(e) => setNameMethod(e.target.value)} />*/}
                {/*        </FormItem>*/}
                {/*        <FormItem top="Что вернет метод в JSON" bottom="без response">*/}
                {/*            <Textarea rows={6} value={jsonMethod} placeholder="{}" onChange={(e) => setJsonMethod(e.target.value)} />*/}
                {/*        </FormItem>*/}

                {/*        <Button onClick={addMethod}>*/}
                {/*            Добавить метод*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Modal>*/}
                <Block style={{ width: 320, flexShrink: 0 }}
                       header={
                           <div className={classes.editHeader}>
                               <div className={classes.itemWrap} onClick={() => dispatch(sysUpdate({ route: "main" }))}>
                                   <div className={classesBlock.buttonHeader}>
                                       <Icon28ArrowLeftOutline/>
                                   </div>
                               </div>
                               <div className={classes.itemWrap} onClick={() => dispatch(sysUpdate({ route: "main" }))}>
                                   Настройка
                               </div>
                           </div>
                       }
                    footer={
                        <Div style={{ textAlign: "center", width: "100%" }}>
                            <Button onClick={save} loading={savingLoading} disabled={savingLoading}>
                                Сохранить все изменения
                            </Button>
                        </Div>
                    }
                >
                    {/*<Div style={{ textAlign: "center", width: "100%" }}>*/}
                    {/*    <Button onClick={save} loading={savingLoading} disabled={savingLoading}>*/}
                    {/*        Добавить метод*/}
                    {/*    </Button>*/}
                    {/*</Div>*/}

                    <div className={classes.apiMethods}>
                        <Div style={{ textAlign: "center", width: "100%" }}>
                            <Button onClick={() => setModalAdd(true)}>
                                Добавить метод
                            </Button>
                        </Div>

                        {Object.keys(listEvents[activeIdxEvent].data).map((key) => {
                            let item = cloneRef.current.data[key];

                            return (
                                <Group key={key} mode="card" style={{margin: "5px 0"}}>
                                    <SimpleCell onClick={() => changeEditor(key, 'method')}
                                                style={editor.el === key ? { backgroundColor: "var(--vkui--color_background_secondary--hover)" } : {}}
                                                multiline
                                    >
                                        {key}
                                    </SimpleCell>

                                    {editor.el === key? (
                                        <>
                                            <FormItem bottom="запрос к данному событию вернет ошибку">
                                                <Checkbox onChange={(e) => checkboxError(e.target.checked, key)} defaultChecked={item.isError}>
                                                    Вернуть ошибку
                                                </Checkbox>
                                            </FormItem>

                                            <FormItem top="Задержка в ms" bottom="эмулирует слабое подключение с сети">
                                                <Input type="number" min={0} defaultValue={item.delay} onChange={(event) => changeDelayMethod(event, key)} />
                                            </FormItem>

                                            <Div style={{ textAlign: "center", width: "100%" }}>
                                                <Button onClick={() => deleteMethod(key)}>
                                                    Удалить метод
                                                </Button>
                                            </Div>
                                        </>
                                    ) : null}
                                </Group>
                            );
                        })}
                    </div>
                </Block>

                <Block style={{ flexGrow: 1 }} header={<div>Возращаемы JSON</div>}>
                    {modalAdd? (
                        <>
                            <div style={{padding: "8px 16px"}}>
                                <FormItem top="Метод api" bottom="Полное название например: users.get">
                                    <Input value={nameMethod} placeholder="users.get" onChange={(e) => setNameMethod(e.target.value)} />
                                </FormItem>
                                <FormItem top="Что вернет метод в JSON" bottom="без ключа response">
                                    <Textarea rows={6} value={jsonMethod} placeholder="{}" onChange={(e) => setJsonMethod(e.target.value)} />
                                </FormItem>

                                <Button onClick={addMethod}>
                                    Добавить метод
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="wrapEditor">
                            <div className="editor">
                            <textarea className="tarAndPre tar"
                                      value={editor.el === "data"? "" : code}
                                      onChange={changeCode}
                                      autoCapitalize="off"
                                      autoComplete="off"
                                      autoCorrect="off"
                                      spellCheck="false"
                            />
                                <Highlight>
                                    {editor.el === "data"? "" : code}
                                </Highlight>
                            </div>
                        </div>
                    )}
                </Block>
            </div>
        );
    }


    return (
        <div className="wrap-root-content">
            <Block style={{ width: 320, flexShrink: 0 }}
                header={
                    <div className={classes.editHeader}>
                        <div className={classes.itemWrap} onClick={() => dispatch(sysUpdate({ route: "main" }))}>
                            <div className={classesBlock.buttonHeader}>
                                <Icon28ArrowLeftOutline/>
                            </div>
                        </div>
                        <div className={classes.itemWrap} onClick={() => dispatch(sysUpdate({ route: "main" }))}>
                            Настройка
                        </div>
                    </div>
                }
                footer={
                    <Div style={{ textAlign: "center", width: "100%" }}>
                        <Button onClick={save} loading={savingLoading} disabled={savingLoading}>
                            Сохранить все изменения
                        </Button>
                    </Div>
                }
            >
                {cloneRef.current.notification? (
                  <div style={{margin: 8, padding: 6, borderRadius: 8, background: "#595959"}}>
                      {cloneRef.current.notification}
                  </div>
                ) : null}

                <Group mode="plain">
                    <FormItem bottom="запрос к данному событию вернет ошибку">
                        <Checkbox onChange={(e) => checkboxError(e.target.checked)} defaultChecked={cloneRef.current.isError}>
                            Вернуть ошибку
                        </Checkbox>
                    </FormItem>

                    <FormItem top="Задержка в ms" bottom="эмулирует слабое подключение с сети">
                        <Input type="number" min={0} defaultValue={cloneRef.current.delay} onChange={changeDelay} />
                    </FormItem>
                </Group>


                <Group mode="plain" header={<Header>Данные событий</Header>}>
                    <SimpleCell onClick={() => changeEditor('data', 'def')}
                        style={editor.el === 'data' ? { backgroundColor: "var(--vkui--color_background_secondary--hover)" } : {}}
                    >
                        {getNameWithPrefix(listEvents[activeIdxEvent]['nameEvent'])[0]}
                    </SimpleCell>
                    <SimpleCell onClick={() => changeEditor('error', 'def')}
                        style={editor.el === 'error' ? { backgroundColor: "var(--vkui--color_background_secondary--hover)" } : {}}
                    >
                        {getNameWithPrefix(listEvents[activeIdxEvent]['nameEvent'])[1]}
                    </SimpleCell>
                    {listEvents[activeIdxEvent].subEvents ? (
                        listEvents[activeIdxEvent].subEvents.map((s, i: number) => {
                            return (
                                <Group key={s.subNameEvent} mode="card">
                                    <SimpleCell onClick={() => changeEditor(i, 'sub')}
                                        style={editor.el === i ? { backgroundColor: "var(--vkui--color_background_secondary--hover)" } : {}}
                                    >
                                        {s.subNameEvent}
                                    </SimpleCell>

                                    <FormItem bottom="Если больше одного события, можно выбрать одно">
                                        <Checkbox onChange={() => checkboxErrorSS(i)} checked={cloneRef.current.defaultSubEvent === i}>
                                            Выполнить по умолчанию
                                        </Checkbox>
                                    </FormItem>

                                    {s.delay !== undefined ? (
                                        <FormItem top="Задержка в ms" bottom="эмулирует слабое подключение с сети">
                                            <Input type="number"
                                                min={0}
                                                defaultValue={cloneRef.current.subEvents[i].delay}
                                                onChange={(event) => changeDelaySub(event, i)} />
                                        </FormItem>
                                    ) : null}
                                </Group>
                            );
                        })
                    ) : null}
                </Group>

                {dopComponent()? (
                  <Group mode="plain" header={<Header>Уникальные свойства</Header>}>
                      {dopComponent()}
                  </Group>
                ) : null}
            </Block>

            <Block style={{ flexGrow: 1 }} header={<div>Возращаемы JSON</div>}>
                <div className="wrapEditor">
                    <div className="editor">
                        <textarea className="tarAndPre tar"
                            value={code}
                            onChange={changeCode}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                        />
                        <Highlight>
                            {code}
                        </Highlight>
                    </div>
                </div>
            </Block>
        </div>
    );
}

export default Edit;