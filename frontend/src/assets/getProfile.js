import axios from "axios";
import { BACKEND_URL } from "./constants.js";
import { refreshAccessToken } from "./tokens.js";

export const fetchProfile = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/users/profile`, {
            withCredentials: true,
        });

        if (response?.status === 200) {
            return response?.data?.data?.profile;
        }
    } catch (error) {
        if (error?.response?.status === 401) {
            try {
                await refreshAccessToken();
                await fetchProfile();
            } catch (refreshError) {
                alert("Please login again");
                navigate("/users/login");
            }
        } else {
            alert(error?.message);
        }
    }
};