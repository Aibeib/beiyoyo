import { Avatar, Popconfirm, Popover } from "antd";
import { observer } from "mobx-react";
import { useMemo } from "react";

export const UserInfo = observer(() => {
  const userInfoContent = useMemo(() => {
    return <div className="min-w-[200px] min-h-[180px]"></div>;
  }, []);
  return (
    <div>
      <Popover arrow={false} content={userInfoContent} className=" left-3">
        <Avatar shape="circle"></Avatar>
      </Popover>
    </div>
  );
});
