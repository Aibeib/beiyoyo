/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Image, Tooltip, Space } from "antd";
import { observer } from "mobx-react";
import "./index.css";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  SendOutlined,
} from "@ant-design/icons";
import OneMinuteCountdown from "@/components/Countdown";
import { BtnTextMapper, LoginFormType } from "./const";
import axios from "axios";
import getApi from '@/api/request'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context";

const { Item } = Form;

export const Login = observer(() => {
  const [loginFormType, setLoginFormType] = useState(LoginFormType.Login);
  const [isSended, setIsSended] = useState(false);
  const [form] = Form.useForm();
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { state } = useAppContext()

  const navigate = useNavigate();

  const mailSuffix = useMemo(() => {
    if (loginFormType !== LoginFormType.Login) {
      if (isSended) {
        return (
          <OneMinuteCountdown
            deadline={15000}
            onFinish={() => setIsSended(false)}

          />
        );
      } else {
        return (
          <Tooltip title={"发送验证码"}>
            <SendOutlined
              className={classNames(
                "!text-[#757575] hover:!text-[#1f2327] cursor-pointer"
              )}
              onClick={async () => {
                const mail = await form.getFieldValue("email");
                if (mail) {
                  setIsSended(true);
                  const res = await axios({
                    url: "/proxy-api/api/verification_code",
                    method: "POST",
                    data: {
                      email: mail,
                    },
                  });
                  console.log(res, "res");
                }
              }}
            />
          </Tooltip>
        );
      }
    }
    return <MailOutlined className="!text-[#757575]" />;
  }, [form, isSended, loginFormType]);

  useEffect(() => {
    form.resetFields()
  }, [loginFormType])

  return (
    <div className="login-container min-h-[800px] overflow-auto ">
      <div className="screen-1 min-h-[400px]  flex justify-center w-[360px]">
        <Image
          rootClassName="!flex !justify-center !items-center"
          src="../../../public/logo_1.png"
          className="logo !w-[240px]"
          preview={false}

        />
        <Form
          className="login-form w-full not-last:!mb-6"
          layout="vertical"
          form={form}
          onValuesChange={(value, allValues) => {
            const { password } = allValues
            setIsShowPassword(password)
          }}
        >
          <Space direction='vertical' className="w-full" size={24}  >
            <Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱",
                },
              ]}
              className="email !pb-1 w-full !mb-0"
            >
              <Input
                placeholder="请输入邮箱"
                className="w-full"
                suffix={mailSuffix}
                variant="borderless"
              />
            </Item>
            <Item
              name="password"
              label={
                loginFormType === LoginFormType.UpdatePassword ? "新密码" : "密码"
              }
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
              className={classNames("password !border-none !pb-1 !mb-0", {
              })}
            >
              <Input.Password
                type="password"
                placeholder="请输入密码"
                iconRender={(visible: boolean) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                variant="borderless"
              />
            </Item>
            {
              loginFormType !== LoginFormType.Login && isShowPassword && <Item
                name="confirmPassword"
                label="确认密码"
                rules={[
                  {
                    required: true,
                    message: "请输入密码",
                  },
                ]}
                className={classNames("password !border-none !pb-1 !mb-0", {
                })}
              >
                <Input.Password
                  type="password"
                  placeholder="请再次输入密码"
                  iconRender={(visible: boolean) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  variant="borderless"
                  onChange={async (e) => {
                    const confirmPwd = e.target.value
                    const pwd = await form.getFieldValue('password')
                    if (pwd !== confirmPwd) {
                      form.setFields([{ name: 'confirmPassword', errors: ['两次密码输入不一致！'] }])
                    }
                  }}
                />
              </Item>
            }
            {loginFormType !== LoginFormType.Login && (
              <Item
                name="verificationCode"
                label="验证码"
                rules={[
                  {
                    required: true,
                    message: "请输入验证码",
                  },
                ]}
                className="password border-none !pb-1 !mb-0"
              >
                <Input placeholder="请输入验证码" variant="borderless" />
              </Item>
            )}
          </Space>
        </Form>
        <Button
          className="create-btn p-[1em] !bg-[#3e4684] !text-[white] !border-none !rounded-[30px] !font-[600] hover:!bg-[rgba(62,70,132,0.8)] !flex !items-center !justify-center"
          onClick={async () => {
            const { email, password, verificationCode } = await form.getFieldsValue();
            try {
              setLoading(true)
              if (loginFormType === LoginFormType.Register) {
                await getApi.registerUser({ email, password, verificationCode })
                setLoading(false)
                setLoginFormType(LoginFormType.Login)
              } else if (loginFormType === LoginFormType.Login) {
                await getApi.login({ email, password })
                setLoading(false)
                state.messageApi.success('登录成功！')
                navigate('/home')
              } else {
                await getApi.registerUser({ email, password, verificationCode })
                setLoading(false)
                setLoginFormType(LoginFormType.Login)
              }
            } catch (e: any) {
              console.error(e)
              setLoading(false)
              state.messageApi.error(e.message)
            }

          }}
          loading={loading}
        >
          {BtnTextMapper[loginFormType]}
        </Button>
        <div className="footer mt-3">
          {loginFormType === LoginFormType.Register ? (
            <Button
              color="default"
              variant="link"
              className="!px-0"
              onClick={async () => {

                setLoginFormType(LoginFormType.Login);
              }}
            >
              已有账号？登录
            </Button>
          ) : (
            <Button
              color="default"
              variant="link"
              className="!px-0"
              onClick={async () => {
                setLoginFormType(LoginFormType.Register);
              }}
            >
              注册
            </Button>
          )}

          {loginFormType !== LoginFormType.UpdatePassword ? (
            <Button
              color="default"
              variant="link"
              className="!px-0"
              onClick={async () => {

                setLoginFormType(LoginFormType.UpdatePassword);
              }}
            >
              忘记密码？
            </Button>
          ) : (
            <Button
              color="default"
              variant="link"
              className="!px-0"
              onClick={async () => {
                setLoginFormType(LoginFormType.Login);
              }}
            >
              登录
            </Button>
          )}
        </div>
      </div>
    </div >
  );
});
