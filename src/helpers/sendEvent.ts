import getSettingsEvent from "./getSettingsEvent";

const sendEvent = (
  nameEvent = "",
  vk: any,
  typeReturn?: 'failed' | 'result' | 'received' | 'done' | 'closed' | 'auto',
  returnData?: any,
  addPropsStory?: any
): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        const item = await getSettingsEvent(nameEvent);

        let isError = false;
        if(typeReturn === undefined || typeReturn === 'auto') {
            isError = item.isError;
        }
        if (typeReturn === 'failed') {
            isError = true;
        }

        let prefixName = 'Result';
        if (typeReturn === 'received') {
            prefixName = `Received`;
        }
        if (typeReturn === 'done') {
            prefixName = `Done`;
        }
        if (typeReturn === 'closed') {
            prefixName = `Closed`;
        }

        const type = isError ? `${nameEvent}Failed` : `${nameEvent}${prefixName}`;
        let data = isError ? item.error : item.data;

        if(returnData) {
            data = returnData;
        }

        const detail: any = {
            type: type,
            data: {
                "request_id": vk.params.request_id,
                ...data
            }
        };

        let addHistory = {
            type: type,
            data: {
                ...data
            },
            handler: vk.handler,
            isError: isError,
        };

        if(addPropsStory) {
            addHistory = {...addHistory, ...addPropsStory};
        }
    
        window.postMessage(detail, "*");
        chrome.runtime.sendMessage(addHistory);

        resolve({
            item,
            detail,
            addHistory
        });
    });
}

export default sendEvent;