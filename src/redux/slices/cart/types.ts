export type CartItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
    description?: string
  }
  
  export interface CartSliceStateType {
    totalPrice: number
    items: CartItemType[]
  } 
  