import axios from "axios";

const { NODE_ENV, VUE_APP_PRODUCTION_API_URL, VUE_APP_DEVELOPMENT_API_URL } = process.env;

const BASE_URL = NODE_ENV === "production"
    ? VUE_APP_PRODUCTION_API_URL : VUE_APP_DEVELOPMENT_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": "application/json",
    }
});

export const get = async (url, options = {}) => {
    try {
        const { data } = await api.get(url, options);
        return data;
    } catch (error) {
        return { error };
    }
};