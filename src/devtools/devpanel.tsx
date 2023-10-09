import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import store from '../store/store';

import {ConfigProvider} from "@vkontakte/vkui";

// import Provider from '../store/Provider';
import { Provider } from 'react-redux';

import 'highlight.js/styles/a11y-dark.css';
import "@vkontakte/vkui/dist/vkui.css";
import './index.scss';


if(process.env.NODE_ENV !== "production") {
    (window as any).chrome = {
        runtime: {
            onMessage: {
                addListener: () => {}
            }
        },
        tabs: {
            onUpdated: {
                addListener: () => {}
            },
            sendMessage: () => {}
        },
        storage: {
            local: {
                get: () => {return {}},
                set: () => {}
            }
        },
        devtools: {
            inspectedWindow: {
                tabId: 1111
            }
        }
    }
}


// chrome.tabs.onUpdated.addListener((tabid, eee) => {
//     console.log(tabid, eee);
// });




const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// console.log(chrome.devtools.inspectedWindow.tabId);

root.render(
    <Provider store={store}>
        <ConfigProvider appearance="dark">
            <App />
        </ConfigProvider>
    </Provider>
);