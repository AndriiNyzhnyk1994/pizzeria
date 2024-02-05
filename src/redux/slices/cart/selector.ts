import { RootState } from "../../store"



export const selectCart = (state: RootState) => state.cart

export const selectItemCount = (id: string) => (state: RootState) => {
    const item = state.cart.items.find(item => item.id === id)
    if(item) {
      return item.count
    }
  }
