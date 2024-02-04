import React from 'react'
import styles from './Search.module.scss'
// @ts-ignore
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'


const Search: React.FC = () => {
  const [value, setValue] = React.useState('')

  const dispatch = useDispatch()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    //document.querySelector('input').focus() - неправильный подход
    inputRef.current?.focus() // - правильный подход
    // знак вопроса после current - это проверка на true/false,
    // Есть ли свойство current внутри inputRef.
    // Если true, выполняем метод focus()
  }


  // хук useCallback позволяет не пересоздавать функцию заново 
  // при перерисовке компоненты.
  const updateSearchValue = React.useCallback(
    debounce((value: string) => {
      // debounce - функция из библиотеки lodash (для выполнения кода с задержкой)
      dispatch(setSearchValue(value))
    }, 300), []
  )

  const onChangeInput = (e: any) => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }


  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="18px"
        version="1.1"
        viewBox="0 0 18 18"
        width="18px"
        xmlns="http://www.w3.org/2000/svg"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g fill="#000000" id="Core" transform="translate(-339.000000, -381.000000)"><g id="search" transform="translate(339.000000, 381.000000)"><path d="M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z" id="Shape" /></g></g></g></svg>

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        placeholder='Поиск пиццы...'
        className={styles.input} />
      {value &&
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>}

    </div>

  )
}

export default Search