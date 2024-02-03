import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
    const { id } = useParams()
    // useParams оповещает браузер, что нужно сделать перерисовку 
    // компонента при смене параметра в адресной строке
    // + возвращает обьект с параметрами, которые мы указали при создании Route

    const [pizzaData, setPizzaData] = useState<{
        imageUrl: string
        title: string
        price: number
    }>({imageUrl: '', title: '', price: 0})

    
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
        <div className='container'>
            <img src={pizzaData.imageUrl} />
            <h2>{pizzaData.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, tenetur!</p>
            <h4>{pizzaData.price}$</h4>

        </div>
    )
}

export default FullPizza