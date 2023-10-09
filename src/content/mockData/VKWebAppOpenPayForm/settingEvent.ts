const settingEvent = {
    delay: 30,
    isError: false,
    platforms: [
        "Android",
        // "iOS",
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
        status: true,
        transaction_id: "1234ABCD-EEEE-5678-90FG-ABCDEF123456",
        amount: "120.5",
        extra: "{\"currency\":\"RUB\",\"merchant_data\":\"some_merchant_data\",\"merchant_sign\":\"some_sign\",\"order_id\":\"some_order_id\",\"ts\":1641999488}\""
    }
};

export default settingEvent;