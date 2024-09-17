import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL as string;

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/auth/register`, { email, password });
    return response.data;
}

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    return response.data;
}