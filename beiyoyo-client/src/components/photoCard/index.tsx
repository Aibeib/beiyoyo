import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { Image } from "antd";
type Props = {
  isNewAdd?: boolean;
};
export const PhotoCard = (props: Props) => {
  const { isNewAdd } = props;
  return isNewAdd ? (
    <div className="flex justify-center cursor-pointer add-card  h-full items-center bg-[rgba(169,214,222,0.3)] rounded-[8px] w-[200px] overflow-hidden">
      <div className="w-[200px]  flex justify-center items-center">
        <PlusOutlined className="text-[32px] !text-[#646a73]" />
      </div>
    </div>
  ) : (
    <div className="flex photo-card rounded-[8px] w-[200px] h-full p-2 overflow-hidden">
      <div className="w-[200px] h-full">
        <Image
          src="../../../public/photo_1.jpeg"
          width="100%"
          className="!h-[200px] !object-cover !rounded-[8px]"
        />
        <div className="flex flex-col mt-1 text-[#646a73] text-[12px]">
          <span>大小：</span>
          <span>描述：</span>
        </div>
      </div>
    </div>
  );
};
