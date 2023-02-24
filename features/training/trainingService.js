import axios from 'axios';


const API_URL = '/api/trainings/';


// get trainings
const getTrainings = async (query, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}${query}`, config);
    return response.data;
}


// create training
const createTraining = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}`, data, config);
    return response.data;
}


// update training
const updateTraining = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${data._id}`, data, config);
    return response.data;
}


// delete training
const deleteTraining = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${id}`, config);
    return response.data;
}


const trainingService = {
    getTrainings,
    createTraining,
    updateTraining,
    deleteTraining
}

export default trainingService;