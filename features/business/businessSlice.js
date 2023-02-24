import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import businessService from "./businessService";


const initialState = {
    businesses: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// Create business
export const createBusiness = createAsyncThunk(
    'business/create',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.createBusiness(business, token);
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


// Get business
export const getBusiness = createAsyncThunk(
    'business/get',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.getBusiness(business, token);
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


// Update business
export const updateBusiness = createAsyncThunk(
    'business/update',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.updateBusiness(business, token);
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


// Delete business
export const deleteBusiness = createAsyncThunk(
    'business/delete',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.deleteBusiness(business, token);
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


// Get businesses
export const getBusinesses = createAsyncThunk(
    'business/getBusinesses',
    async (business, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await businessService.getBusinesses(business, token);
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
const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        // Reset state
        reset: (state) => {
            state.businesses = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Create business
        builder.addCase(createBusiness.pending, (state, action) => {
            // state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(createBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.businesses.push(action.payload)
        });
        builder.addCase(createBusiness.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Get business
        builder.addCase(getBusiness.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.businesses = action.payload;
        });
        builder.addCase(getBusiness.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Update business
        builder.addCase(updateBusiness.pending, (state, action) => {
            // state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.businesses = state.businesses.map((business, index) => {
                if (business._id === action.payload._id) {
                    return state.businesses[index] = action.payload;
                } else {
                    return business;
                }
            });
        });
        builder.addCase(updateBusiness.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Delete business
        builder.addCase(deleteBusiness.pending, (state, action) => {
            // state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteBusiness.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.businesses = state.businesses.filter((business) => business._id !== action.payload._id);
        });
        builder.addCase(deleteBusiness.rejected, (state, action) => {         
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });

        // Get businesses
        builder.addCase(getBusinesses.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getBusinesses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.businesses = action.payload;
        });
        builder.addCase(getBusinesses.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
            state.businesses = null;
        });
    }
});


// Export reducer
export const { reset } = businessSlice.actions;
export default businessSlice.reducer;