import { notFound } from "next/navigation";
import { Categories } from "@/data/categories";
import Title from "@/components/ui/title";
import Calculator from "@/components/calculator/Calculator";
import ProjectSingleSliderOne from "@/components/section/projectSingle/projectSingleSliderOne";
import ShopSlider from "@/components/section/shopSlider";
import { productData } from "@/lib/fackData/productData";
import Feedback from "@/components/section/feedback";
import React from "react";
import BannerCarousel from "@/components/banner-carousel/banner-carousel";

export async function generateMetadata({ params }) {
  const { slug, houseSlug } = await params;

  const category = Categories[slug];

  if (!category) {
    return {};
  }

  const house = category.houses.find((item) => item.slug === houseSlug);

  if (!house) {
    return {};
  }

  return {
    title: house.project_seo_title,
    description: house.project_seo_descr,
    openGraph: {
      title: house.project_seo_title,
      description: house.project_seo_descr,
      images: [
        {
          url: house.bannerImages?.[0] || "/default-house-og-image.jpg",
        },
      ],
    },
  };
}

export default async function HousePage({ params }) {
  const { slug, houseSlug } = await params;

  const category = Categories[slug];

  if (!category) {
    notFound();
  }

  const house = category.houses.find((item) => item.slug === houseSlug);

  if (!house) {
    notFound();
  }

  return (
    <>
      <section className="blog-single">
        <div>
          <BannerCarousel bannerImages={house.bannerImages} />
          <div className="container 2sm:my-[156px] sm:my-30 my-20">
            <div className="grid lg:grid-cols-[65%_auto] gap-[38px]">
              <div className="relative after:absolute sm:after:-left-12.5 after:-left-5 after:top-1/2 after:-translate-y-1/2 after:w-[1px] sm:after:h-[130%] after:h-[120%] after:bg-primary sm:ml-12.5 ml-5">
                <h1 className="text-primary-foreground [font-size:_clamp(48px,7vw,130px)] font-extrabold leading-110">
                  {house.small_description}
                </h1>
                <span className="inline-block w-[300px] h-[1px] bg-primary"></span>
                <p className="text-2xl sm:text-3xl 2sm:text-4xl !leading-160 text-primary-foreground mt-[18px]">
                  {house.long_description}
                </p>
              </div>
              <div className=" bg-primary py-15 sm:px-[38px] px-5 lg:-mt-[410px] z-30">
                <Title
                  title_text={house.project_name}
                  className={
                    "text-secondary-foreground mt-10 2sm:text-7xl text-white"
                  }
                />
                <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-7 lg:gap-x-0 gap-7">
                  {house.project_details &&
                    house.project_details
                      .filter((item) => item.render)
                      .map((item, index) => (
                        <li key={index}>
                          <strong className="text-secondary-foreground block text-2xl mb-1.5 text-white">
                            {item.label}:
                          </strong>
                          <span className="text-secondary-foreground block text-2xl text-white">
                            {item.render}
                          </span>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>

          <Calculator calculatorData={house.calculatorData} />
          <ProjectSingleSliderOne projectImgList={house.sliderImages} />

          <ShopSlider data={productData} />
        </div>
      </section>
      <Feedback />
    </>
  );
}
