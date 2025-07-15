import { observer } from "mobx-react";
import { PhotoCard } from "../photoCard";
import { Col, Row } from "antd";

export const PhotoList = observer(() => {
  const dataList = new Array(1).fill("");
  return (
    <div className="my-0 mx-auto ">
      <Row gutter={[25, 16]} justify="start">
        {/* <div className="w-full grid  gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] my-0 mx-auto justify-center"> */}
        {dataList.map((_, index) => {
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
              <PhotoCard isNewAdd={index === 0} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
});
