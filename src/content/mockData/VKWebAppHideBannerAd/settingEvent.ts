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
        "result" : true,
        "banner_width": 100,
        "banner_height": 64,
        "banner_location": "top",
        "layout_type": "resize"
    }
};

export default settingEvent;