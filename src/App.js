import "./App.css";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import './scss/app.scss';
import pizzas from './assets/pizzas.json'


function App() {
  // https://653db286f52310ee6a9a45a9.mockapi.io/items

  fetch('https://653db286f52310ee6a9a45a9.mockapi.io/items').then((res) => {
    return res.json()
  }).then((res) => console.log(res))

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
            {pizzas.map(obj => {
              return (
                <PizzaBlock key={obj.id} {...obj} />
                // если внутри PizzaBlock все входящие пропсы 
                // совпадают со свойствами obj обьекта из базы данных
                // можно передать через пропсы обьект пиццы целиком таким способом  
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
