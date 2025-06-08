import { BACKEND_URL } from "./constants.js";
import axios from "axios";

export const refreshAccessToken = async () => {
    await axios.post(`${BACKEND_URL}/auth/refresh-token`,{}, {
        withCredentials: true
    });
}