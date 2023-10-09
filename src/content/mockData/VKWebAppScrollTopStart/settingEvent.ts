const settingEvent = {
    delay: 30,
    isError: false,
    platforms: [
        // "Android",
        // "iOS",
        // "Mobile Web",
        "Web",
    ],
    defaultSubEvent: 0,
    subEvents: [
        {
            subNameEvent: "VKWebAppScrollTop",
            delay: 20,
            data: {
                scrollTop: 0
            }
        }
    ],
    error: {
        "error_type": "client_error",
        "error_data": {
            "error_code": 4,
            "error_reason": "User denied"
        }
    },
    data: {
        result: true,
        scrollTop: "100"
    }
};

export default settingEvent;