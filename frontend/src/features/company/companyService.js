import axios from 'axios';


const API_URL = '/api/companies/';


// Create company
const createCompany = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.post(API_URL, data, config);

    // if (response.data) {
    //     localStorage.setItem('company', JSON.stringify(response.data)); // Set user in localStorage
    // }

    return response.data;
}


// Get company
const getCompany = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}user`, config);
    return response.data;
}


// Update company
const updateCompany = async (id, companyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${id}`, companyData, config);
    return response.data;
}


// Delete company
const deleteCompany = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${id}`, config);
    return response.data;
}


// Change role
const changeRole = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}${data.id}/changeRole`, data, config);
    return response.data;
}


// Remove user
const removeUser = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}${data.id}/removeUser`, data, config);
    return response.data;
}

const companyService = {
    createCompany,
    getCompany,
    updateCompany,
    deleteCompany,
    changeRole,
    removeUser
};


export default companyService;