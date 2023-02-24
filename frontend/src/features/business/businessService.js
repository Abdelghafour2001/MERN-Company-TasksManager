import axios from "axios";


const API_URL = '/api/businesses/';


// Create business
const createBusiness = async (business, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(API_URL, business, config);

    return response.data;
}


// Get business
const getBusiness = async (businessId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}${businessId}`, config);
    return response.data;
}


// Update business
const updateBusiness = async (business, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${business._id}`, business, config);
    return response.data;
}


// Delete business
const deleteBusiness = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${id}`, config);
    return response.data;
}


// Get all businesses
const getBusinesses = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}company/${id}`, config);
    return response.data;
}


const businessService = {
    createBusiness,
    getBusiness,
    updateBusiness,
    deleteBusiness,
    getBusinesses,
};


export default businessService;