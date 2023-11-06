import React from 'react'
import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

function Home() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categoryId, setCategoryId] = useState(0)
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'title'
    })
    useEffect(() => {
        setIsLoading(true)
        fetch(`https://653db286f52310ee6a9a45a9.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=desc`)
            .then(res => res.json())
            .then(res => {
                setItems(res)
                setIsLoading(false)
            })
            window.scrollTo(0, 0)
            // window.scrollTo(0, 0) автоматически скроллит вверх страницы 
    }, [categoryId, sortType])

    return (
        <div className="content">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onChangeSort={ (obj) => setSortType(obj) }/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        // если происходит загрузка, мы создаем пустой массив,
                        // и с помощью spread оператора и команды new Array(6) заполняем его
                        // шестью элементами (со значением undefined. Значение не важно,
                        // главное - количество элементов)
                        // Затем выполняем отрисовку компоненты Skeleton столько раз,
                        // сколько элементов в массиве (6) 
                        : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
                }

                {/* если внутри PizzaBlock все входящие пропсы 
                совпадают со свойствами obj обьекта из базы данных
                можно передать через пропсы обьект пиццы целиком таким способом   */}
            </div>
        </div>
    )
}

export default Home