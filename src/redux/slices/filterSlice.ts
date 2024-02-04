import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  PRICE_DESC = 'price', 
  TITLE_DESC = 'title',
  RATING_ASC = '-rating',
  PRICE_ASC = '-price', 
  TITLE_ASC = '-title',
}

export type SortType = {
  name: string,
  sortProperty: SortPropertyEnum
}

interface FilterSliceStateType {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: SortType
}

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

export const selectFilterSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions
export default filterSlice.reducer