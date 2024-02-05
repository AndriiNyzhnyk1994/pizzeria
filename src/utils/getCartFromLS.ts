import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cartData')
    const items = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(items)
    return { items, totalPrice }
}

// это функция, которая вытаскивает данные из localStorage в наш проект
// чтобы не ругался ts, мы делаем проверку (равен ли localStorage true)
// если да, забираем из него данные (массив с элементами)
// если нет, ретурним пустой массив для корректной работы в slice