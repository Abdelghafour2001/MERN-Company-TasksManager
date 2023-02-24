import axios from 'axios';


const API_URL = '/api/globalMessages/';


// get sender global message
const getSenderGlobalMessage = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}/sender`, config);
    return response.data;
}


// get All global messages
const getAllGlobalMessages = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}`, config);
    return response.data;
}


// create global message
const createGlobalMessage = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}`, data, config);
    return response.data;
}


// update global message
const updateGlobalMessage = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${data._id}`, data, config);
    return response.data;
}


// delete global message
const deleteGlobalMessage = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${id}`, config);
    return response.data;
}


const globalMessageService = {
    getSenderGlobalMessage,
    getAllGlobalMessages,
    createGlobalMessage,
    updateGlobalMessage,
    deleteGlobalMessage,
}


export default globalMessageService;