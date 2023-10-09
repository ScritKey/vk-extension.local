const settingEvent = {
    delay: 30,
    isError: false,
    platforms: [
        "Android",
        "iOS"
    ],
    error: {
        "error_type": "client_error",
        "error_data": {
            "error_code": 4,
            "error_reason": "User denied"
        }
    },
    data: {
        "permissions": [
            "camera",
            "location",
            "photo",
            "notifications"
        ]
    }
};

export default settingEvent;