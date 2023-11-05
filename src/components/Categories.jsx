import { useState } from "react"

function Categories({ value, onChangeCategory }) {    
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    
    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => {
                    return (
                        <li
                            key={index} 
                            // если массив, который мапим, меняется, индекс нельзя использовать
                            // есть массив не меняется, можно использовать индекс 
                            onClick={() => onChangeCategory(index)}
                            className={value === index ? 'active' : ''}>{categoryName}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Categories