import React from "react";
import { Layout, theme, Avatar, Input } from "antd";
import "./index.less";
import { PhotoList } from "@/components/photoList";
import { UserInfo } from "./userInfo";

const { Header, Content, Footer } = Layout;

// const items = Array.from({ length: 3 }).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));

const Page: React.FC = () => {
  const {
    token: { borderRadiusLG, colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          background: colorBgContainer,
          alignItems: "center",
        }}
        className="header content_bg mb-4"
      >
        <Avatar
          src="../../public/logo_2.png"
          className=" demo-logo"
          shape="square"
        />
        <div className="w-[calc(100%-32px)] flex justify-end ">
          <div className="mr-4">
            <Input className="" />
          </div>
          <div className="ml-3 flex items-center cursor-pointer">
            <UserInfo />
          </div>
        </div>
      </Header>
      <Content
        style={{ padding: "0 48px" }}
        className="content  h-[calc(100vh-149px)]   "
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="content-container bg_color content_bg h-full overflow-auto"
        >
          <PhotoList />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }} className="footer content_bg ">
        浙 ICP 备 2025181263 号 ©{new Date().getFullYear()} Created by Aibei
      </Footer>
    </Layout>
  );
};

export default Page;
