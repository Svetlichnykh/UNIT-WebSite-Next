"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import SectionTitle from "../ui/sectionTitle";
import { galleryData } from "@/lib/fackData/galleryData";
import { staticBluarDataUrl } from "@/lib/staticBluarDataUrl";

const Gallery = ({ text_muted, bg_muted }) => {
  const [expendItem, setExpendItem] = useState("01");

  return (
    <section className="pt-20">
      <div className="container-fluid">
        <SectionTitle
          sectionName="Каталог"
          sectionTitle="Каталог наших домов"
          sectionDesc="Мечтай. Выбирай. Заезжай"
          link="/project-archive"
          bg_muted={bg_muted}
          text_muted={text_muted}
        />
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-nowrap flex-wrap lg:pt-30 2sm:pt-20 pt-14">
        {galleryData.map(({ id, img, img_desc, img_title, link }) => (
          <Link
            key={id}
            href={link}
            onMouseEnter={() => setExpendItem(id)}
            className={`group relative flex-grow sm:h-[750px] h-[420px] overflow-hidden transition-all duration-700
              ${expendItem === id ? "lg:basis-[47%] basis-[50%]" : "lg:basis-[20%] basis-[30%]"}
            `}
          >
            {/* Контент */}
            <div
              className="absolute inset-0 z-[1] flex flex-col justify-between 2xl:pl-[30px] pl-5 pr-5 2xl:pr-[30px] py-[30px]
              after:absolute after:left-0 after:bottom-0 after:contents-[''] after:w-full after:h-1/2 after:bg-bottom-liner after:z-[-1]"
            >
              <h3
                className={`text-6xl font-extrabold leading-120 transition-all duration-700
                  text-transparent webkit-text-stroke-width-1 webkit-text-stroke-white
                  ${expendItem === id ? "webkit-text-stroke-primary" : ""}
                `}
              >
                {id}
              </h3>

              <div
                className={`flex 2xl:flex-row items-start justify-between 2xl:items-end
                  ${expendItem === id ? "flex-col" : "flex-col sm:flex-row"}
                `}
              >
                {/* Заголовок с DELAY underline */}
                <h4
                  className="
  text-3xl 2sm:text-4xl font-bold leading-135 text-white
  max-w-60 2xl:min-w-56 min-w-48
  underline underline-offset-8 decoration-2
  decoration-transparent
  transition duration-300 ease-out
  delay-150
  group-hover:decoration-[#FBB900]
  group-hover:text-[#FBB900]
"
                >
                  {img_title}
                </h4>

                <p
                  className={`text-white font-semibold 3xl:max-w-[421px] 2xl:max-w-80
                    transition-all duration-700 3xl:min-w-[420px] xl:min-w-80 min-w-72
                    overflow-hidden
                    ${expendItem === id ? "opacity-100" : "sm:opacity-0 opacity-100"}
                  `}
                >
                  {img_desc}
                </p>
              </div>
            </div>

            {/* Картинка */}
            <Image
              src={img}
              alt={img_title}
              loading="lazy"
              placeholder="blur"
              blurDataURL={staticBluarDataUrl}
              fill
              className={`object-cover duration-300 ${expendItem === id ? "" : "grayscale"}`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
