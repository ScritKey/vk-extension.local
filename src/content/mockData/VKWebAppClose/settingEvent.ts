const settingEvent = {
    delay: 200,
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
        status: "success",
        payload: {
            name: "value"
        }
    }
};

export default settingEvent;