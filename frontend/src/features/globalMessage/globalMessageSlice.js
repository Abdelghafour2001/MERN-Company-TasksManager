import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import globalMessageService from './globalMessageService';


const initialState = {
    globalMessagesSender: null,
    globalMessages: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// get sender global message
export const getSenderGlobalMessage = createAsyncThunk(
    'globalMessage/getSenderGlobalMessage',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await globalMessageService.getSenderGlobalMessage(token);
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


// get All global messages
export const getAllGlobalMessages = createAsyncThunk(
    'globalMessage/getAllGlobalMessages',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await globalMessageService.getAllGlobalMessages(token);
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


// create global message
export const createGlobalMessage = createAsyncThunk(
    'globalMessage/createGlobalMessage',
    async (globalMessage, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await globalMessageService.createGlobalMessage(globalMessage, token);
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


// update global message
export const updateGlobalMessage = createAsyncThunk(
    'globalMessage/updateGlobalMessage',
    async (globalMessage, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await globalMessageService.updateGlobalMessage(globalMessage, token);
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


// delete global message
export const deleteGlobalMessage = createAsyncThunk(
    'globalMessage/deleteGlobalMessage',
    async (globalMessage, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await globalMessageService.deleteGlobalMessage(globalMessage, token);
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


// create slice
const globalMessageSlice = createSlice({
    name: 'globalMessage',
    initialState,
    reducers: {
        // reset state
        reset: (state) => {
            state.globalMessagesSender = null;
            state.globalMessages = null;
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // get sender global message
        builder.addCase(getSenderGlobalMessage.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getSenderGlobalMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.globalMessagesSender = action.payload;
        });
        builder.addCase(getSenderGlobalMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // get All global messages
        builder.addCase(getAllGlobalMessages.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getAllGlobalMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.globalMessages = action.payload;
        });
        builder.addCase(getAllGlobalMessages.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // create global message
        builder.addCase(createGlobalMessage.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(createGlobalMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.globalMessagesSender.push(action.payload);
        });
        builder.addCase(createGlobalMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // update global message
        builder.addCase(updateGlobalMessage.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(updateGlobalMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            if(action.payload.receiver === 'company') {
                const index = state.globalMessages.companyGlobalMessage.findIndex(
                    (globalMessage) => globalMessage._id === action.payload._id
                );
                state.globalMessages.companyGlobalMessage.splice(index, 1)
            } else {
                const index = state.globalMessages.businessGlobalMessage.findIndex(
                    (globalMessage) => globalMessage._id === action.payload._id
                );
                state.globalMessages.businessGlobalMessage.splice(index, 1)
            }
        });
        builder.addCase(updateGlobalMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // delete global message
        builder.addCase(deleteGlobalMessage.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(deleteGlobalMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            const index = state.globalMessagesSender.findIndex(
                (globalMessage) => globalMessage._id === action.payload._id
            );
            state.globalMessagesSender.splice(index, 1);
        });
        builder.addCase(deleteGlobalMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });
    },
});


// export action
export const { reset } = globalMessageSlice.actions;
export default globalMessageSlice.reducer;