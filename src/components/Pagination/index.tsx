import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

type PaginationPropsType = {
  onChangePage: any
}

const Pagination: React.FC<PaginationPropsType> = ({onChangePage}) => {
  return (
    <ReactPaginate
                className={styles.root}
                breakLabel='...'
                nextLabel='>'
                previousLabel='<'
                onPageChange={(event) => {onChangePage(event.selected + 1)}}
                pageRangeDisplayed={8}
                pageCount={3}
            />
  )
}

export default Pagination