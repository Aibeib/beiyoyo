import React, { useEffect } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import "./index.less";
import { Outlet } from "react-router-dom";
import userStore from "@/stores/userStore";
import { Header } from "./header";

import { observer } from "mobx-react";

const { Header: LayoutHeader, Content, Footer } = Layout;


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
      <LayoutHeader
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
        }}
        className="header mb-4"
      >
        <Header />
      </LayoutHeader>
      <Content
        style={{ padding: "0 48px", width: '1200px', margin: '0 auto' }}
        className="content  h-[calc(100vh-149px)]"
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="content-container  h-full overflow-auto"
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }} className="footer  ">
        浙 ICP 备 2025181263 号 ©{new Date().getFullYear()} Created by Aibei
      </Footer>
    </Layout>
  );
};

export default observer(Page);
