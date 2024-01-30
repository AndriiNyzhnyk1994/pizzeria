import React from 'react'
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { list } from "../components/Sort";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios'
import qs from 'qs'
import {useNavigate} from 'react-router-dom'


function Home() {
    const { categoryId, sort, currentPage } = useSelector(state => state.filter)
    const sortType = sort.sortProperty
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (value) => {
        dispatch(setCurrentPage(value))
    }


    useEffect(() => {
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1)) 
            // substring(1) - для удаления первого символа строки

            const sort = list.find((obj) => obj.sortProperty === params.sortProperty)
            
            dispatch(setFilters({...params, sort}))
        }
    }, [])

// ____________________________________REQUEST USE EFFECT____________________
    useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.replace('-', '')
        // replace нужен чтобы вернуть вмето '-price' новую строку 'price'
        // потому что это часть url ссылки, а символ '-' в ней недопустим
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        // ___________________________fetch request__________________________
        // fetch(`https://653db286f52310ee6a9a45a9.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setItems(res)
        //         setIsLoading(false)
        //     })


        //_____________________________axios request________________________
        axios.get(`https://653db286f52310ee6a9a45a9.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then(res => {
            setItems(res.data)
            setIsLoading(false)
        })
        
        window.scrollTo(0, 0)
        // window.scrollTo(0, 0) автоматически скроллит вверх страницы 
    }, [categoryId, sortType, searchValue, currentPage])

    // ______________________________QS UseEffect____________________________
    useEffect(() => {
        // библиотека qs позволяет превращать обьект в специальную строку в стиле url 
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage
        })
        // теперь наша константа queryString имеет формат строки и такой стиль:
        // sortProperty=rating&categoryId=0&currentPage=1

        navigate(`?${queryString}`)
        // navigate меняет строку в браузере на то, что мы положим в аргументы функции
        // `?` - знак вопроса в строке необходим для указания параметров в URL
    }, [categoryId, sortType, currentPage])

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
            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

export default Home