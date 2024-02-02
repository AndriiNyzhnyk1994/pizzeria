import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get(`https://653db286f52310ee6a9a45a9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

const initialState = {
    items: [],
    status: 'loading' //loading, success, error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            console.log(action);
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.items = []
                state.status = 'loading'
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = 'success'
                state.items = action.payload
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error'
                state.items = []
            })
    },
})

export const selectPizzas = (state) => state.pizzas

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer