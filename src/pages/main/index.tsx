import React, { useEffect, Fragment, useState, FC } from 'react'
import {connect} from 'dva'
import { Button, Row, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ProductModal from '@/pages/main/productModal'
import { IProductItem } from '@/pages/main/models/product'

export interface IFormItem {
  title:string,
  description:string
}

interface IProps {
  dispatch: any,
  productList:Array<IProductItem>
}

const Main:FC<IProps> = (props) => {

  const [visible,setVisible] = useState<boolean>(false)

  useEffect(() => {
    props.dispatch({
      type:'product/readProduct'
    })
  },[])

  const columns:ColumnProps<Object>[] = [
    {dataIndex:'title',title:'标题'},
    {dataIndex:'description',title:'描述'},
    {dataIndex:'id',title:'操作',render:recode=><Fragment>
        <a style={{color:'red'}} onClick={() => handleDelete(recode)}>删除</a>
      </Fragment>},
  ]

  const handleDelete = (id:number) => {
    props.dispatch({
      type:'product/deleteProduct',
      payload:id
    })
  }

  const handleConfirmAddProduct = (values:IFormItem) => {
    props.dispatch({
      type:'product/addProduct',
      payload:{...values,id:''}
    }).then(() => {
      setVisible(false)
    })
  }


  return (
    <Fragment>
      <ProductModal
        onOk={handleConfirmAddProduct}
        onCancel={() => setVisible(false)}
        visible={visible}
      />
      <Row style={{marginBottom:20}}>
        <Button type='primary' onClick={() => setVisible(true)}>添加新产品</Button>
      </Row>
      <Table
        bordered={true}
        dataSource={props.productList}
        columns={columns}
        rowKey='id'
      />
    </Fragment>
  );
}

const mapStateToProps = (state:any) => ({
  productList:state.product.productList
})

export default connect(mapStateToProps)(Main);
