import React, { FC } from 'react'
import { Modal, Form, Input } from 'antd'
import { WrappedFormUtils } from 'antd/es/form/Form'
import { IFormItem } from '@/pages/main/index'

interface IProps{
  readonly visible:boolean,
  readonly onCancel:(e: React.MouseEvent<HTMLElement>) => void
  form:WrappedFormUtils
  readonly onOk:(values:IFormItem) => void
}


const FormItem = Form.Item
const ProductModal:FC<IProps> = (props) => {
  const {getFieldDecorator} = props.form
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  }

  const handleConfirm = () => {
    props.form.validateFields((err,values:IFormItem)=>{
      if(!err){
        props.onOk(values)
      }
    })
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      title='添加产品'
      width={800}
      destroyOnClose={true}
      onOk={handleConfirm}
    >
      <FormItem label='产品标题' {...formItemLayout}>
        {getFieldDecorator('title', {
          rules: [
            {
              required: true,
              message: '请输入产品标题',
            },
          ],
        })(<Input placeholder='请输入产品标题' style={{width:"70%"}} />)}
      </FormItem>
      <FormItem label='产品描述' {...formItemLayout}>
        {getFieldDecorator('description', {
          rules: [
            {
              required: true,
              message: '请输入产品描述',
            },
          ],
        })(<Input placeholder='请输入产品描述' style={{width:"70%"}} />)}
      </FormItem>
    </Modal>
  )
}

export default Form.create<IProps>()(ProductModal)
