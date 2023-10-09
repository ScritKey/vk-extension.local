const settingEvent = {
    delay: 30,
    isError: false,
    platforms: [
        "Android",
        "iOS",
        "Mobile Web",
        "Web",
    ],
    error: {
        "error_type": "client_error",
        "error_data": {
            "error_code": 4,
            "error_reason": "User denied"
        }
    },
    data: {
        "result": [
            {
                "scope": "friends",
                "allowed": true
            },
            {
                "scope": "notify",
                "allowed": false
            }
        ]
    }
};

export default settingEvent;