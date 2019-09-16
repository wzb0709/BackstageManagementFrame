import React, { useEffect, Fragment, useState, FC } from 'react'
import {connect} from 'dva'
import { Button, Divider, Row, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ProductModal from '@/pages/main/productModal'
import { IProductItem } from '@/pages/main/models/product'
import CBreadcrumb from '@/component/breadcrumb'

export interface IFormItem {
  readonly title:string,
  readonly description:string
}

interface IProps {
  readonly dispatch: any,
  readonly productList:Array<IProductItem>
  readonly loading:{global:boolean}
}

const Main:FC<IProps> = (props) => {

  const [visible,setVisible] = useState<boolean>(false)
  const [initialValue,setInitialValue] = useState<IFormItem>({title:"",description:""})
  const [id,setId] = useState<number>(0)

  useEffect(() => {
    props.dispatch({
      type:'product/readProduct'
    })
  },[])

  const columns:ColumnProps<Object>[] = [
    {dataIndex:'title',title:'标题'},
    {dataIndex:'description',title:'描述'},
    {dataIndex:'id',title:'操作',render:recode=><Fragment>
        <a onClick={() => handleUpdate(recode)}>编辑</a>
        <Divider type='vertical' />
        <a style={{color:'red'}} onClick={() => handleDelete(recode)}>删除</a>
      </Fragment>},
  ]

  const handleDelete = (id:number) => {
    props.dispatch({
      type:'product/deleteProduct',
      payload:id
    })
  }

  const handleAddProduct = () => {
    setVisible(true)
    setInitialValue({title:"",description:""})
    setId(0)
  }

  const handleConfirmAddProduct = (values:IFormItem) => {
    if(id !== 0) handleConfirmUpdate(values)
    else{
      props.dispatch({
        type:'product/addProduct',
        payload:{...values,id:''}
      }).then(() => {
        setVisible(false)
      })
    }
  }

  const handleUpdate = (id:number) => {
    setId(id)
    const productItem = props.productList.find(item =>item.id === id)
    if(productItem) setInitialValue(productItem)
    setVisible(true)
  }

  const handleConfirmUpdate = (values:IFormItem) => {
    props.dispatch({
      type:'product/updateProduct',
      payload:{...values,id}
    }).then(() => setVisible(false))
  }


  return (
    <Fragment>
      <ProductModal
        onOk={handleConfirmAddProduct}
        onCancel={() => setVisible(false)}
        visible={visible}
        initialValue={initialValue}
      />
      <Row style={{marginBottom:20}}>
        <Button type='primary' onClick={handleAddProduct}>添加新产品</Button>
      </Row>
      <Table
        bordered={true}
        dataSource={props.productList}
        columns={columns}
        rowKey='id'
        loading={props.loading.global}
      />
    </Fragment>
  );
}

const mapStateToProps = (state:any) => ({
  productList:state.product.productList,
  loading:state.loading
})

export default connect(mapStateToProps)(Main);
