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
    token: { borderRadiusLG },
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
          alignItems: "center",
        }}
        className=" header content_bg"
      >
        <Avatar
          src="../../public/logo_2.png"
          className=" demo-logo !ml-[-8px]"
          shape="square"
        />
        <div className="w-[calc(100%-36px)] flex justify-end ">
          <div className="right-3">
            <Input className="!border-none !bg-sky-none !focus:bg-sky-none !focus:border-none" />
          </div>
          <div className="ml-3">
            <UserInfo />
          </div>
        </div>
      </Header>
      <Content
        style={{ padding: "0 48px" }}
        className="content content_bg h-[calc(100vh-133px)]  bg-[rgba(144,134,231,0.3)] "
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            // background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="content-container bg_color h-full bg-[rgba(144,134,231,0.3)] overflow-auto"
        >
          <PhotoList />
        </div>
      </Content>
      <Footer
        style={{ textAlign: "center" }}
        className="footer content_bg !bg-[rgba(107,117,247,0.6]"
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Page;
