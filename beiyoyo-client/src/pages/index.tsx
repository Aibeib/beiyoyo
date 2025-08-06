import React, { useEffect } from "react";
import { Layout, theme, Avatar, Input, message } from "antd";
import "./index.less";
import { UserInfo } from "./userInfo";
import { Outlet } from "react-router-dom";
import userStore from "@/store/userStore";

const { Header, Content, Footer } = Layout;

// const items = Array.from({ length: 3 }).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));


const Page: React.FC = () => {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();
  const { init } = userStore
  useEffect(() => {
    initialPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialPhoto = async () => {
    await init()
  }
  return (
    <Layout className="">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          background: "rgba(255,255,255,0.3)",
          alignItems: "center",
        }}
        className="header content_bg mb-4"
      >
        <Avatar
          src="../../public/logo_1.png"
          className=" demo-logo flex justify-center items-center"
          shape="square"
          size='large'
        />
        <div className="w-[calc(100%-32px)] flex justify-end ">
          {/* <div className="mr-4">
            <Input className="h-8" />
          </div> */}
          <div className="ml-3 flex items-center cursor-pointer">
            <UserInfo />
          </div>
        </div>
      </Header>
      <Content
        style={{ padding: "0 48px" }}
        className="content  h-[calc(100vh-149px)]"
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="content-container !bg-[rgba(255,255,255,0.3)] bg_color content_bg h-full overflow-auto"
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }} className="footer !text-[#646a73] content_bg !bg-black ">
        浙 ICP 备 2025181263 号 ©{new Date().getFullYear()} Created by Aibei
      </Footer>
    </Layout>
  );
};

export default Page;
