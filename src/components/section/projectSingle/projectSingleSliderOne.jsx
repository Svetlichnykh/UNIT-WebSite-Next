"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";

import project_img_3 from "@/assets/images/project-image-3.jpg";
import project_img_4 from "@/assets/images/project-image-4.jpg";
import project_img_5 from "@/assets/images/project-image-5.jpg";

import ProgressAndNatigation from "../../ui/progressAndNatigation";
import Image from "next/image";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const projectImgList = [
    "/images/projects/project-image-3.jpg",
    "/images/projects/project-image-4.jpg",
    "/images/projects/project-image-5.jpg",
    "/images/projects/project-image-3.jpg",
    "/images/projects/project-image-4.jpg",
    "/images/projects/project-image-5.jpg",
];
const ProjectSingleS = () => {
  const pagination = {
    clickable: true,
    el: ".progressbar-pagination",
    type: "progressbar",
  };
  return (
    <div className=" project-slider-one">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          750: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1320: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        pagination={pagination}
        loop={true}
        modules={[Pagination, Navigation]}
      >
          {projectImgList.map((src, index) => (
              <SwiperSlide key={index}>
                  <Image
                      src={src}
                      alt={`project-${index + 1}`}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="w-full h-full min-h-[250px] max-h-[250px] md:min-h-16 md:max-h-full object-cover"
                  />
              </SwiperSlide>
          ))}

        <div className="container">
          <ProgressAndNatigation />
        </div>
      </Swiper>
    </div>
  );
};

export default ProjectSingleS;
