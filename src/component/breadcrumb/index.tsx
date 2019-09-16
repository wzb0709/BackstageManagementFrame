import React, { FC, ReactNode, useEffect, useState } from 'react'
import {Breadcrumb} from 'antd'
import { withRouter, Link } from 'umi'
import RouterTypes from 'umi/routerTypes'

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
      const breadcrumbList:Array<string> = item.path.split('/')
      const routerList:Array<string> = props.location.pathname.split('/')
      let flag:boolean = true
      for(let i = 0; i < breadcrumbList.length; i++){
        flag = breadcrumbList[i] === routerList[i] || breadcrumbList[i].includes(':')
        if(!flag) break;
      }
      if(flag){
        breadcrumbItem.push(<Item key={item.path}><Link to={item.path}>{item.name}</Link></Item>)
      }
    })
    setBreadcrumb(breadcrumbItem)
    // const breadcrumbItems = [
    //   <Breadcrumb.Item key="home">
    //     <Link to="/">Home</Link>
    //   </Breadcrumb.Item>,
    // ].concat(extraBreadcrumbItems)
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
