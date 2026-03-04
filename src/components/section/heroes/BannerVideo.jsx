"use client"

import React from "react";

const BannerVideo = ({video}) => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 object-cover h-screen w-full"
    >
      <source src={video} type="video/mp4" />
    </video>
  );
};

export default BannerVideo;
