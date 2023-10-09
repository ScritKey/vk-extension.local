import defSettings from '../content/mockData/defSettings';
import { IList } from '../store/listEvents/listEventsSlice';

export default function getSettingsEvent(nameEvent = ''): Promise<IList> {
    return new Promise(async (resolve, reject) => {
        let item = (defSettings as any)[nameEvent];

        const obj = await chrome.storage.local.get(nameEvent);
        if (obj[nameEvent] && obj[nameEvent].data) {
            item = obj[nameEvent];
        }

        if(item) {
            resolve(item);
        } else {
            reject();
        }
    });
}