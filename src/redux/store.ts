import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import pizzasReducer from './slices/pizzasSlice'


export const store = configureStore({
  reducer: {
    filter: filterReducer ,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
})

type FuncType = typeof store.getState

export type RootState = ReturnType<FuncType>