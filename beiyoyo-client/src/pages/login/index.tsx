import { Button, Form, Input, Image } from "antd";
import { observer } from "mobx-react";
import './index.css'


const { Item } = Form
export const Login = observer(() => {
  return (
    <div className="login-container">
      <div className="screen-1 min-h-[400px] max-h-[700px]">
        <Image src="../../../public/logo_2.png" className="logo !w-[300px] h-[200px]" preview={false} />
        <Form
          className="login-form"
          layout="vertical"
        >
          <Item
            name='userName'
            label='账号'
            rules={[{
              required: true,
              message: '请输入账号'
            }]}
            className="email !pb-1"
          >
            <Input placeholder="请输入账号" />
          </Item>
          <Item
            name='password'
            label='密码'
            rules={[{
              required: true,
              message: '请输入密码'
            }]}
            className="password border-none !pb-1 !mb-0 "
          >
            <Input type="password" placeholder="请输入密码" />
          </Item>
        </Form>
        <Button className="login">登录</Button>
        <div className="footer">
          <span>注册</span>
          <span>忘记密码?</span>
        </div>
      </div>
    </div>

  )

})