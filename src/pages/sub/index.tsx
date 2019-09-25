import React, { Fragment, FC } from 'react'
import { Link } from 'umi'

const SubPage:FC = () => {
  return (
    <Fragment>
      <div>this is sub page</div>
      <Link to={'/sub/list/detail/100'} >Go to detail</Link>
    </Fragment>
  )
}

export default SubPage
