import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import trainingService from './trainingService';


const initialState = {
    trainings: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    msg: '',
};


// get trainings
export const getTrainings = createAsyncThunk(
    'training/getTrainings',
    async (query, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await trainingService.getTrainings(query, token);
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


// create training
export const createTraining = createAsyncThunk(
    'training/createTraining',
    async (training, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await trainingService.createTraining(training, token);
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


// update training
export const updateTraining = createAsyncThunk(
    'training/updateTraining',
    async (training, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await trainingService.updateTraining(training, token);
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


// delete training
export const deleteTraining = createAsyncThunk(
    'training/deleteTraining',
    async (trainingId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await trainingService.deleteTraining(trainingId, token);
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
const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        // reset state
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.msg = '';
        },
    },
    extraReducers: (builder) => {
        // get trainings
        builder.addCase(getTrainings.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTrainings.fulfilled, (state, action) => {
            state.trainings = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getTrainings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // create training
        builder.addCase(createTraining.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createTraining.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.trainings.push(action.payload);
        });
        builder.addCase(createTraining.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // update training
        builder.addCase(updateTraining.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateTraining.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            const index = state.trainings.findIndex(
                (training) => training._id === action.payload._id
            );
            state.trainings[index] = action.payload;
        });
        builder.addCase(updateTraining.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });

        // delete training
        builder.addCase(deleteTraining.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteTraining.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.trainings = state.trainings.filter(
                (training) => training._id !== action.payload._id
            );
        });
        builder.addCase(deleteTraining.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.msg = action.payload;
        });
    },
});


// export reducer
export const { reset } = trainingSlice.actions;
export default trainingSlice.reducer;