const settingEvent = {
    delay: 200,
    isError: false,
    platforms: [
        "Android",
        // "iOS",
        "Mobile Web",
        "Web",
    ],
    order: {
        url: "http://server/order",
        app_id: "1",
        user_id: 743784479,
        api_secret: "VzHdjHBtZvxGeGfDrzMP",
        isTest: 1,
    },
    error: {
        "error_type": "client_error",
        "error_data": {
            "error_code": 4,
            "error_reason": "User denied"
        }
    },
    data: {
        "success": true
    }
};

export default settingEvent;