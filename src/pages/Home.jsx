import React from 'react'
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios'

function Home() {
    const { categoryId, sort } = useSelector(state => state.filter)
    const sortType = sort.sortProperty

    const dispatch = useDispatch()

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const { searchValue } = React.useContext(SearchContext)
    const [items, setItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.replace('-', '')
        // replace нужен чтобы вернуть вмето '-price' новую строку 'price'
        // потому что это часть url ссылки, а символ '-' в ней недопустим
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        // ___________________________fetch request
        // fetch(`https://653db286f52310ee6a9a45a9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setItems(res)
        //         setIsLoading(false)
        //     })


        //_____________________________axios request
        axios.get(`https://653db286f52310ee6a9a45a9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then(res => {
            setItems(res.data)
            setIsLoading(false)
        })
        
        window.scrollTo(0, 0)
        // window.scrollTo(0, 0) автоматически скроллит вверх страницы 
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />)




    return (
        <div className="content">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
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
                        : pizzas
                }

                {/* если внутри PizzaBlock все входящие пропсы 
                совпадают со свойствами obj обьекта из базы данных
                можно передать через пропсы обьект пиццы целиком таким способом   */}
            </div>
            <Pagination onChangePage={number => { setCurrentPage(number) }} />
        </div>
    )
}

export default Home