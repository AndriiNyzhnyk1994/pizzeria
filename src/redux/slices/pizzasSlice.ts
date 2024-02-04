import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type FetchPizzasArgsType = Record<string, string>
// Record нужен для того, чтобы типизировать обьект, 
// в котором все элементы одинакового тип (в нашем случае string)
// Record принимает в себя 2 аргумента: ключ и значение 
// (у нас ключи string, значения тоже string)
// Это проще, чем полностью вручную расписывать тип, как здесь: {
//     sortBy: string
//     order: string
//     category: string
//     search: string
//     currentPage: string
// }

type PizzaType = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',

}

interface PizzasSliceStateType {
    items: PizzaType[]
    status: Status
}


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

export const selectPizzas = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions
export default pizzasSlice.reducer