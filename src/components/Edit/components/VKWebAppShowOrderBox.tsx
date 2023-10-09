import { FormItem, Input, Select } from "@vkontakte/vkui";
import React, { useState } from "react";

export const VKWebAppShowOrderBox = ({ clone }: any) => {
    const [server, setServer] = useState("");
    const [u, setU] = useState(false);

    function changeServer(event: React.ChangeEvent<HTMLInputElement>) {
        clone.order.url = event.target.value;
    }

    function changeTest(event: React.ChangeEvent<HTMLSelectElement>) {
        clone.order.isTest = event.target.value;

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

            <FormItem top="Тип запроса" bottom="будет добавлено _test (get_item_test...)">
                <Select options={[{ label: "Тестовый", value: 1 }, { label: "Боевой", value: 0 }]}
                        value={clone.order.isTest}
                        onChange={changeTest} />
            </FormItem>
        </>
    );
};