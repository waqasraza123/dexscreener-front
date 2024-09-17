import axios from 'axios';
import { Price } from '../interfaces/services/stripeService/Price';

const API_URL = process.env.REACT_APP_API_BASE_URL as string;

export const fetchPrices = async (): Promise<Price[]> => {
    try {
        const response = await axios.get<Price[]>(`${API_URL}/api/stripe/subscriptions/prices`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch prices');
    }
};
