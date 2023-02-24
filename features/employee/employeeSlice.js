import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeService from "./employeeService";


const initialState = {
    employees: null,
    userEmployees: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// Get all employees
export const getEmployees = createAsyncThunk(
    'employee/getAll',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.getEmployees(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Get user employees
export const getUserEmployees = createAsyncThunk(
    'employee/getUser',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.getUserEmployees(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



// Create employee
export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.createEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Update employee
export const editEmployee = createAsyncThunk(
    'employee/editEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.editEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Delete employee
export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.deleteEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create slice
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.employees = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Get all employees
        builder.addCase(getEmployees.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        });
        builder.addCase(getEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Get user employees
        builder.addCase(getUserEmployees.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getUserEmployees.fulfilled, (state, action) => {
            state.userEmployees = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
        });
        builder.addCase(getUserEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Create employee
        builder.addCase(createEmployee.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(createEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.employees.push(action.payload);
        });
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Update employee
        builder.addCase(editEmployee.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(editEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.employees.map((employee, index) =>
                {
                    if(employee._id === action.payload._id) {
                        state.employees[index] = action.payload;
                        return true;
                    } else {
                        return false;
                    }
                }
            )
        });
        builder.addCase(editEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // Delete employee
        builder.addCase(deleteEmployee.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isError = false;
            state.employees = state.employees.filter(employee => employee._id !== action.payload._id);
        });
        builder.addCase(deleteEmployee.rejected, (state, action) => {
            state.isLoadingEmployee = false;
            state.isError = true;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;