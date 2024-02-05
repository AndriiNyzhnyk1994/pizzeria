import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceStateType, SortPropertyEnum, SortType } from './types'





const initialState: FilterSliceStateType = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
})


export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions
export default filterSlice.reducer