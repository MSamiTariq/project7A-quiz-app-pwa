import React from "react";
import Lottie from "react-lottie";
import Loadingdata from "./loading.json";
import './Loading.modules.css'

export default function Loading() {
  return (
    <div className= 'loading'>
      <Lottie
        options={{
          animationData: Loadingdata,
        }}
      />
    </div>
  );
}