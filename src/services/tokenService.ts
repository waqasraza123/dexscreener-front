import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchTokens = async () => {
	const response = await axios.get(`${API_URL}/api/dex/tokens`);
	return response.data;
};
