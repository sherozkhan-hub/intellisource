import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    latestpost: [],
    error: null,
    loading: false,
}

export const latestpostSlice = createSlice({
    name: 'latestpost',
    initialState,
    reducers: {
        addPostSuccess: (state, action) => {
            state.latestpost.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addPostSuccess, setLoading, setError } = latestpostSlice.actions;

export default latestpostSlice.reducer;
