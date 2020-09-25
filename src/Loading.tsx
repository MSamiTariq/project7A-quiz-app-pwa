import React from "react";
import Lottie from "react-lottie";
import Loadingdata from "./loading.json";

export default function Loading() {
  return (
    <div>
      <Lottie
        options={{
          animationData: Loadingdata,
        }}
        height={"100%"}
        width={"100%"}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "300px",
        }}
      />
    </div>
  );
}