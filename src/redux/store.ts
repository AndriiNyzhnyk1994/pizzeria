import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filter/slice'
import cartReducer from './slices/cart/slice'
import pizzasReducer from './slices/pizzasSlice'
import { useDispatch } from 'react-redux'


export const store = configureStore({
  reducer: {
    filter: filterReducer ,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
})

type FuncType = typeof store.getState

export type RootState = ReturnType<FuncType>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()