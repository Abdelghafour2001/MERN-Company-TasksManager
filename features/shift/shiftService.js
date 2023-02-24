import axios from "axios";


const API_URL = '/api/shifts/';


// Get all employees for a business
const getAllBusinessShifts = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}?business=${data.business}&fromDate=${data.fromDate}&toDate=${data.toDate}`, config);

    return response.data;
}


// Get all managers shifts
const getManagerOpenShifts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}/manager`, config);

    return response.data;
}


// Create Shift
const createShift = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}`, data, config);

    return response.data;
}


// Edit Shift
const editShift = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${data.id}`, data, config);

    return response.data;
}


// Delete Shift
const deleteShift = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${id}`, config);

    return response.data;
}


// Copy Previous Week Shifts
const copyPreviousWeekShifts = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}copy/${data.business}`, data, config);

    return response.data;
}


// Get User Shifts
const getUserShifts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}user`, config);

    return response.data;
}


// Pick Up Shift
const pickUpShift = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}pickup/${id}`, null, config);

    return response.data;
}


// export service
const shiftService = {
    getAllBusinessShifts,
    getManagerOpenShifts,
    createShift,
    editShift,
    deleteShift,
    copyPreviousWeekShifts,
    getUserShifts,
    pickUpShift,
};

export default shiftService;
