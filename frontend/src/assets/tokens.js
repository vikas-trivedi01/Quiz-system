import { BACKEND_URL } from "./constants";

export const refreshAccessToken = async () => {
    await axios.post(`${BACKEND_URL}/auth/refresh-token`,{}, {
        withCredentials: true
    });
}