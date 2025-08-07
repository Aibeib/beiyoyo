import { PhotoList } from "@/components/photoList"
import { Carousel } from "antd"

export const Home = () => {
  const contentStyle: React.CSSProperties = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div>
      <div className="mb-4">
        <Carousel autoplay className=" rounded-[8px] overflow-hidden">
          <img
            className="h-[200px] object-cover round-[8px]"
            src="https://aibei-1258806962.cos.ap-shanghai.myqcloud.com/photos/1754448040691-wxg2lo3z1r.jpeg"
            alt=""
          />
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div>

      </div>
      <div>
        <PhotoList />
      </div>
    </div>
  )
}