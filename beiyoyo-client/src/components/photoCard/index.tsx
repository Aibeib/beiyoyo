import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import "./index.less";
import { Button, Image } from "antd";
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
  function downloadFileSilently(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = ''; // 浏览器自动识别文件名
    a.style.display = 'none'; // 不显示链接
    document.body.appendChild(a);
    a.click(); // 模拟点击
    document.body.removeChild(a);
  }
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
          <div className="flex photo-card rounded-[8px] h-full ">
            <Image
              src={photo?.picUrl}
              width="100%"
              className=" !object-cover !rounded-[8px]"
              preview={{
                toolbarRender: (originalNode, info) => {
                  return (
                    <div className="flex items-center">
                      {originalNode}
                      <div className="h-full">
                        <DownloadOutlined
                          className="text-[gray] text-[18px] cursor-pointer hover:!text-[#fff]"
                          onClick={() => {
                            // window.open(photo?.picUrl)
                            downloadFileSilently(photo?.picUrl || '')
                          }}
                        />
                      </div>

                    </div>
                  )
                }
              }}
            />
          </div>
        )
      }
      <UploadModal visible={visible} onCancel={() => setVisible(false)} />
    </div>
  )


};
