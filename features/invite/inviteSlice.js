import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import inviteService from './inviteService';


const initialState = {
    invites: [],
    invitesSent: [],
    invitesCompany: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
};


// Get all user invites
export const getInvites = createAsyncThunk(
    'invite/getInvites',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inviteService.getInvites(token);
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


// Create invite
export const createInvite = createAsyncThunk(
    'invite/createInvite',
    async (invite, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inviteService.createInvite(invite, token);
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


// Update invite
export const updateInvite = createAsyncThunk(
    'invite/updateInvite',
    async (invite, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inviteService.updateInvite(invite, token);
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


// Delete invite
export const deleteInvite = createAsyncThunk(
    'invite/deleteInvite',
    async (invite, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await inviteService.deleteInvite(invite, token);
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


const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        // reset state
        reset: (state) => {
            state.invites = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Get all user invites
        builder.addCase(getInvites.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(getInvites.fulfilled, (state, action) => {
            state.invites = action.payload.invites;
            state.invitesSent = action.payload.invitesSent;
            state.invitesCompany = action.payload.invitesCompany;
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(getInvites.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // Create invite
        builder.addCase(createInvite.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(createInvite.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.invitesSent.push(action.payload.invite);
            state.msg = action.payload.msg;
        });
        builder.addCase(createInvite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // Update invite
        builder.addCase(updateInvite.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(updateInvite.fulfilled, (state, action) => {
            state.invites = state.invites.filter(invite => invite._id !== action.payload.invite._id);
            state.invitesCompany = state.invitesCompany.filter(invite => invite._id !== action.payload.invite._id);
            state.invitesSent = state.invitesSent.filter(invite => invite._id !== action.payload.invite._id);
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = action.payload.msg;
        });
        builder.addCase(updateInvite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });

        // Delete invite
        builder.addCase(deleteInvite.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(deleteInvite.fulfilled, (state, action) => {
            state.invitesSent = state.invitesSent.filter(invite => invite._id !== action.payload._id);
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.msg = '';
        });
        builder.addCase(deleteInvite.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });
    }
});


export const { reset } = inviteSlice.actions;
export default inviteSlice.reducer;