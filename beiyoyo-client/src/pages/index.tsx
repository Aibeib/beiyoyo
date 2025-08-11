import React, { useEffect } from "react";
import { ConfigProvider, Layout, theme } from "antd";
import "./index.less";
import { Outlet } from "react-router-dom";
import userStore from "@/stores/userStore";
import { Header } from "./header";
import { UIStore } from '@/stores/index'
import { Them } from "@/stores/type";
import { observer } from "mobx-react";

const { Header: LayoutHeader, Content, Footer } = Layout;


const Page: React.FC = () => {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();
  const { init } = userStore
  const { them } = UIStore
  useEffect(() => {
    initialPhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initialPhoto = async () => {
    await init()
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: them === Them.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm // 切换主题
      }}
    >
      <Layout className="">
        <LayoutHeader
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
            className="content-container !bg-[rgba(255,255,255,0.4)]  h-full overflow-auto"
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }} className="footer  content_bg !bg-black ">
          浙 ICP 备 2025181263 号 ©{new Date().getFullYear()} Created by Aibei
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default observer(Page);
