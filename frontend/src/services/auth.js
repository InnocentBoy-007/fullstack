import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_ENDPOINT;

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (name, email, password, address) => {
    return axios.post(`${API_URL}/register`, { name, email, password, address });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
