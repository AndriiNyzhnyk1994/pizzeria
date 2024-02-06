import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import s from './FullPizza.module.scss'

const FullPizza: React.FC = () => {
    const { id } = useParams()
    // useParams оповещает браузер, что нужно сделать перерисовку 
    // компонента при смене параметра в адресной строке
    // + возвращает обьект с параметрами, которые мы указали при создании Route

    const [pizzaData, setPizzaData] = useState<{
        imageUrl: string
        title: string
        price: number
    }>()


    const navigate = useNavigate()
    // useNavigate - хук библиотеки React-Router,
    // который позволяет менять адресную строку через код

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://653db286f52310ee6a9a45a9.mockapi.io/items/${id}`)
                setPizzaData(data)
                console.log(data);
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
                    <p className={s.description}>Наслаждайтесь классическим вкусом с нашей пиццей "Маргарита" - воплощение итальянской традиции в каждом кусочке. Нежное тесто, тонко пропеченное в печи, украшено сочным томатным соусом, который пробуждает аппетит своим свежим вкусом. Щедро усыпанная ароматным базиликом, каждая долька таит в себе сокровище пряностей. А тонкие кусочки моццареллы, растекаясь по поверхности, создают гармонию в каждом укусе. Пицца "Маргарита" - это не только блюдо, это искусство, которое покоряет сердца и заставляет возвращаться снова и снова.</p>
                    <div className={s.buyOptions}>
                        <button className='button button--outline button--add'>Добавить в корзину</button>
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