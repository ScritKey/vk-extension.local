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
        platform: "web",
        version: "0.0",
        app: "vkclient",
        is_google_services_available: true,
        client_user_agent: "SAK_1.93(com.vkontakte.android)/7.42-13967 (Android 12; SDK 31; arm64-v8a; samsung SM-A525F; ru; 2186x1080)",
        build: "app",
        is_new_navigation: true,
        is_voice_assistant_available: true,
        install_referrer: "com.android.vending",
        vk_client_exists: true
    }
};

export default settingEvent;