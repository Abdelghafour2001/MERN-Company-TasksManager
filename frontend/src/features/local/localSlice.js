import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    time: {
        dateControl: 'week',
        startDate: new Date().toLocaleString("en-US"),
        fromDate: null,
        toDate: null,
    }
};


const localSlice = createSlice({
    name: 'local',
    initialState,
    reducers: {
        // reset state
        reset: (state) => {
            state.time = initialState.time;
        },
        // Set time
        setStartDate: (state, action) => {
            state.time.startDate = action.payload;
        },
        setFromDate: (state, action) => {
            state.time.fromDate = action.payload;
        },
        setToDate: (state, action) => {
            state.time.toDate = action.payload;
        },
        setDateControl: (state, action) => {
            state.time.dateControl = action.payload;
        }
    },
});


export const {
    reset,
    setStartDate,
    setFromDate,
    setToDate,
    setDateControl
} = localSlice.actions;
export default localSlice.reducer;