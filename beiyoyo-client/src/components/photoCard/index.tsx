import "./index.less";
import { Image } from "antd";
export const PhotoCard = () => {
  return (
    <div className="flex  photo-card rounded-[8px] mr-4 w-[200px] p-2 overflow-hidden">
      <div className="w-[200px] h-[240px]">
        {/* <img src='../../../public/photo_1.jpeg' style={{ width: '100%', height: '200px', objectFit: "cover", objectPosition: "center", borderRadius: '8px', imageRendering: "pixelated" }} /> */}
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
