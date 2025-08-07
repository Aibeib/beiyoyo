import { observer } from "mobx-react";
import { PhotoCard } from "../photoCard";
import userStore from "@/stores/userStore";
import Masonry from 'react-masonry-css';
import './index.less';


export const PhotoList = observer(() => {
  const { photoList } = userStore
  const breakpointColumnsObj = {
    default: 6,
    1200: 4,
    700: 3,
    500: 2
  };
  return (
    <div className="my-0 mx-auto ">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photoList.map((photo, index) => (
          <PhotoCard key={index} photo={photo} />
        ))}
      </Masonry>
    </div>
  );
});
