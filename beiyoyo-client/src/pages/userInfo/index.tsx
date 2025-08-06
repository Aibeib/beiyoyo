import { EditOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover, Space, Image } from "antd";
import { observer } from "mobx-react";
import { useMemo, useState } from "react";
import userStore from "@/store/userStore";
import './index.less'
import { EditInfoModal } from "./editInfoModal";

export const UserInfo = observer(() => {
  const { userInfo } = userStore

  const [visible, setVisible] = useState(false)

  const userInfoContent = useMemo(() => {
    return (
      <div className="min-w-[180px] w-[220px] flex flex-col items-center !h-[260px]">

        <div className="relative flex items-center justify-center w-full h-[140px]">
          <img className=" border-none object-cover rounded-tl-[8px] rounded-tr-[8px] w-[100%] !h-full absolute top-0 left-0 z-0 " src={userInfo.backgroundImage} alt="" />
          <Avatar shape="circle" size="large" src={userInfo.avatar}></Avatar>
        </div>
        <div className="text-[#646a73] p-3 w-full">
          <Space align="start" direction="vertical" className="w-full">
            <div className="flex items-center">
              <span>昵称：</span>
              <span>{userInfo.nickName}</span>
            </div>
            <div className="flex items-center ">
              <span>账号：</span>
              <span>{userInfo.userName}</span>
            </div>

          </Space>
          <div className="!w-full">
            <Button type="text" className="!w-full mt-2" icon={<EditOutlined />} onClick={() => setVisible(true)}></Button>
          </div>
        </div>
      </div>
    );
  }, [userInfo.avatar, userInfo.nickName, userInfo.userName]);
  return (
    <div className="flex justify-end items-center ">
      <Popover arrow={false} placement="bottomRight" content={userInfoContent} rootClassName="user-info-popover" className="user-info-popover">
        <Avatar shape="circle" src={userInfo.avatar} icon={<UserOutlined />}></Avatar>
      </Popover>
      <EditInfoModal visible={visible} userStore={userStore} onCancel={() => setVisible(false)} />
    </div>
  );
});
