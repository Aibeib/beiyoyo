import { observer } from "mobx-react";
import { PhotoCard } from "../photoCard";
import { Col, Row } from "antd";

export const PhotoList = observer(() => {
  const dataList = new Array(12).fill("");
  return (
    <div className="w-full">
      <Row gutter={[25, 16]} justify="start">
        {/* <div className="w-full grid  gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] my-0 mx-auto justify-center"> */}
        {dataList.map((_, index) => {
          return (
            <Col
              key={index}
              xs={{ flex: "100%" }}
              sm={{ flex: "50%" }}
              md={{ flex: "40%" }}
              lg={{ flex: "20%" }}
              xl={{ flex: "10%" }}
            >
              <PhotoCard />
            </Col>
          );
        })}
      </Row>
    </div>
  );
});
