import axios from "axios";

export const sendRequest = axios.create({
    baseURL: "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
})