const settingEvent = {
    delay: 200,
    isError: false,
    platforms: [
        "Android",
        "iOS",
        "Mobile Web",
        "Web",
    ],
    defaultSubEvent: 0,
    subEvents: [
        {
            subNameEvent: "VKWebAppShowStoryBoxLoadFinish",
            delay: 2000,
            data: {
                story_owner_id: 743784474,
                story_id: 456239018,
            }
        },
        {
            subNameEvent: "VKWebAppShowStoryBoxLoadFailed",
            delay: 2000,
            isError: true,
            data: {
                "error_type": "client_error",
                "error_data": {
                    "error_code": 4,
                    "error_reason": "User denied"
                }
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
        "result": true
    }
};

export default settingEvent;