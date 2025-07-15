import { Button, Form, Input, Image } from "antd";
import { observer } from "mobx-react";
import './index.css'
import { useState } from "react";
import classNames from "classnames";
import { EyeInvisibleOutlined, EyeTwoTone, MailOutlined, SendOutlined } from "@ant-design/icons";


const { Item } = Form
export const Login = observer(() => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div className="login-container">
      <div className="screen-1 min-h-[400px] max-h-[700px]">
        <Image src="../../../public/logo_1.png" className="logo !w-[300px] h-[200px]" preview={false} />
        <Form
          className="login-form w-full"
          layout="vertical"
        >
          <Item
            name='userName'
            label='账号'
            rules={[{
              required: true,
              message: '请输入邮箱'
            }]}
            className="email !pb-1 w-full"
          >
            <Input placeholder="请输入邮箱" className="w-full" suffix={<MailOutlined />} />
          </Item>
          <Item
            name='password'
            label='密码'
            rules={[{
              required: true,
              message: '请输入密码'
            }]}
            className={classNames("password border-none !pb-1 ", {
              '!mb-0': !isRegister
            })}
          >
            <Input.Password
              type="password"
              placeholder="请输入密码"
              iconRender={(visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Item>
          {
            isRegister ? <Item
              name='verificationCode'
              label='验证码'
              rules={[{
                required: true,
                message: '请输入验证码'
              }]}
              className="password border-none !pb-1 !mb-0 "

            >
              <Input
                placeholder="请输入验证码"
                suffix={<SendOutlined />}
              />
            </Item> : <></>
          }
        </Form>
        <Button className="login">{isRegister ? '注册' : '登录'}</Button>
        <div className="footer">
          <Button
            color="default"
            variant="link"
            className="!px-0"
            onClick={() => {
              setIsRegister(!isRegister)
            }}
          >{isRegister ? '已有账号？登录' : '注册'}</Button>
          <Button
            color="default"
            variant="link"
            className="!px-0"
          >
            忘记密码？
          </Button>
        </div>
      </div>
    </div>

  )

})