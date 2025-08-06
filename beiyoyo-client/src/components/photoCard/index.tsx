import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { Image } from "antd";
import { UploadModal } from "./uploadModal";
import { useState } from "react";
import type { PhotoInfo } from "@/api/getPhotoList";
type Props = {
  isNewAdd?: boolean;
  photo?: PhotoInfo
};
export const PhotoCard = (props: Props) => {
  const { isNewAdd, photo } = props;
  const [visible, setVisible] = useState(false)
  return (
    <div>
      {
        isNewAdd ? (
          <div
            onClick={() => {
              setVisible(true)
            }}
            className="flex justify-center cursor-pointer add-card h-full items-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] rounded-[8px] w-[160px] overflow-hidden">
            <div className="w-[160px]  flex justify-center items-center">
              <PlusOutlined className="text-[32px] !text-[#646a73]" />
            </div>
          </div>
        ) : (
          <div className="flex photo-card rounded-[8px] w-[160px] h-full ">
            <Image
              src={photo?.picUrl}
              width="100%"
              className="min-h-[200px] !object-cover !rounded-[8px]"
            />
            {/* <div className="flex flex-col mt-1 text-[#646a73] text-[12px]">
                <span>标题：{photo?.subject}</span>
                <span>描述：{photo?.subject}</span>
              </div> */}
          </div>
        )
      }
      <UploadModal visible={visible} onCancel={() => setVisible(false)} />
    </div>
  )


};
