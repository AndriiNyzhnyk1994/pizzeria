export type FetchPizzasArgsType = Record<string, string>
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

export type PizzaType = {
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

export interface PizzasSliceStateType {
    items: PizzaType[]
    status: Status
}
