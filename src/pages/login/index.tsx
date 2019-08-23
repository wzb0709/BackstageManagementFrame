import React from 'react';
import styles from "./index.scss";
import {Form,Divider,Input,Icon,Button} from 'antd'
import {router} from 'umi'

const FormItem = Form.Item

interface ILogin {
  account:string
  pwd:string
}

const Login = (props:any) => {

  const { getFieldDecorator } = props.form

  const handleSubmit = () => {
    props.form.validateFields((err:any,values:ILogin)=>{
      if(!err){
        console.log(values)
        router.replace('/')
      }
    })
  }

  return (
    <Form className={styles.loginForm}>
      <b>
        <Icon type="login" style={{ marginRight: 8 }} />
        用户登陆
      </b>
      <Divider />
      <FormItem>
        {getFieldDecorator('account', {
          rules: [
            {
              required: true,
              message: '请输入你的用户名'
            }
          ]
        })(
          <Input
            name="username"
            prefix={
              <Icon
                type="user"
                style={{ color: '#666', fontWeight: 'bold' }}
              />
            }
            placeholder="用户名"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('pwd', {
          rules: [
            {
              required: true,
              message: '请输入你的密码'
            }
          ]
        })(
          <Input
            name="password"
            type="password"
            prefix={
              <Icon
                type="lock"
                style={{ color: '#666', fontWeight: 'bold' }}
              />
            }
            placeholder="密码"
          />
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          onClick={handleSubmit}
        >
          登录
        </Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(Login)
