import "./App.css";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";
import Sort from "./components/Sort";
import './scss/app.scss';
import { useEffect, useState } from "react";


function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://653db286f52310ee6a9a45a9.mockapi.io/items')
      .then(res => res.json())
      .then(res => {
        setItems(res)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

            {
              isLoading
                ? [...new Array(6)].map((_, index) => <Skeleton />)
                // если загрузка в процессе выполнения, мы создаем пустой массив,
                // с помощью spread оператора и команды new Array(6) заполняем его
                // шестью элементами (со значением undefined. Значение не важно,
                // главное - количество элементов)
                // Затем выполняет отрисовку компоненты Skeleton столько раз,
                // сколько элементов в массиве (6) 
                : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
            }

            {/* если внутри PizzaBlock все входящие пропсы 
                совпадают со свойствами obj обьекта из базы данных
                можно передать через пропсы обьект пиццы целиком таким способом   */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
