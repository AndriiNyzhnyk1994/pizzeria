import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter} from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux';


const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <BrowserRouter basename='/pizzeria'>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );

} else {
  console.log('Element with id ROOT not found');
}
