import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export function useRefreshToken() {

    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh-token', {
                withCredentials: true
            });
            localStorage.setItem("token", response.data.accessToken)
            return response.data.accessToken;
        } catch (err) {
            navigate("/login")
        }
    }
    return refresh;
};
