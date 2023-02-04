import React from "react";

const GalleryImages = ({ gallary }) => {
  return (
    <div className="gallary">
      {gallary.map((elem, index) => {
        return <img key={index} src={`http://localhost:8080/${elem}`} alt="" />;
      })}
    </div>
  );
};

export default GalleryImages;
