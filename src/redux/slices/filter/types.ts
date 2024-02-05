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

export interface FilterSliceStateType {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: SortType
}