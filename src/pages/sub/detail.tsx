import React, { FC } from 'react'
import { Link } from 'umi'

const Detail:FC = () => {
  return (
    <div>
      <div>this is detail page</div>
      <Link to={'/sub/list'} >return home</Link>
    </div>
  )
}

export default Detail
