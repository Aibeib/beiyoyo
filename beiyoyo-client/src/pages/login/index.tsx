/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Image, Tooltip, Space, theme } from "antd";
import { observer } from "mobx-react";
import "./index.css";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  MoonFilled,
  SendOutlined,
  SunFilled,
} from "@ant-design/icons";
import OneMinuteCountdown from "@/components/countDown";
import { BtnTextMapper, LoginFormType } from "./const";
import axios from "axios";
import getApi from "@/api/request";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context";
import userStore from "@/stores/userStore";
import { UIStore } from '@/stores/index'
import { Them } from "@/stores/type";

const { Item } = Form;

export const Login = observer(() => {
  const [loginFormType, setLoginFormType] = useState(LoginFormType.Login);
  const [isSended, setIsSended] = useState(false);
  const [form] = Form.useForm();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, registerUser } = userStore
  const { them, setThem } = UIStore
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  const { messageApi } = useAppContext();

  const navigate = useNavigate();

  const mailSuffix = useMemo(() => {
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
              "!text-[#757575]  cursor-pointer", {
              "hover:!text-[#1f2327]": them === Them.Light,
              "hover:!text-[white]": them === Them.Dark,
            }
            )}
            onClick={async () => {
              const mail = await form.getFieldValue("email");
              if (mail) {
                setIsSended(true);
                await axios({
                  url: "/proxy-api/api/verification_code",
                  method: "POST",
                  data: {
                    email: mail,
                  },
                });
              }
            }}
          />

        </Tooltip>
      );
    }
  }, [form, isSended, loginFormType, them]);

  useEffect(() => {
    form.resetFields();
  }, [loginFormType]);

  return (
    <div
      className={classNames("login-container min-h-[800px] relative overflow-auto", {
        'shadow-[0_0_2em_#1f2327]': true
      })}
      style={{
        background: colorBgContainer
      }}
    >
      <div className="mx-3 absolute z-10 top-6 right-6">
        {them === Them.Light ? <MoonFilled
          onClick={() => {
            setThem(Them.Dark)
          }}
        /> : <SunFilled

          onClick={() => {
            setThem(Them.Light)
          }}
          className="!text-[white]"
        />
        }
      </div>
      <div className={classNames("screen-1 min-h-[400px]  flex justify-center w-[360px]", {
        'shadow-[0_0_2em_#ffffff26]': them === Them.Dark,
        'shadow-[0_0_2em_#e6e9f9]': them === Them.Light,
      })}>
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
          onValuesChange={(_, allValues) => {
            const { password } = allValues;
            setIsShowPassword(!!password);
          }}
        >
          <Space direction="vertical" className="w-full" size={24}>
            <Item
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱",
                },
              ]}
              className={classNames("email !pb-1 w-full !mb-0", {
                'shadow-[0_0_2em_#ffffff26]': them === Them.Dark,
                'shadow-[0_0_2em_#e6e9f9]': them === Them.Light,
              })}
            >
              <Input
                placeholder="请输入邮箱"
                className="w-full"
                suffix={<MailOutlined className="!text-[#757575]" />}
                variant="borderless"
              />
            </Item>
            <Item
              name="password"
              label={
                loginFormType === LoginFormType.UpdatePassword
                  ? "新密码"
                  : "密码"
              }
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
              className={classNames("password !border-none !pb-1 !mb-0", {
                'shadow-[0_0_2em_#ffffff26]': them === Them.Dark,
                'shadow-[0_0_2em_#e6e9f9]': them === Them.Light,
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
            {loginFormType !== LoginFormType.Login && isShowPassword && (
              <Item
                name="confirmPassword"
                label="确认密码"
                rules={[
                  {
                    required: true,
                    message: "请输入密码",
                  },
                ]}
                className={classNames("password !border-none !pb-1 !mb-0", {
                  'shadow-[0_0_2em_#ffffff26]': them === Them.Dark,
                  'shadow-[0_0_2em_#e6e9f9]': them === Them.Light,
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
                    const confirmPwd = e.target.value;
                    const pwd = await form.getFieldValue("password");
                    if (pwd !== confirmPwd) {
                      form.setFields([
                        {
                          name: "confirmPassword",
                          errors: ["两次密码输入不一致！"],
                        },
                      ]);
                    }
                  }}
                />
              </Item>
            )}
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
                className={classNames("password border-none !pb-1 !mb-0", {
                  'shadow-[0_0_2em_#ffffff26]': them === Them.Dark,
                  'shadow-[0_0_2em_#e6e9f9]': them === Them.Light,
                })}
              >
                <Input
                  placeholder="请输入验证码"
                  variant="borderless"
                  suffix={mailSuffix}
                />
              </Item>
            )}
          </Space>
        </Form>
        <Button
          className=" !rounded-[16px]"
          onClick={async () => {
            await form.validateFields()
            const { email, password, verificationCode } =
              await form.getFieldsValue();
            try {
              setLoading(true);
              if (loginFormType === LoginFormType.Register) {
                await registerUser({ email, password, verificationCode })
                setLoading(false);
                setLoginFormType(LoginFormType.Login);
                messageApi.success("注册成功！请登录");
              } else if (loginFormType === LoginFormType.Login) {
                await login({ email, password })
                setLoading(false);
                messageApi.success("登录成功！");
                navigate("/aibei");
              } else {
                await getApi.registerUser({
                  email,
                  password,
                  verificationCode,
                });
                setLoading(false);
                setLoginFormType(LoginFormType.Login);
              }
            } catch (e: any) {
              console.error(e);
              setLoading(false);
              messageApi.error(e.message);
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
                setIsShowPassword(false)
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
                setIsShowPassword(false)
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
                setIsShowPassword(false)
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
                setIsShowPassword(false)
              }}
            >
              登录
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});
