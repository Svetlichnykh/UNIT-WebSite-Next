"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

const OutlineSvgText = ({ text, classnames, classnamesText }) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });
  return (
    <svg
      ref={ref}
      strokeWidth="3"
      className={`text-transparent webkit-text-stroke-width-3  webkit-text-stroke-primary [font-size:_clamp(48px,13vw,130px)] font-extrabold leading-120 max-h-25 sm:max-h-28 lg:max-h-full ${inView ? "stroke-primary stroke-dasharray-1000 stroke-dashoffset-1000 animate-text-line-animation" : "fill-transparent stroke-primary"} ${classnames} `}
    >
      <text x="0%" dominantBaseline="middle" y="70%" className={classnamesText}>
        {text}
      </text>
    </svg>
  );
};

export default OutlineSvgText;
