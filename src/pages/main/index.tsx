import React, { useEffect, Fragment, useState, FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'dva'
import { Button, Divider, Row, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import ProductModal from '@/pages/main/productModal'
import { IProductItem } from '@/pages/main/models/product'

export interface IFormItem {
  readonly title: string,
  readonly description: string
}

interface IProps {
  readonly productList: Array<IProductItem>
  readonly loading: { global: boolean }
}

interface IConnectState {
  product: {
    productList: Array<IProductItem>
  },
  loading: {
    global: boolean
  }
}

const Main: FC<IProps> = (props) => {
  //控制添加编辑模态框
  const [visible, setVisible] = useState<boolean>(false)
  //控制传入模态框的对象值
  const [initialValue, setInitialValue] = useState<IFormItem>({ title: '', description: '' })
  //控制修改的产品ID
  const [id, setId] = useState<number>(0)

  const dispatch = useDispatch()
  //获取产品列表
  const getProductList = useCallback(() => {
    dispatch({ type: 'product/readProduct' })
  }, [dispatch])

  //初次启动调用函数
  useEffect(() => {
    getProductList()
  }, [getProductList])

  //获得数据源
  const dataSource = useSelector((state: IConnectState) => state.product.productList)
  //获得loading状态
  const loading = useSelector((state: IConnectState) => state.loading.global)


  const columns: ColumnProps<Object>[] = [
    { dataIndex: 'title', title: '标题' },
    { dataIndex: 'description', title: '描述' },
    {
      dataIndex: 'id', title: '操作', render: recode => <Fragment>
        <a onClick={() => handleUpdate(recode)}>编辑</a>
        <Divider type='vertical'/>
        <a style={{ color: 'red' }} onClick={() => handleDelete(recode)}>删除</a>
      </Fragment>,
    },
  ]

  const handleDelete = (id: number) => {
    dispatch({
      type: 'product/deleteProduct',
      payload: id,
    })
  }

  const handleAddProduct = () => {
    setVisible(true)
    setInitialValue({ title: '', description: '' })
    setId(0)
  }

  const handleConfirmAddProduct = async (values: IFormItem) => {
    if (id !== 0){
      await handleConfirmUpdate(values)
    } else {
      await dispatch({
        type: 'product/addProduct',
        payload: { ...values, id: '' },
      })
      setVisible(false)
    }
  }

  const handleUpdate = (id: number) => {
    setId(id)
    const productItem = dataSource.find(item => item.id === id)
    if (productItem) setInitialValue(productItem)
    setVisible(true)
  }

  const handleConfirmUpdate = async (values: IFormItem) => {
    await dispatch({
      type: 'product/updateProduct',
      payload: { ...values, id },
    })
    setVisible(false)
  }


  return (
    <Fragment>
      <ProductModal
        onOk={handleConfirmAddProduct}
        onCancel={() => setVisible(false)}
        visible={visible}
        initialValue={initialValue}
      />
      <Row style={{ marginBottom: 20 }}>
        <Button type='primary' onClick={handleAddProduct}>添加新产品</Button>
      </Row>
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        rowKey='id'
        loading={loading}
      />
    </Fragment>
  )
}

export default Main
