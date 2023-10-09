import { useEffect, useRef, useState } from "react";
import Highlight from "react-highlight";
import { Block } from "../../UI";

import defSettings from '../../content/launchParams/defSettings';
import { Button, Div, Group } from "@vkontakte/vkui";

const LaunchParams = () => {
    const [code, setCode] = useState<any>([]);
    const [savingLoading, setSavingLoading] = useState(false);

    const editorRef = useRef<any>({});

    useEffect(() => {
        async function run() {
            let item = defSettings;

            const obj = await chrome.storage.local.get('launchParams');
            if (obj['launchParams'] && obj['launchParams']['data']) {
                item = obj['launchParams'];
            }

            editorRef.current = JSON.parse(JSON.stringify(item));

            setCode(JSON.stringify(item.data, null, 2));
        }

        run();
    }, []);

    function changeCode(e: any) {
        setCode(e.target.value);
    }

    async function save() {
        setSavingLoading(true);

        try {
            editorRef.current['data'] = JSON.parse(code);
        } catch (error) {
            // TODO 
            // Показать сообщение об ошибке
            // `Не удалось прочитать JSON в событии ${activeName}`
        }

        await chrome.storage.local.set({ 'launchParams': editorRef.current });

        setSavingLoading(false);
    }

    function updateUrl() {
        let params: any = {};

        try {
            params = JSON.parse(code);
        } catch (error) {
            // TODO 
            // Показать сообщение об ошибке
            // `Не удалось прочитать JSON в событии ${activeName}`
        }

        chrome.tabs.query({ active: true }).then((arrTabs) => {
            const tab = arrTabs[0];

            const url = new URL(tab.url);

            Object.keys(params).forEach((keyName) => {
                url.searchParams.set(keyName, params[keyName]);
            });

            chrome.tabs.update(tab.id, { url: url.toString() });
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <div className="wrap-root-content launchParams">
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


                <Div style={{ textAlign: "center", width: "100%" }}>
                    <Group mode="card">
                        Обновить url в браузерной строке<br />
                        Страница обновится
                    </Group>
                    <Button onClick={updateUrl}>
                        Обновить url
                    </Button>
                </Div>
            </Block>
            <Block style={{ flexGrow: 1 }} header={<div>Параметры в JSON</div>}>
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

export default LaunchParams;