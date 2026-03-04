"use client"

import React, { useRef } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"

const BannerCarousel = ({ bannerImages }) => {
    const autoplay = useRef(
        Autoplay({
            delay: 5000,
            stopOnInteraction: false,
        })
    )

    return (
        <Carousel
            className="w-full"
            opts={{ loop: true }}   // 👈 вот это главное
            plugins={[autoplay.current]}
        >
            <CarouselContent>
                {bannerImages?.map((src, index) => (
                    <CarouselItem key={index}>
                        <Image
                            src={src}
                            alt="img"
                            className="max-h-[100vh] object-cover w-full"
                            width={1920}
                            height={900}
                            priority={index === 0} // лучше чем lazy для первого
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

export default BannerCarousel