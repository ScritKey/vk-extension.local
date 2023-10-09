import { useEffect, useRef, useState } from 'react';
import { Block } from '../../UI';
import defSettings from '../../content/lifecycleData/defSettings';

import './Lifecycle.scss';
import Highlight from 'react-highlight';
import { Button, Div } from '@vkontakte/vkui';
import { useAppDispatch } from '../../store/hook';
import sendLifeEvent from '../../helpers/sendLifeEvent';
import { historyEventsAdd } from '../../store/historyEvents/historyEventsSlice';

import {AiOutlineSend} from 'react-icons/ai';

const Lifecycle = () => {
    const [code, setCode] = useState<any>([]);
    const [activeName, setActiveName] = useState("VKWebAppUpdateConfig");
    const [savingLoading, setSavingLoading] = useState(false);

    const editorRef = useRef<any>({});

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function run() {
            let item = defSettings['VKWebAppUpdateConfig'];

            const obj = await chrome.storage.local.get('VKWebAppUpdateConfig');
            if (obj['VKWebAppUpdateConfig'] && obj['VKWebAppUpdateConfig'].data) {
                item = obj['VKWebAppUpdateConfig'];
            }

            editorRef.current['VKWebAppUpdateConfig'] = JSON.parse(JSON.stringify(item));

            setCode(JSON.stringify(item.data, null, 2));
        }

        run();
    }, []);

    function changeCode(e: any) {
        setCode(e.target.value);

        // editorRef.current[activeName]['data'] = e.target.value;
    }

    async function clickSend(event: React.MouseEvent<HTMLDivElement, MouseEvent>, keyName: string) {
        event.stopPropagation();
        
        let o:any = await sendLifeEvent(keyName);

        // TODO Это только для проверок
        // Нужно будет удалить
        if (process.env.NODE_ENV !== "production") {
            dispatch(historyEventsAdd(o.addHistory));
        }
    }

    async function clickItem(keyName: string) {
        try {
            editorRef.current[activeName]['data'] = JSON.parse(code);
        } catch (error) {
            // TODO 
            // Показать сообщение об ошибке
            // `Не удалось прочитать JSON в событии ${activeName}`
        }

        if(editorRef.current[keyName]) {
            setCode(JSON.stringify(editorRef.current[keyName].data, null, 2));
        } else {
            let item = defSettings[keyName as keyof typeof defSettings];

            const obj = await chrome.storage.local.get(keyName);
            if (obj[keyName] && obj[keyName].data) {
                item = obj[keyName];
            }

            editorRef.current[keyName] = JSON.parse(JSON.stringify(item));

            setCode(JSON.stringify(item.data, null, 2));
        }

        setActiveName(keyName);
    }

    async function save() {
        setSavingLoading(true);

        // Object.keys(editorRef.current).forEach((el) => {
        //     console.log(editorRef.current[el]);
        // });

        try {
            editorRef.current[activeName]['data'] = JSON.parse(code);
        } catch (error) {
            // TODO 
            // Показать сообщение об ошибке
            // `Не удалось прочитать JSON в событии ${activeName}`
        }

        await chrome.storage.local.set(editorRef.current);

        setSavingLoading(false);
    }

    return (
        <div className="wrap-root-content lifecycle">
            <Block style={{ width: 320, flexShrink: 0 }}
                header={
                    <div>
                        События
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
                <div className="itemsWrap">
                    {Object.keys(defSettings).map((keyName: string) => {
                        const item = defSettings[keyName as keyof typeof defSettings];

                        let className = 'itemWrap';
                        if (activeName === keyName) {
                            className = 'itemWrap active';
                        }
                        return (
                            <div key={keyName} className={className} onClick={() => clickItem(keyName)}>
                                <div className="iconSend" title='Отправить событие' onClick={(event) => clickSend(event, keyName)}>
                                    <AiOutlineSend size={22}/>
                                </div>

                                <div className="platformsWrap">
                                    {item.platforms.map((platform) => {
                                        return (
                                            <div key={platform} className="platformItem">
                                                {platform}
                                            </div>
                                        );
                                    })}
                                </div>
                                {keyName}
                            </div>
                        );
                    })}
                </div>
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

export default Lifecycle;