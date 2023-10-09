import { FormItem, Input, Select } from "@vkontakte/vkui";
import React, { useState } from "react";

export const VKWebAppShowSubscriptionBox = ({ clone }: any) => {
    const [server, setServer] = useState("");
    const [u, setU] = useState(false);

    function changeServer(event: React.ChangeEvent<HTMLInputElement>) {
        clone.order.url = event.target.value;
    }

    function changeTest(event: React.ChangeEvent<HTMLSelectElement>) {
        clone.order.isTest = event.target.value;

        setU(!u);
    }

    function changeStatus(event: React.ChangeEvent<HTMLSelectElement>) {
        clone.order.status = event.target.value;

        setU(!u);
    }

    function changeCancelReason(event: React.ChangeEvent<HTMLSelectElement>) {
        clone.order.cancel_reason = event.target.value;

        setU(!u);
    }

    return (
        <>
            <FormItem top="Сервер" bottom="Куда будет запрос">
                <Input defaultValue={clone.order.url} onChange={changeServer} />
            </FormItem>

            <FormItem top="app_id">
                <Input defaultValue={clone.order.app_id} onChange={(e) => clone.order.app_id = e.target.value} />
            </FormItem>
            <FormItem top="user_id">
                <Input defaultValue={clone.order.user_id} onChange={(e) => clone.order.user_id = e.target.value} />
            </FormItem>
            <FormItem top="Защищённый ключ" bottom="Из настроек, реальный ключ">
                <Input defaultValue={clone.order.api_secret} onChange={(e) => clone.order.api_secret = e.target.value} />
            </FormItem>
            <FormItem top="subscription_id">
                <Input defaultValue={clone.order.subscription_id} onChange={(e) => clone.order.subscription_id = e.target.value} />
            </FormItem>
            <FormItem top="next_bill_time">
                <Input defaultValue={clone.order.next_bill_time} onChange={(e) => clone.order.next_bill_time = e.target.value} />
            </FormItem>
            <FormItem top="pending_cancel">
                <Input defaultValue={clone.order.pending_cancel} onChange={(e) => clone.order.pending_cancel = e.target.value} />
            </FormItem>
            <FormItem top="Статус">
                <Select options={[{ label: "chargeable", value: "chargeable" }, { label: "cancelled", value: "cancelled" }, { label: "active", value: "active" }]}
                        value={clone.order.status}
                        onChange={changeStatus} />
            </FormItem>
            <FormItem top="cancel_reason">
                <Select options={[
                    { label: "user_decision", value: "user_decision" },
                    { label: "app_decision", value: "app_decision" },
                    { label: "payment_fail", value: "payment_fail" },
                    { label: "unknown", value: "unknown" }
                ]}
                        value={clone.order.cancel_reason}
                        onChange={changeCancelReason} />
            </FormItem>

            <FormItem top="Тип запроса" bottom="будет добавлено _test (get_item_test...)">
                <Select options={[{ label: "Тестовый", value: 1 }, { label: "Боевой", value: 0 }]}
                        value={clone.order.isTest}
                        onChange={changeTest} />
            </FormItem>
        </>
    );
};