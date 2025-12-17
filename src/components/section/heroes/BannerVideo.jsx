"use client";
import React from "react";

const BannerVideo = () => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 object-cover h-screen w-full"
    >
      <source src="/video-3.mp4" type="video/mp4" />
    </video>
  );
};

export default BannerVideo;
