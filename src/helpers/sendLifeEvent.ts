import defSettings from '../content/lifecycleData/defSettings';

const sendLifeEvent = (nameEvent = '', toStory = true) => {
    return new Promise(async (resolve, reject) => {
        let item = (defSettings as any)[nameEvent];

        const obj = await chrome.storage.local.get(nameEvent);
        if (obj[nameEvent] && obj[nameEvent].data) {
            item = obj[nameEvent];
        }

        const detail: any = {
            type: nameEvent,
            data: {
                ...item.data
            }
        };

        const addHistory = {
            type: nameEvent,
            data: {
                ...item.data
            },
            handler: nameEvent,
        };

        // Отпровляет panel
        if (chrome && chrome.tabs && chrome.tabs.sendMessage) {
            chrome.tabs.sendMessage(
                chrome.devtools.inspectedWindow.tabId,
                {
                    detail,
                    addHistory,
                    typeMessage: 'imSender'
                }
            );
        } else {
            // Отправка из content_scripts
            window.postMessage(detail, "*");
            if(toStory) {
                chrome.runtime.sendMessage(addHistory);
            }
        }

        resolve({
            detail,
            addHistory,
            typeMessage: 'imSender'
        });
    });
}

export default sendLifeEvent;