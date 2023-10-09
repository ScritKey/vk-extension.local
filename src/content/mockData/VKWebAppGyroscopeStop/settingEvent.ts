const settingEvent = {
    delay: 30,
    isError: false,
    platforms: [
        "Android",
        "iOS",
        // "Mobile Web",
        // "Web",
    ],
    defaultSubEvent: 0,
    subEvents: [
        {
            subNameEvent: "VKWebAppAccelerometerChanged",
            delay: 30,
            data: {
                x: -0.016759412,
                y: 6.3302693,
                z: 7.704541
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
        result: true
    }
};

export default settingEvent;