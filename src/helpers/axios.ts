import axiosy from 'axios';
// import $_GET from "../helpers/getParams";

/**
 * Стаднартная настройка для ajax запросов
 */
let axios = axiosy.create({
    baseURL: "http://localhost:3089/", //process.env.NODE_ENV === 'production'? "" : "http://truth-dare.local/",
    params: {lol: 111} //$_GET
});

export default axios;