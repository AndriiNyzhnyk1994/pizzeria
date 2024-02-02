import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function FullPizza() {
    const { id } = useParams()
    const [pizzaData, setPizzaData] = useState()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://653db286f52310ee6a9a45a9.mockapi.io/items/${id}`)
                setPizzaData(data)
                console.log(data);    
            } catch (error) {
                console.log('Error:', error);
            }
        }
        fetchPizza()
    }, [])

    if(!pizzaData) {
        return ''
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