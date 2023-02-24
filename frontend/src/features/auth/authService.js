import axios from 'axios';


const API_URL = '/api/users/';


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Set user in localStorage
    }

    return response.data;
};


// Logout
const logout = async () => {
    localStorage.removeItem('user'); // Remove user from localStorage
};


// Login
const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Set user in localStorage
    }

    return response.data;
}


// Edit user
const editUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.put(API_URL, userData, config);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data)); // Set user in localStorage
    }

    return response.data;
}


const authService = {
    register,
    logout,
    login,
    editUser,
};


export default authService;