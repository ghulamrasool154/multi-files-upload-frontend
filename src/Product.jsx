import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import GalleryImages from "./GalleryImages";

const Product = () => {
  const [name, setname] = useState("");
  const [images, setimages] = useState("");
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState([]);
  const hanldeSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    // for (const key of Object.keys(images)) {
    //   formData.append("images", images[key]);
    // }

    let i = 0;
    for (const img of images.files) {
      formData.append("images", img);
      i++;
    }

    fetch("http://localhost:8080/postdata", {
      method: "POST",
      body: formData,
    }).then((response) => {
      response.json();
      setname("");
      alldata();
    });
  };
  const hanldename = (e) => {
    setname(e.target.value);
  };
  const hanldeImages = (e) => {
    setimages(e.target);
    // setimages(e.target.files);
  };
  const alldata = () => {
    fetch("http://localhost:8080/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setdata(data.result);
        setloading(false);
      });
  };
  useEffect(() => {
    alldata();
  }, []);
  return (
    <>
      <form className="Product" onSubmit={hanldeSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="productname"
          value={name}
          onChange={hanldename}
        />{" "}
        <br />
        <input
          type="file"
          multiple
          name="productimages"
          onChange={hanldeImages}
        />
        <br />
        <input type="submit" value="AddProduc" />
      </form>
      <div className="wrapper">
        {loading ? (
          <h2>Loading data</h2>
        ) : (
          <>
            {data.map((eleme) => {
              return (
                <div className="item" key={eleme._id}>
                  {/* gallary  */}
                  <GalleryImages gallary={eleme.gallary} />
                  <div className="contet">
                    <h2>{eleme.name}</h2>
                    <img
                      src={`http://localhost:8080/${eleme.profile}`}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Product;
