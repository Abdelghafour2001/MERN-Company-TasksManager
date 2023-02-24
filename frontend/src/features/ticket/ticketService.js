import axios from 'axios';


const API_URL = '/api/tickets/';


// Get all tickets for a manager
const getAllManagerTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.get(`${API_URL}manager`, config);
    return response.data;
};


// Get all tickets for an employee
const getAllEmployeeTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.get(`${API_URL}employee`, config);
    return response.data;
};


// Create a ticket
const createTicket = async (ticket, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.post(API_URL, ticket, config);
    return response.data;
}


// Update a ticket
const updateTicket = async (ticket, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.put(`${API_URL}${ticket._id}`, ticket, config);
    return response.data;
}


// Delete a ticket
const deleteTicket = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    const response = await axios.delete(`${API_URL}${id}`, config);
    return response.data;
}


const ticketService = {
    getAllManagerTickets,
    getAllEmployeeTickets,
    createTicket,
    updateTicket,
    deleteTicket,
};

export default ticketService;