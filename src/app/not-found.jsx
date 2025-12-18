"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { motion } from "framer-motion";
import { cardSlideAnimation, cn } from "@/lib/utils";

const NotFound = () => {
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: true,
  });

  const transition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01],
  };
  return (
    <div
      className={`flex justify-center items-center w-full h-[100vh] bg-secondary flex-col `}
    >
      <div className={`w-full flex justify-center`}>
        <svg
          ref={ref}
          strokeWidth="3"
          className={`font-[family-name:var(--family)] md:w-[700px] sm:w-[430px] w-[210px] !stroke-[5px] flex justify-center items-center text-center md:h-[300px] sm:h-[200px] h-[100px] text-transparent [-webkit-text-stroke-width:15px]  webkit-text-stroke-primary md:text-[310px] sm:text-[200px] text-[100px] font-extrabold leading-120 ${inView ? "stroke-primary stroke-dasharray-1000 stroke-dashoffset-1000 animate-text-line-animation" : "fill-transparent stroke-primary"} `}
        >
          <text
            x="0%"
            dominantBaseline="middle"
            y="70%"
            className={`[-webkit-text-stroke-width:15px] stroke-[8px] max-sm:stroke-[3px]   flex justify-center items-center text-center`}
          >
            404
          </text>
        </svg>
      </div>
      <span
        className={cn(
          `block w-[300px] max-sm:w-[150px] max-sm:h-[3px] h-[5px]  bg-primary my-[40px] max-sm:my-[20px]`,
        )}
      ></span>
      <motion.div
        style={{ display: "flex", justifyContent: "center" }}
        initial={{ scale: 0.95, opacity: 0, translateY: "30px" }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
      >
        <p
          className={
            "text-center text-[30px] max-md:text-[24px] max-sm:text-[18px] leading-135 max-w-[1300px] max-md:w-[90%] font-bold decoration-2 max-sm:hidden"
          }
        >
          К сожалению, данной страницы не существует. <br />
          Вы можете вернуться на{" "}
          <Link href={"/"} className={`underline`}>
            главную
          </Link>{" "}
          страницу сайта, или посмотреть{" "}
          <Link href={"/"} className={`underline`}>
            панельно-каркасные дома
          </Link>
          ,{" "}
          <Link href={"/"} className={`underline`}>
            загородные дома
          </Link>{" "}
          или{" "}
          <Link href={"/"} className={`underline`}>
            банные дома
          </Link>
        </p>
      </motion.div>

      <p
        className={
          "text-center text-[30px] max-md:text-[24px] max-sm:text-[18px] leading-135 max-w-[1300px] max-md:w-[90%] font-bold decoration-2 sm:hidden"
        }
      >
        К сожалению, данной страницы не существует. Вы можете вернуться на{" "}
        <Link href={"/"} className={`underline`}>
          главную
        </Link>{" "}
        страницу сайта, или посмотреть{" "}
        <Link href={"/"} className={`underline`}>
          панельно-каркасные дома
        </Link>
        ,{" "}
        <Link href={"/"} className={`underline`}>
          загородные дома
        </Link>{" "}
        или{" "}
        <Link href={"/"} className={`underline`}>
          банные дома
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
