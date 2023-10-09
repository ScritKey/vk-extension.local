chrome.runtime.onMessage.addListener(request => {
    // console.log(request);

    // if(request.sensor) {
    //     const detail: any = {
    //         type: "VKWebAppAccelerometerChanged",
    //         data: {
    //             data: {
    //                 x: 3,
    //                 y: 3,
    //             }
    //         }
    //     };
    //
    //     window.postMessage(detail, "*");
    // }
});