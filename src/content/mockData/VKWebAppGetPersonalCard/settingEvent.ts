const settingEvent = {
    delay: 30,
    isError: false,
    platforms: [
        "Android",
        "iOS",
    ],
    error: {
        "error_type": "client_error",
        "error_data": {
            "error_code": 4,
            "error_reason": "User denied"
        }
    },
    data: {
        phone: "79111234567",
        email: "persik_ryzhiy@mail.ru",
        address: {
            country: {
                id: 1,
                name: "Россия"
            },
            city: {
                id: 2,
                name: "Санкт-Петербург"
            },
            specified_address: "Невский пр., д. 28",
            postal_code: "191186"
        }
    }
};

export default settingEvent;