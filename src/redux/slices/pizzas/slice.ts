import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FetchPizzasArgsType, PizzasSliceStateType, PizzaType, Status } from './types'



// это AsyncThunk. Он предназначен для обработки запросов на сервер
// и обрботки ответов, полученных с сервера

// PizzaType[] - тип того, что вернёт функция
// FetchPizzasArgsType - тип параметров для async функции 
export const fetchPizzas = createAsyncThunk<PizzaType[], FetchPizzasArgsType>(
    'pizzas/fetchPizzasStatus',
    async (params, thunkAPI) => {
        const { sortBy, order, category, search, currentPage } = params
        const { data } = await axios.get<PizzaType[]>(`https://653db286f52310ee6a9a45a9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
        // если бы мы не типизировали asyncThunk при создании (сразу после createAsyncThunk)
        // то типизировали бы отдельно параметры ( params: FetchPizzasArgsType )
        // и то, что функция возвращает ( return data as CartItemType[] )
    }
)


const initialState: PizzasSliceStateType = {
    items: [],
    status: Status.LOADING //loading, success, error
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaType[]>) {
            console.log(action);
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.items = []
                state.status = Status.LOADING
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = Status.SUCCESS
                state.items = action.payload
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = Status.ERROR
                state.items = []
            })
    },
})

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer