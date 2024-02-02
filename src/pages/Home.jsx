import React from 'react'
import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';

function Home() {
    const { categoryId, sort, currentPage } = useSelector(selectFilter)
    const { items, status } = useSelector(selectPizzas)
    const searchValue = useSelector(state => state.filter.searchValue)

    const sortType = sort.sortProperty
    const dispatch = useDispatch()

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (value) => {
        dispatch(setCurrentPage(value))
    }

    const getPizzas = async () => {
        const sortBy = sortType.replace('-', '')
        // replace нужен чтобы вернуть вмето '-price' новую строку 'price'
        // потому что это часть url ссылки, а символ '-' в ней недопустим
        const order = sortType.includes('-') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''
        
        //_____________________________axios request
        dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }))
        window.scrollTo(0, 0)
        // window.scrollTo(0, 0) автоматически скроллит вверх страницы
    }

    useEffect(() => {
        getPizzas()
    }, [categoryId, sortType, searchValue, currentPage])


    const pizzas = items.map(obj => <Link to={`/pizza/${obj.id}`}>
        <PizzaBlock key={obj.id} {...obj} />
    </Link>)

    return (
        <div className="content">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error'
                    ? <NotFound />
                    : <div className="content__items">

                        {
                            status === "loading"
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
            }


            <Pagination onChangePage={onChangePage} />
        </div>
    )
}

export default Home