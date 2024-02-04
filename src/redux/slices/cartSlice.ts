import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItemType = {
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface CartSliceStateType {
  totalPrice: number
  items: CartItemType[]
} 

const initialState: CartSliceStateType = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const foundItem = state.items.find((obj) => obj.id === action.payload.id)
      if (foundItem) {
        foundItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
    }, 
    removeItem(state, action: PayloadAction<string>) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    minusItem(state, action: PayloadAction<string>) {
      const foundItem = state.items.find(item => item.id === action.payload)
      if(foundItem) {
        foundItem.count--
      }
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  },
})


export const selectCart = (state: RootState) => state.cart

export const selectItemCount = (id: string) => (state: RootState) => {
    const item = state.cart.items.find(item => item.id === id)
    if(item) {
      return item.count
    }
  }

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer