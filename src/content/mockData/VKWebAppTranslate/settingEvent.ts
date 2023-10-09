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
        texts: [
            'Hi. How are you?',
            'Did you get a chance to see the book I was writing?'
        ],
        source_lang: 'ru'
    }
};

export default settingEvent;