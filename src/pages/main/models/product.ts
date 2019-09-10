import * as productServices from '@/services/product'
import {message} from 'antd'

export interface IProduct {
  productList: Array<IProductItem>
}

export interface IProductItem {
  title: string
  id: number,
  description: string
}

export default {
  namespace: 'product',
  state: {
    productList: [],
  },
  reducers: {
    read(state: IProduct, { payload: productList }: { payload: Array<IProductItem> }) {
      return { productList }
    },
    add(state: IProduct, { payload: productItem }: { payload: IProductItem }) {
      productItem = { ...productItem, id: new Date().getTime() }
      state.productList.unshift(productItem)
      message.success('添加成功！')
      return state
    },
    delete(state: IProduct, { payload: id }: { payload: number }) {
      const index = state.productList.findIndex((item: IProductItem) => item.id === id)
      let productList = [...state.productList]
      productList.splice(index, 1)
      message.success('删除成功！')
      return {productList}
    },
  },
  effects: {
    * readProduct({},{ call, put }: any) {
      const res = yield call(productServices.getProductList)
      const list:Array<IProductItem> = res.data
      yield put({ type: 'read', payload: list })
    },
    * addProduct({ payload: item }: { payload: IProductItem }, { put }: any) {
      yield put({ type: 'add', payload: item })
    },
    * deleteProduct({ payload: id }: { payload: number }, { put }: any) {
      yield put({ type: 'delete', payload: id })
    },
  },
}
