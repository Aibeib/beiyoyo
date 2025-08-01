import { observer } from "mobx-react";
import { PhotoCard } from "../photoCard";
import { Col, Row } from "antd";
import userStore from "@/store/userStore";

export const PhotoList = observer(() => {
  const { photoList } = userStore

  return (
    <div className="my-0 mx-auto ">
      <Row gutter={[25, 16]} justify="start">
        {/* <div className="w-full grid  gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] my-0 mx-auto justify-center"> */}
        <PhotoCard isNewAdd={true} />
        {photoList.map((photo, index) => {
          return (
            <Col
              key={index}
              xs={{ flex: "100%" }}
              sm={{ flex: "80%" }}
              md={{ flex: "50%" }}
              lg={{ flex: "30%" }}
              xl={{ flex: "10%" }}
              className=" "
            >
              <PhotoCard photo={photo} isNewAdd={false} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
});
