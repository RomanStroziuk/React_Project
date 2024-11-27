import React from "react";
import { Vortex } from "react-loader-spinner";

const Loader = () => {
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={[
        "#1C1C1C",
        "#3C3C3C",
        "#5C5C5C",
        "#7C7C7C",
        "#AFAFAF",
        "#FFFFFF",
      ]}
    />
  );
};

const LoaderComponent = ({ loading, children }) => {
  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default LoaderComponent;
