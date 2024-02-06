import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './FullPizza.module.scss'
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cart/slice';
import { CartItemType } from '../redux/slices/cart/types';

const FullPizza: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // useNavigate - хук библиотеки React-Router,
    // который позволяет менять адресную строку через код
    const { id } = useParams()
    // useParams оповещает браузер, что нужно сделать перерисовку 
    // компонента при смене параметра в адресной строке
    // + возвращает обьект с параметрами, которые мы указали при создании Route

    const [pizzaData, setPizzaData] = useState<CartItemType>()

    const addPizza = () => {
       return pizzaData ? dispatch(addItem(pizzaData)) : ''
    }

    
    
    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://653db286f52310ee6a9a45a9.mockapi.io/items/${id}`)
                setPizzaData(data)
            } catch (error) {
                alert('Error: ' + error)
                navigate('/')
                // navigate нужен для перехода на главную страницу в случае ошибки
            }
        }
        fetchPizza()
    }, [])

    if (!pizzaData) {
        return <>Loading...</>
    }

    
    return (
        <div className={`container ${s.wrapper}`}>
            <h2 className={s.title} >{pizzaData.title}</h2>
            <div className={s.pizzaBlock}>
                <img className={s.pizzaImg} src={pizzaData.imageUrl} />
                <div className={s.pizzaInfo}>
                    <p className={s.description}>{pizzaData.description}</p>
                    <div className={s.buyOptions}>
                        <button onClick={addPizza} className='button button--outline button--add'>Добавить в корзину</button>
                        <h4 className={s.price}>{pizzaData.price}$</h4>
                    </div>
                </div>

            </div>
            <Link to={'/'}>
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    )
}

export default FullPizza