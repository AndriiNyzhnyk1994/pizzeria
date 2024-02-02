import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
    removeItem(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    minusItem(state, action) {
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

export const selectCart = (state) => state.cart

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer