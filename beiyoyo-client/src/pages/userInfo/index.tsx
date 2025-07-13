import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import { observer } from "mobx-react";
import { useMemo } from "react";

export const UserInfo = observer(() => {
  const userInfoContent = useMemo(() => {
    return (
      <div className="min-w-[200px] flex flex-col items-center">
        <Avatar shape="circle" icon={<UserOutlined />}></Avatar>
        <div className="w-full flex mt-3">
          <span>用户名</span>
          <span></span>
        </div>
        <div className="w-full flex mt-3">
          <span>昵称</span>
          <span></span>
        </div>
        <div className="">
          <Button color="default" variant="link">
            登录
          </Button>
        </div>
      </div>
    );
  }, []);
  return (
    <div className="flex justify-end items-center ">
      <Popover arrow={false} content={userInfoContent} className="">
        <Avatar shape="circle"></Avatar>
      </Popover>
    </div>
  );
});
