import { CartItemType } from "../redux/slices/cart/types"


export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
      }, 0)
}

// эта функция принимает массив товаров
// считает их общую стоимость и возвращает число с этой стоимостью