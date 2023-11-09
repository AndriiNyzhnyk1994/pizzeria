import React from 'react'
import styles from './Search.module.scss'

const Search = () => {
  return (
    <input placeholder='Поиск пиццы...' className={styles.root} />
  )
}

export default Search