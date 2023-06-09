import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from '../features/authSlice';

export function useRefreshToken() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh-token', {
                withCredentials: true
            });
            dispatch(setAuth(response.data.accessToken))
            return response.data.accessToken;
        } catch (err) {
            dispatch(logout());
            navigate("/login");
        }
    }
    return refresh;
};
