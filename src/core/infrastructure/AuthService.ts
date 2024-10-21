// src/infrastructure/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const authService = {
    registerUser: (userData: Record<string, any>) => {
        const formattedUserData = {
            email: userData.email,
            username: userData.username || userData.email,
            password: userData.password,
            name: userData.first_name,
            last_name: userData.last_name,
        };
        return axios.post(`${API_URL}/auth/local/register`, formattedUserData);
    },

    loginUser: (userData: Record<string, any>) => {
        const formattedUserData = {
            identifier: userData.identifier, // Email or username
            password: userData.password,
        };
        return axios.post(`${API_URL}/auth/local`, formattedUserData);
    },

    getProfile: (token: string) => {
        return axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
