import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/loading.json";
import "../../styles/atoms/LoadingAtom.scss";

const LoadingAtom = () => {
  return (
    <div className="container">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{
          height: 250,
        }}
      />
      ;
    </div>
  );
};
export default LoadingAtom;
