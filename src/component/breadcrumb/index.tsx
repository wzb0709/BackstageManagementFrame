import React, { FC, ReactNode, useEffect, useState } from 'react'
import {Breadcrumb} from 'antd'
import { withRouter, Link } from 'umi'
import RouterTypes from 'umi/routerTypes'
import { matchPath } from 'react-router'

export interface IRouterItem{
  readonly name:string
  readonly path:string
}
interface IProps extends RouterTypes{
  readonly routerList:Array<IRouterItem>
}

const Item = Breadcrumb.Item

const CBreadcrumb:FC<IProps> = (props) => {

  const [breadcrumb,setBreadcrumb] = useState<Array<ReactNode>>([])

  useEffect(() => {
    handleCreateItem()
  },[props.location.pathname])

  const handleCreateItem = () => {
    setBreadcrumb([])
    let breadcrumbItem:Array<ReactNode> = []
    props.routerList.forEach((item)=>{
      const res = matchPath(props.location.pathname,item.path)
      if(res !== null){
        breadcrumbItem.push(<Item key={res.url}><Link to={res.url}>{item.name}</Link></Item>)
      }
    })
    setBreadcrumb(breadcrumbItem)
  }

  return (
    <div style={{marginBottom:20}}>
      <Breadcrumb>
        {breadcrumb.map(item=>{
          return item
        })}
      </Breadcrumb>
    </div>
  )
}

export default withRouter(CBreadcrumb)
