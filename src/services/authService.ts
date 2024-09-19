import axios from 'axios';
import { loginUser } from '../store/userSlice';

const API_URL = process.env.REACT_APP_API_BASE_URL as string;

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, { email, password });
    return response.data;
}

export const login = async (email: string, password: string, dispatch: any) => {
    try {
        const response: any = await axios.post(`${API_URL}/api/auth/login`, { email, password });

        if (response.status === 200) {
            dispatch(loginUser({ uid: response.data.user.uid, email: response.data.user.email }));
        } else {
            throw new Error('Login unsuccessful');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};


// export const logout = async (dispatch: AppDispatch) => {
//     try {
//         await fetch('/api/logout', { method: 'POST' });
//         dispatch(clearUser());
//     } catch (error) {
//         console.error('Logout failed:', error);
//     }
// };