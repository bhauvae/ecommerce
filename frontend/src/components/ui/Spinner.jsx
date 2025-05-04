import React from "react";
import DotLoader from "react-spinners/DotLoader";

const override = {
  display: "block",
  margin: "1rem auto",
};

const Spinner = ({ loading }) => {
  return (
    <DotLoader
      loading={loading}
      cssOverride={override}
      color='#6050DC'
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
