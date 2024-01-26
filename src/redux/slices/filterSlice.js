import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log('action -', action);
      state.categoryId = action.payload.id
    },
  },
})

export const { setCategoryId } = filterSlice.actions
export default filterSlice.reducer