const axios = require('axios');


const API_URL = '/api/invites/';


// Get all user invites
const getInvites = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};


// Create invite
const createInvite = async (invite, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(API_URL, invite, config);
    return response.data;
};


// Update invite
const updateInvite = async (invite, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${invite._id}`, invite, config);
    return response.data;
}


// Delete invite
const deleteInvite = async (invite, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${invite}`, config);
    return response.data;
}


const inviteService = {
    getInvites,
    createInvite,
    updateInvite,
    deleteInvite
};


export default inviteService;