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
        keys: [
            {
                key: "example1",
                value: "example_value1"
            },
            {
                key: "example2",
                value: "example_value2"
            },
            {
                key: "example3",
                value: "example_value3"
            }
        ]
    }
};

export default settingEvent;