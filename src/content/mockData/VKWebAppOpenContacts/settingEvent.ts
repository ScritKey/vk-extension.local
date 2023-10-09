const settingEvent = {
    delay: 1000,
    isError: false,
    platforms: [
        "Android",
        "iOS",
    ],
    defaultSubEvent: 0,
    subEvents: [
        {
            subNameEvent: "VKWebAppOpenContactsClosed",
            delay: 20,
            data: {}
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
        "contacts": [
            {
                "phone": 743784479,
                "last_name": "Хомяк",
                "first_name": "Сеня",
            },
            {
                "phone": 308546895,
                "last_name": "Рыжий",
                "first_name": "Персик",
            },
            {
                "phone": 47678720,
                "last_name": "Хомяк второй",
                "first_name": "Саня два",
            },
            {
                "phone": 218755213,
                "last_name": "Рыжий второй",
                "first_name": "Персик два",
            },
            {
                "phone": 3402347981,
                "last_name": "Суслик",
                "first_name": "Петя",
            }
        ]
    },
    "notification": "В данном случае, это данные которые будут отображены в списке друзей. Метод вернет друзей которые были выбраны из списка"
};

export default settingEvent;