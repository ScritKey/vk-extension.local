import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContent from './AppContent';
import { AppearanceProvider, ConfigProvider } from "@vkontakte/vkui";

// import "@vkontakte/vkui/dist/vkui.css";

// function notifyExtension(e: any) {
//   chrome.runtime.sendMessage({ "url": "Пришло из content" });

//   console.log('clicckkkk');
// }

// window.addEventListener("click", notifyExtension);


// let myPort = chrome.runtime.connect({ name: "port-from-cs" });

// myPort.onMessage.addListener(function (m) {
//   console.log("Во встраиваемом скрипте, получено сообщение из фонового скрипта: ");
//   console.log(m.greeting);
// });

// function injectScript(file_path: any) {
//   let script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = file_path;
//   script.onload = function () {
//     (this as HTMLScriptElement).parentNode!.removeChild(
//       this as HTMLScriptElement
//     );
//   };
//   (document.head || document.documentElement).appendChild(script);
// }

// injectScript(chrome.runtime.getURL('page.bundle.js'));

// window.addEventListener("message", (event) => {
//   if (event.data && event.data.startVK) {
//     console.log(event.data);
//     (window as any).startVK = true;
//   }
// }, false);

// declare global {
//   interface Window {
//     ids: any;
//   }
// }


// window.ids = [1248206167];



// window.addEventListener("DOMContentLoaded", () => {
//   const rootDiv = document.createElement("div");
//   rootDiv.id = "mockVkDivElement";
//   const root = ReactDOM.createRoot(rootDiv);
//   document.body.appendChild(rootDiv);

//   root.render(
//     <AppContent />
//   );
// });

function fn(event: MessageEvent<any>) {
  if(event.data && event.data.__VK_MOCK_EXTENSION__) {
    (window as any).extensionEnable = true;

    window.removeEventListener("message", fn);
  }
}

window.addEventListener("message", fn, false);

const rootDiv = document.createElement("div");
rootDiv.id = "mockVkDivElement";
const root = ReactDOM.createRoot(rootDiv);
(document.head || document.documentElement).appendChild(rootDiv);


root.render(

      <AppContent />
);