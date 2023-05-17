import axios from '../api/axios';

export function useRefreshToken() {

    const refresh = async () => {
        const response = await axios.get('/refresh-token', {
            withCredentials: true
        });
        localStorage.setItem("token", response.data.accessToken)
        return response.data.accessToken;
    }
    return refresh;
};
