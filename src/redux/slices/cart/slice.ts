import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from '../../../utils/getCartFromLS'
import { calcTotalPrice } from '../../../utils/calcTotalPrice'
import { CartItemType, CartSliceStateType } from '../cart/types'



const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceStateType = {
  totalPrice,
  items
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
      state.totalPrice = calcTotalPrice(state.items)
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


export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions
export default cartSlice.reducer