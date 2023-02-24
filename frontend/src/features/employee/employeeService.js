import axios from "axios";


const API_URL = '/api/employees/';


// Create employee
const createEmployee = async (employee, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(API_URL, employee, config);

    return response.data;
}


// Get employee
const getEmployees = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}company/${id}`, config);
    return response.data;
}


// get user employees
const getUserEmployees = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}user`, config);
    return response.data;
}


// Update employee
const editEmployee = async (employee, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}${employee._id}`, employee, config);
    return response.data;
}


// Delete employee
const deleteEmployee = async (employee, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}${employee}`, config);
    return response.data;
}



const employeeService = {
    createEmployee,
    getUserEmployees,
    getEmployees,
    editEmployee,
    deleteEmployee,
};

export default employeeService;