import React from "react";
import banner_bg from "@/assets/images/special-motel.jpg"; // поставь свою картинку
import ButtonFill from "../ui/buttons/buttonFill";

const HouseBanner = () => {
    return (
        <section className="container max-2sm:w-[90vw] banner_cont">
            <div className="relative rounded-xl overflow-hidden">
                {/* Фон */}
                <div
                    className="bg-cover bg-center bg-no-repeat max-lg:min-h-[500px] min-h-[320px] lg:min-h-[420px]"
                    style={{ backgroundImage: `url(${banner_bg.src})` }}
                />

                {/* Затемнение / градиент */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-[#2C2C2A]/100 via-40% to-[#2C2C2A]/100" />

                {/* Контент */}
                <div className="absolute inset-0 flex justify-end items-center">
                    <div className="max-sm:w-full max-sm:items-start w-[65%] text-white px-6 lg:px-16 py-10 flex flex-col justify-center items-end">
                        <h2 className="max-2xl:text-2xl 2xl:text-3xl font-semibold uppercase mb-4 max-sm:text-left text-right">
                            От домокомплекта к готовому дому на вашем участке
                        </h2>

                        <p className="max-sm:text-left max-xl:hidden max-xl:text-base max-2xl:w-full 2xl:w-[80%] text-xl max-2xl:text-lg 2xl:text-xl leading-relaxed text-right opacity-90 mb-6">
                            Для расчета стоимости доставки и монтажа на Вашем участке укажите
                            адрес или планируемый район. <br />
                            Кроме того, наши партнеры помогут с оформлением ипотеки, а также
                            могут дополнительно оказать услуги по монтажу фундамента,
                            инженерных сетей и внутренней отделки.
                        </p>

                        <p className="max-sm:text-left xl:hidden max-xl:text-base max-2xl:w-full 2xl:w-[80%] text-xl max-2xl:text-lg 2xl:text-xl leading-relaxed text-right opacity-90 mb-6">
                            Для расчета стоимости доставки и монтажа на Вашем участке укажите
                            адрес или планируемый район. Кроме того, наши партнеры помогут с оформлением ипотеки, а также
                            могут дополнительно оказать услуги по монтажу фундамента,
                            инженерных сетей и внутренней отделки.
                        </p>

                        <div className="flex max-sm:justify-start justify-end">
                            <ButtonFill className="bg-white text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all rounded-2xl">
                                <p className={`max-lg:text-lg`}>РАССЧИТАТЬ МОНТАЖ</p>
                            </ButtonFill>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HouseBanner;