import axios from "axios";


const API_URL = '/api/tasks/';


// Task lists
// get all business task lists
const getAllCompanyTaskLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}list/company`, config);
    return response.data;
}

// task list search
const searchTaskLists = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}list/search${data}`, config);
    return response.data;
}

// get all user task lists
const getAllUserTaskLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}list/user`, config);
    return response.data;
}

// create task list
const createTaskList = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}list`, data, config);
    return response.data;
}

// update task list
const updateTaskList = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.put(`${API_URL}list/${data._id}`, data, config);
    return response.data;
}

// delete task list
const deleteTaskList = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}list/${data._id}`, config);
    return response.data;
}


// Completed user tasks
// get all tasks for the list
const getAllTasksForList = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const date = data.date.toLocaleString().split(',')[0];
    const response = await axios.get(`${API_URL}task/${data.taskList}?date=${date}&business=${data.business}`, config);
    return response.data;
}

// get recent user tasks
const getRecentUserTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.get(`${API_URL}task`, config);
    return response.data;
}

// create task
const createTask = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.post(`${API_URL}task/${data.taskListId}`, data, config);
    return response.data;
}

// delete task
const deleteTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const response = await axios.delete(`${API_URL}task/${id}`, config);
    return response.data;
}




const taskService = {
    getAllCompanyTaskLists,
    getAllUserTaskLists,
    searchTaskLists,
    createTaskList,
    updateTaskList,
    deleteTaskList,

    getAllTasksForList,
    getRecentUserTasks,
    createTask,
    deleteTask,
};


export default taskService;