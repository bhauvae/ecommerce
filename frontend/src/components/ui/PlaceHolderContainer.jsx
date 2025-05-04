import React from "react";
import PlaceHolder from "./PlaceHolder";

const PlaceHolderContainer = () => {
  const placeHolderArray = Array.from({ length: 12 }, (_, index) => index + 1);
  return (
    <section className="py-5" id="shop">
      <h4 style={{ textAlign: "center" }}>Products</h4>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          {placeHolderArray.map((item) => (
            <PlaceHolder key={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderContainer;
