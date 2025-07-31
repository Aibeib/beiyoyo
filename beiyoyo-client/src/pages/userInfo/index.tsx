import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover } from "antd";
import { observer } from "mobx-react";
import { useMemo } from "react";
import userStore from "@/store/userStore";

export const UserInfo = observer(() => {
  const { userInfo } = userStore

  const userInfoContent = useMemo(() => {
    return (
      <div className="min-w-[200px] flex flex-col items-center">
        <Avatar shape="circle" src={userInfo.avatar}></Avatar>
        <div className="w-full flex mt-3">
          <span className="mr-3">用户名:</span>
          <span>{userInfo.userName}</span>
        </div>
        <div className="w-full flex mt-3">
          <span className="mr-3">昵称:</span>
          <span>{userInfo.nickName}</span>
        </div>
        {/* <div className="">
          <Button color="default" variant="link">
            登录
          </Button>
        </div> */}
      </div>
    );
  }, [userInfo.avatar, userInfo.nickName, userInfo.userName]);
  return (
    <div className="flex justify-end items-center ">
      <Popover arrow={false} content={userInfoContent} className="">
        <Avatar shape="circle" src={userInfo.avatar} icon={<UserOutlined />}></Avatar>
      </Popover>
    </div>
  );
});
