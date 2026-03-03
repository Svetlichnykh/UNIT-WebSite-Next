import { notFound } from "next/navigation";
import { Categories } from "@/data/categories";
import Image from "next/image";
import bg_banner from "@/assets/images/mkc-08.webp";
import Title from "@/components/ui/title";
import Calculator from "@/components/calculator/Calculator";
import ProjectSingleSliderOne from "@/components/section/projectSingle/projectSingleSliderOne";
import ShopSlider from "@/components/section/shopSlider";
import {productData} from "@/lib/fackData/productData";
import Feedback from "@/components/section/feedback";
import React from "react";

export default async function HousePage({ params }) {
    const { slug, houseSlug } = await params;

    const category = Categories[slug];

    if (!category) {
        notFound();
    }

    const house = category.houses.find(
        (item) => item.slug === houseSlug
    );

    if (!house) {
        notFound();
    }

    return (
    <>
        <section className="blog-single">
            <div>
                <Image
                    src={bg_banner}
                    loading="lazy"
                    placeholder="blur"
                    alt="img"
                    className={"max-h-[100vh] object-cover w-full"}
                />
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
                        <div className=" bg-primary py-15 sm:px-[38px] px-5 lg:-mt-[410px] ">
                            <Title
                                title_text={house.project_name}
                                className={"text-secondary-foreground mt-10 2sm:text-7xl "}
                            />
                            <ul className="pb-7.5 pt-[75px] flex lg:flex-col flex-row flex-wrap lg:flex-nowrap gap-x-7 lg:gap-x-0 gap-7">
                                <li>
                                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                                        Количество санузлов: {house.project_bedrooms}
                                    </strong>
                                </li>
                                <li>
                                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                                        Количество санузлов: {house.project_bathrooms}
                                    </strong>
                                </li>
                                <li>
                                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                                        Площадь помещений:
                                    </strong>
                                    <span className="text-secondary-foreground block">
                      70.4 м<sup>2</sup>
                    </span>
                                </li>
                                <li>
                                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                                        Площадь регистрационная:
                                    </strong>
                                    <span className="text-secondary-foreground block">
                      75 м<sup>2</sup>
                    </span>
                                </li>
                                <li>
                                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                                        Площадь с крыльцом и террасой:
                                    </strong>
                                    <span className="text-secondary-foreground block">
                      111 м<sup>2</sup>
                    </span>
                                </li>
                                <li>
                                    <strong className="text-secondary-foreground block text-2xl mb-1.5">
                                        Площадь регистрационная с крыльцом:
                                    </strong>
                                    <span className="text-secondary-foreground block">
                      84 м<sup>2</sup>
                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Calculator />
                <ProjectSingleSliderOne />

                <ShopSlider data={productData} />
            </div>
        </section>
        <Feedback />
    </>
    );
}