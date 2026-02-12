"use client";

import React from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { tns } from "tiny-slider/src/tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

import { useEffect, useRef, useState } from "react";

const viewsOrder = ["back", "left", "front", "right"];

const roofImages = {
  hip: {
    back: "/img/views/view_08_back.png",
    left: "/img/views/view_08_left.png",
    front: "/img/views/view_08_front.png",
    right: "/img/views/view_08_right.png",
  },
  gable: {
    back: "/img/views/view_09_back.png",
    left: "/img/views/view_09_left.png",
    front: "/img/views/view_09_front.png",
    right: "/img/views/view_09_right.png",
  },
};

const HOUSE_IMAGES = [
  // default
  {
    id: "default",
    src: "/img/home/default.jpg",
    alt: "база дома",
    className: "house__img-default hidden",
    dataGroup: "default",
    width: 400,
    height: 400,
  },
  {
    id: "default-gable",
    src: "/img/home/default-gable.jpg",
    alt: "база дома",
    className: "house__img-default hidden",
    dataGroup: "default",
    width: 400,
    height: 400,
  },

  // фасад
  {
    id: "facade__white",
    src: "/img/home/mkc-08__facade__white.png",
    alt: "белый фасад",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__gray",
    src: "/img/home/mkc-08__facade__gray.png",
    alt: "серый фасад",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__black",
    src: "/img/home/mkc-08__facade__black.png",
    alt: "чёрный фасад",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__white-gable",
    src: "/img/home/mkc-08__facade__white-gable.png",
    alt: "белый фасад двускатный",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__gray-gable",
    src: "/img/home/mkc-08__facade__gray-gable.png",
    alt: "серый фасад двускатный",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__black-gable",
    src: "/img/home/mkc-08__facade__black-gable.png",
    alt: "чёрный фасад двускатный",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },

  // фасад планкен
  {
    id: "facade-planken__white",
    src: "/img/home/mkc-08__facade-planken_white.png",
    alt: "фасад планкен белый",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade-planken__gray",
    src: "/img/home/mkc-08__facade-planken_gray.png",
    alt: "фасад планкен серый",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade-planken__black",
    src: "/img/home/mkc-08__facade-planken_black.png",
    alt: "фасад планкен чёрный",
    className: "house__img hidden",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },

  // планкен
  {
    id: "planken__walnut",
    src: "/img/home/mkc-08__planken__walnut.png",
    alt: "планкен орех",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__rosewood",
    src: "/img/home/mkc-08__planken__rosewood.png",
    alt: "планкен палисандр",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__pine",
    src: "/img/home/mkc-08__planken__pine.png",
    alt: "планкен сосна",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__black",
    src: "/img/home/mkc-08__planken__black.png",
    alt: "планкен чёрный",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },

  // планкен двускатные
  {
    id: "planken__walnut-gable",
    src: "/img/home/mkc-08__planken__walnut-gable.png",
    alt: "планкен орех двускатный",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__rosewood-gable",
    src: "/img/home/mkc-08__planken__rosewood-gable.png",
    alt: "планкен палисандр двускатный",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__pine-gable",
    src: "/img/home/mkc-08__planken__pine-gable.png",
    alt: "планкен сосна двускатный",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__black-gable",
    src: "/img/home/mkc-08__planken__black-gable.png",
    alt: "планкен чёрный двускатный",
    className: "house__img hidden",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },

  // окна
  {
    id: "windows__graphite",
    src: "/img/home/mkc-08__windows__graphite.png",
    alt: "окна графит",
    className: "house__img hidden",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__light_wood",
    src: "/img/home/mkc-08__windows__light-wood.png",
    alt: "окна светлое дерево",
    className: "house__img hidden",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__chocolate",
    src: "/img/home/mkc-08__windows__chocolate.png",
    alt: "окна шоколад",
    className: "house__img hidden",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },

  // окна двускатные
  {
    id: "windows__light_wood-gable",
    src: "/img/home/mkc-08__windows__light-wood-gable.png",
    alt: "окна светлое дерево",
    className: "house__img hidden",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__graphite-gable",
    src: "/img/home/mkc-08__windows__graphite-gable.png",
    alt: "окна антрацит двускатные",
    className: "house__img hidden",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__chocolate-gable",
    src: "/img/home/mkc-08__windows__chocolate-gable.png",
    alt: "окна шоколад двускатные",
    className: "house__img hidden",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },

  // фасадное освещение
  {
    id: "fasad-light__white",
    src: "/img/home/mkc-08__fasad-light_white.png",
    alt: "фасадное освещение белое",
    className: "house__img hidden",
    width: 400,
    height: 400,
  },
  {
    id: "fasad-light__black",
    src: "/img/home/mkc-08__fasad-light_black.png",
    alt: "фасадное освещение чёрное",
    className: "house__img hidden",
    width: 400,
    height: 400,
  },
];

const CHOICE_IMAGES = [
  {
    section: "fasad", // название секции
    items: [
      {
        id: "facade__white",
        imgSrc: "/img/parts/btn__facade__white.png",
        alt: "Белый фасад",
        description: "Белый фасад",
        color: "red", // Цвет для стилизации
      },
      {
        id: "facade__gray",
        imgSrc: "/img/parts/btn__facade__gray.png",
        alt: "Серый фасад",
        description: "Серый фасад",
        color: "green",
      },
      {
        id: "facade__black",
        imgSrc: "/img/parts/btn__facade__black.png",
        alt: "Чёрный фасад",
        description: "Чёрный фасад",
        color: "blue",
      },
    ],
  },
  {
    section: "balk", // секция с планкенами
    hidden: true, // если секция скрыта
    items: [
      {
        id: "planken__walnut",
        imgSrc: "/img/parts/btn__planken__walnut.png",
        alt: "Планкен орех",
        description: "Планкен орех",
        color: "red",
      },
      {
        id: "planken__rosewood",
        imgSrc: "/img/parts/btn__planken__rosewood.png",
        alt: "Планкен палисандр",
        description: "Планкен палисандр",
        color: "green",
      },
      {
        id: "planken__pine",
        imgSrc: "/img/parts/btn__planken__pine.png",
        alt: "Планкен сосна",
        description: "Планкен сосна",
        color: "blue",
      },
      {
        id: "planken__black",
        imgSrc: "/img/parts/btn__planken__black.png",
        alt: "Планкен чёрный",
        description: "Планкен чёрный",
        color: "blue",
      },
    ],
  },
  {
    section: "windows", // секция окон
    hidden: true,
    items: [
      {
        id: "windows__graphite",
        imgSrc: "/img/parts/btn__windows__graphite.png",
        alt: "Окна графит",
        description: "Окна графит",
        color: "red",
      },
      {
        id: "windows__light_wood",
        imgSrc: "/img/parts/btn__windows__light_wood.png",
        alt: "Окна светлое дерево",
        description: "Окна светлое дерево",
        color: "green",
      },
      {
        id: "windows__chocolate",
        imgSrc: "/img/parts/btn__windows__chocolate.png",
        alt: "Окна шоколад",
        description: "Окна шоколад",
        color: "blue",
      },
    ],
  },
];

const Calculator = () => {
  useEffect(() => {
    if (!slidersRef.current.length) return;

    slidersRef.current.forEach((sliderBlock) => {
      if (!sliderBlock) return;

      const slider = sliderBlock.querySelector(".visual-slider");
      const thumbs = sliderBlock.querySelector(".visual-slider__thumbnails");

      if (!slider || slider.dataset.initialized) return;

      const instance = tns({
        container: slider,
        items: 1,
        slideBy: 1,
        mouseDrag: true,
        controls: false,
        nav: true,
        navContainer: thumbs,
        navAsThumbnails: true,
        autoplayButtonOutput: false,
      });

      slider.dataset.initialized = "true";
    });
  }, []);

  const [activeSlider, setActiveSlider] = useState(4); // по умолчанию кухня (как у тебя showSlider(4))
  const slidersRef = useRef([]);

  const containerRef = useRef(null);
  const frameRef = useRef(null);

  const [currentView, setCurrentView] = useState("front");
  const [currentRoof, setCurrentRoof] = useState("hip");

  useEffect(() => {
    const images = containerRef.current.querySelectorAll(".sect-views__image");

    const onImageLoad = () => {
      // Когда изображение загружено, делаем расчеты для фрейма
      const target = [...images].find(
        (img) => img.dataset.view === currentView,
      );
      if (!target) return;

      const elRect = target.getBoundingClientRect();
      const parentRect = containerRef.current.getBoundingClientRect();

      // Устанавливаем размеры и позицию фрейма
      frameRef.current.style.width = elRect.width + "px";
      frameRef.current.style.height = elRect.height + "px";
      frameRef.current.style.transform = `translate(
            ${elRect.left - parentRect.left}px,
            ${elRect.top - parentRect.top}px
        )`;

      frameRef.current.classList.add("is-ready");
    };

    // Добавляем слушатель для каждого изображения
    images.forEach((img) => {
      if (img.complete) {
        onImageLoad(); // Если изображение уже загружено
      } else {
        img.addEventListener("load", onImageLoad); // Если еще не загружено
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
      });
    };
  }, [currentView, currentRoof]);

  return (
    <section>
      {/* Core styles */}
      <link rel="stylesheet" href="/css/settings.css" />
      <link rel="stylesheet" href="/css/global.css" />
      <link rel="stylesheet" href="/css/blocks.css" />
      <link rel="stylesheet" href="/css/text.css" />
      <link rel="stylesheet" href="/css/button.css" />

      {/* Feature styles */}
      <link rel="stylesheet" href="/css/slider.css" />
      <link rel="stylesheet" href="/css/visualization.css" />
      <link rel="stylesheet" href="/css/calculator.css" />
      <link rel="stylesheet" href="/css/customization.css" />

      {/* Lib styles */}
      <link rel="stylesheet" href="/css/lib/form.css" />
      <link rel="stylesheet" href="/css/lib/panorama.css" />
      <link rel="stylesheet" href="/css/lib/tns.css" />
      <link rel="stylesheet" href="/css/lib/alert.css" />
      <link rel="stylesheet" href="/css/lib/tooltips.css" />
      <link rel="stylesheet" href="/css/lib/pannellum.css" />

      <section className="section">
        <div className="section__inner">
          <h2 className="h2 p-d-20">Планировка дома</h2>

          <div className="visualization-block">
            <div className="visualization-scheme__wrapper">
              <div
                className="visualization-scheme area area-bedroom-1"
                data-tooltip="Детская\n( 10 м² )"
                onClick={() => setActiveSlider(0)}
              ></div>

              <div
                className="visualization-scheme area area-bedroom-2"
                data-tooltip="Спальня\n( 10.3 м² )"
                onClick={() => setActiveSlider(1)}
              ></div>

              <div
                className="visualization-scheme area area-bedroom-3"
                data-tooltip="Вторая спальня\n( 12.8 м² )"
                onClick={() => setActiveSlider(2)}
              ></div>

              <div
                className="visualization-scheme area area-hall"
                data-tooltip="Коридор\n( 3.9 м² )"
                onClick={() => setActiveSlider(3)}
              ></div>

              <div
                className="visualization-scheme area area-kitchen"
                data-tooltip="Кухня-Гостиная\n( 9.2 + 14.1 м² )"
                onClick={() => setActiveSlider(4)}
              ></div>

              <div
                className="visualization-scheme area area-tambur"
                data-tooltip="Тамбур\n( 2 м² )"
                onClick={() => setActiveSlider(5)}
              ></div>

              <div
                className="visualization-scheme area area-tech"
                data-tooltip="Тех. помещение\n( 2.6 м² )"
                onClick={() => setActiveSlider(6)}
              ></div>

              <div
                className="visualization-scheme area area-toilet"
                data-tooltip="Туалет\n( 4.7 м² )"
                onClick={() => setActiveSlider(7)}
              ></div>

              <div className="visualization-scheme"></div>

              <nav
                className="home-plan__nav"
                aria-label="Навигация по плану дома"
              >
                {viewsOrder.map((view) => (
                  <button
                    key={view}
                    className={`home-plan__arrow home-plan__arrow--${view} ${
                      currentView === view ? "home-plan__arrow--active" : ""
                    }`}
                    onClick={() => setCurrentView(view)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 42 36"
                      width="42"
                      height="36"
                    >
                      <path d="M21 36L41.7846 0H0.215393L21 36Z" />
                    </svg>
                  </button>
                ))}
              </nav>
            </div>

            <div className="visualization-sliders__wrapper">
              {[
                "bedroom_one",
                "bedroom_two",
                "bedroom_three",
                "hall",
                "kitchen",
                "tambur",
                "tech",
                "toilet",
              ].map((room, index) => (
                <div
                  key={room}
                  className="visualization-slider"
                  style={{ display: activeSlider === index ? "block" : "none" }}
                  ref={(el) => (slidersRef.current[index] = el)}
                >
                  <div className="visual-slider">
                    {Array.from(
                      {
                        length:
                          room === "hall"
                            ? 2
                            : room === "tambur"
                              ? 3
                              : room === "kitchen"
                                ? 7
                                : 5,
                      },
                      (_, i) => (
                        <Image
                          key={i}
                          src={`/img/renders/${room}__0${i + 1}.jpg`}
                          alt=""
                          className="slider__slide"
                          width={400}
                          height={400}
                        />
                      ),
                    )}
                  </div>

                  <div className="visual-slider__thumbnails">
                    {Array.from(
                      {
                        length:
                          room === "hall"
                            ? 2
                            : room === "tambur"
                              ? 3
                              : room === "kitchen"
                                ? 7
                                : 5,
                      },
                      (_, i) => (
                        <Image
                          key={i}
                          src={`/img/thumbnail/thamb__${room}__0${i + 1}.png`}
                          alt=""
                          width={400}
                          height={400}
                        />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Script id="my-script1">{`document.addEventListener('DOMContentLoaded', function() {
                const areas = document.querySelectorAll('.area');

                areas.forEach(area => {
                area.addEventListener('click', function() {
                // Удаляем класс active у всех областей
                areas.forEach(a => a.classList.remove('active'));
                // Добавляем класс active только к выбранной области
                this.classList.add('active');
            });
            });
            });`}</Script>

      <Script id="my-script2">{`let sliders = document.querySelectorAll('.visual-slider');

                sliders.forEach(function(slider) {
                let navContainer = slider.parentElement.querySelector('.visual-slider__thumbnails');

                tns({
                "container": slider,
                "loop": true,
                "items": 1,
                "slideBy": 1,
                "center": true,
                "mouseDrag": true,
                "arrowKeys": true,
                "autoplay": false,
                "controls": false,
                "navAsThumbnails": true,
                "navContainer": navContainer,
                "autoplayButtonOutput": false,
                "navPosition": "bottom"
            });
            });`}</Script>

      <div className="roof-switch">
        <button
          className={`roof-switch__btn left-button ${
            currentRoof === "hip" ? "is-active" : ""
          }`}
          onClick={() => setCurrentRoof("hip")}
        >
          Вальмовая кровля
        </button>

        <button
          className={`roof-switch__btn right-button ${
            currentRoof === "gable" ? "is-active" : ""
          }`}
          onClick={() => setCurrentRoof("gable")}
        >
          Двускатная кровля
        </button>
      </div>

      <section className="section sect-views">
        <div className="section__inner">
          <div
            className="sect-views__frame"
            id="views-frame"
            ref={containerRef}
          >
            <div className="active-frame" id="active-frame" ref={frameRef} />

            <div className="sect-views__slider">
              {viewsOrder.map((view) => (
                <Image
                  key={view}
                  src={roofImages[currentRoof][view]}
                  alt=""
                  className="sect-views__image"
                  data-view={view}
                  width={400}
                  height={400}
                  onClick={() => setCurrentView(view)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-calculator">
        <div className="section__inner section-calculator__inner">
          <h2 className="h2 p-d-20">Домокомплект</h2>

          <div className="section-calculator__section">
            <div className="section-calculator__block calculator__block-house">
              <div
                className="section-calculator-block__house"
                id="colors-params"
              >
                {HOUSE_IMAGES.map((img) => (
                  <Image
                    key={img.id}
                    src={img.src}
                    alt={img.alt}
                    id={img.id}
                    className={img.className}
                    width={400}
                    height={400}
                    data-group={img.dataGroup}
                  />
                ))}
              </div>

              <div className="choice__wrapper p-t-20 p-d-20">
                <div className="choice-buttons">
                  <button className="choice-button active" id="btn__fasad">
                    Фасад
                  </button>
                  <button className="choice-button" id="btn__balk">
                    Планкен
                  </button>
                  <button className="choice-button" id="btn__windows">
                    Окна
                  </button>
                </div>

                <div className="choice-content">
                  {CHOICE_IMAGES.map((section) => (
                    <div
                      key={section.section}
                      className={`items ${section.section} ${section.hidden ? "hidden" : ""}`}
                      id={`section__${section.section}`}
                    >
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className={`item color__${item.color}`}
                          data-img={item.id}
                        >
                          <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            className="image"
                            width={400}
                            height={400}
                          />
                          <span className="text">{item.description}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="section-calculator__block calculator__block-choices">
              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script4"
              >{`{
                                    "dataTitle": "Платформа",
                                    "title": "ПЛАТФОРМА",
                                    "checkboxName": "platform",
                                    "subTitle": "Необходима при монтаже дома на свайный или ленточный фундамент.",
                                    "price": 618500,
                                    "localSumName": "home",
                                    "relations": [
                                {
                                    "id": "house-montage",
                                    "change": "150000"
                                },
                                {
                                    "id": "house-delivery",
                                    "change": "60000"
                                }
                                    ]
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script5"
              >{`{
                                    "dataTitle": "Фасад с окрашиванием",
                                    "title": "ФАСАД С ФАКТУРНЫМ ОКРАШИВАНИЕМ",
                                    "checkboxName": "fasad-color",
                                    "subTitle": "выберите цвет",
                                    "price": 0,
                                    "default": "forever",
                                    "localSumName": "home"
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script6"
              >{`{
                                    "dataTitle": "Фасад с планкеном",
                                    "title": "ДЕКОР ФАСАДА ПЛАНКЕН",
                                    "checkboxName": "fasad-planken",
                                    "subTitle": "выберите цвет",
                                    "price": 110000,
                                    "localSumName": "home"
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script7"
              >{`{
                                    "title": "ОКНА",
                                    "radioName": "windows",
                                    "subTitle": "выберите цвет и тип ламинации",
                                    "default": 1,
                                    "localSumName": "home",

                                    "subblocks": [
                                {
                                    "dataTitle": "Белые окна",
                                    "optionTitle": "БЕЛЫЕ",
                                    "optionPrice": 0,
                                    "optionText": "входит в базовую стоимость"
                                },
                                {
                                    "dataTitle": "Окна с ламинацией снаружи",
                                    "optionTitle": "С ЛАМИНАЦИЕЙ СНАРУЖИ",
                                    "optionPrice": 92000,
                                    "optionText": ""
                                },
                                {
                                    "dataTitle": "Окна с ламинацией снаружи и внутри",
                                    "optionTitle": "С ЛАМИНАЦИЕЙ СНАРУЖИ И ВНУТРИ",
                                    "optionPrice": 115000,
                                    "optionText": ""
                                }
                                    ]
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script8"
              >{` {
                                    "title": "КРОВЛЯ",
                                    "radioName": "roof",
                                    "subTitle": "выберите тип кровли",
                                    "default": 1,
                                    "localSumName": "home",

                                    "subblocks": [
                                {
                                    "dataTitle": "Крыша металлочерепица",
                                    "optionTitle": "МЕТАЛЛОЧЕРЕПИЦА",
                                    "optionPrice": 0,
                                    "optionText": "входит в базовую стоимость"
                                },
                                {
                                    "dataTitle": "Крыша клик-фальц",
                                    "optionTitle": "КЛИК-ФАЛЬЦ",
                                    "optionPrice": 35500,
                                    "optionText": "",
                                    "relations": [
                                {
                                    "id": "house-montage",
                                    "change": "20000"
                                },
                                {
                                    "id": "inner-group",
                                    "change": "6500"
                                }
                                    ]
                                }
                                    ]
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script9"
              >{`{
                                    "dataTitle": "Входная группа",
                                    "title": "ВХОДНАЯ ГРУППА",
                                    "checkboxName": "inner-group",
                                    "subTitle": "",
                                    "price": 89500,
                                    "localSumName": "home",
                                    "relations": [
                                {
                                    "id": "house-montage",
                                    "change": "50000"
                                },
                                {
                                    "id": "house-delivery",
                                    "change": "10000"
                                },
                                {
                                    "id": "water-sliv-system",
                                    "change": "14000"
                                }
                                    ]
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script10"
              >{`{
                                    "dataTitle": "Водосточная система",
                                    "title": "ВОДОСТОЧНАЯ СИСТЕМА",
                                    "checkboxName": "water-sliv-system",
                                    "subTitle": "",
                                    "price": 34500,
                                    "localSumName": "home",
                                    "relations": [
                                {
                                    "id": "house-montage",
                                    "change": "25000"
                                }
                                    ]
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script11"
              >{`{
                                    "dataTitle": "Снегозадержатели",
                                    "title": "СНЕГОЗАДЕРЖАТЕЛИ",
                                    "checkboxName": "snow-holders",
                                    "subTitle": "",
                                    "price": 55000,
                                    "localSumName": "home",
                                    "relations": [
                                {
                                    "id": "house-montage",
                                    "change": "20000"
                                }
                                    ]
                                }`}</Script>

              <Script
                data-block-template-checkbox
                type={"application/json"}
                id="my-script12"
              >{` {
                                    "dataTitle": "Фасадное освещение",
                                    "title": "ФАСАДНОЕ ОСВЕЩЕНИЕ",
                                    "checkboxName": "fasad-light",
                                    "subTitle": "Только в комплекте с электрикой, выберите тип электрики для Вашего дома",
                                    "price": 50000,
                                    "localSumName": "home",
                                    "relations": [
                                {
                                    "id": "house-montage",
                                    "change": "11200"
                                }
                                    ]
                                }`}</Script>
            </div>


          </div>

          <div className="calculator-terrace-sliders__wrapper">
            <div className="block-choice__title p-d-20">
              <div className="block__price">
                <h3 className="h4">ТЕРРАССА</h3>
              </div>
            </div>

            <div className="calculator__terrace-sliders">
              <div className="calculator__terrace-slide">
                <Image
                  src="/img/house_08_ultimate.jpg"
                  alt=""
                  className="calculator__terrace-slide-img p-d-10"
                  width={400}
                  height={400}
                />
                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script13"
                >{` {
                                            "dataTitle": "Террасса - крытая",
                                            "title": "КРЫТАЯ",
                                            "checkboxName": "terrace-close",
                                            "subTitle": "",
                                            "price": 775000,
                                            "radio": "terrace",
                                            "relations": [
                                        {
                                            "id": "house-montage",
                                            "change": "140000"
                                        },
                                        {
                                            "id": "house-delivery",
                                            "change": "40000"
                                        }
                                            ]
                                        }`}</Script>
              </div>

              <div className="calculator__terrace-slide">
                <Image
                  src="/img/house_08_open.png"
                  alt=""
                  className="calculator__terrace-slide-img p-d-10"
                  width={400}
                  height={400}
                />

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script14"
                >{`{
                                            "dataTitle": "Террасса - открытая",
                                            "title": "ОТКРЫТАЯ",
                                            "checkboxName": "terrace-open",
                                            "subTitle": "",
                                            "price": 230000,
                                            "radio": "terrace",
                                            "relations": [
                                        {
                                            "id": "house-montage",
                                            "change": "40000"
                                        },
                                        {
                                            "id": "house-delivery",
                                            "change": "25000"
                                        }
                                            ]
                                        }`}</Script>
              </div>
            </div>
          </div>

          <div className="attention">
            <h3 className="attention__text-big">
              РАССЧИТЫВАЕТСЯ ИСХОДЯ ИЗ УЧАСТКА
            </h3>

            <p className="attention__text-small">
              Приведены ориентировочные рассчеты на Хабаровский район. Итоговая
              стоимость на ваш участок рассчитывает подрядчик, поставляющий до
            </p>
          </div>

          <div className="calculator__blocks p-d-20">
            <div className="calculator__column">
              <h3 className="h4">ВНУТРЕННЯЯ ОТДЕЛКА</h3>

              <div className="calculator__block">
                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script15"
                >{` {
                                        "title": "ЭЛЕКТРОСНАБЖЕНИЕ",
                                        "radioName": "energy",
                                        "subTitle": "",

                                        "subblocks": [
                                    {
                                        "dataTitle": "Базовое электроснабжение",
                                        "optionTitle": "БАЗОВОЕ",
                                        "optionPrice": 271000,
                                        "optionText": ""
                                    },
                                    {
                                        "dataTitle": "Оптимальное электроснабжение",
                                        "optionTitle": "ОПТИМАЛЬНОЕ",
                                        "optionPrice": 408000,
                                        "optionText": ""
                                    }
                                        ]
                                    }`}</Script>

                <div id="alert_need_fundament" className="alert">
                  <div className="alert__inner">
                    <p className="alert__text">
                      ДЛЯ ДАННОГО ТИПА ОТОПЛЕНИЯ ВЫБЕРЕТЕ ПЛИТНЫЙ ФУНДАМЕНТ
                    </p>

                    <div className="buttons buttons-right">
                      <Link
                        href="/#fundament-2"
                        className="button button-yellow"
                        onclick="this.closest('.alert').classList.remove('show');"
                      >
                        ОК
                      </Link>
                    </div>
                  </div>
                </div>

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script16"
                >{` {
                                        "title": "ОТОПЛЕНИЕ",
                                        "radioName": "heat",
                                        "subTitle": "",

                                        "subblocks": [
                                    {
                                        "dataTitle": "Конвекторное отопление",
                                        "optionTitle": "КОНВЕКТОРНОЕ",
                                        "optionPrice": 121500,
                                        "optionText": ""
                                    },
                                    {
                                        "dataTitle": "Радиаторное котельное отопление",
                                        "optionTitle": "РАДИАТОРНОЕ КОТЕЛЬНОЕ",
                                        "optionPrice": 196000,
                                        "optionText": ""
                                    },
                                    {
                                        "dataTitle": "Отопление тёплым полом",
                                        "optionTitle": "ТЁПЛЫЙ ПОЛ ВОДЯНОЙ",
                                        "optionPrice": 1280500,
                                        "optionText": "",
                                        "require": [
                                    {
                                        "id": "fundament-2",
                                        "alert": "alert_need_fundament"
                                    }
                                        ]
                                    }
                                        ]
                                    }`}</Script>

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script17"
                >{`{
                                        "title": "ВОДОСНАБЖЕНИЕ",
                                        "radioName": "water",
                                        "subTitle": "",

                                        "subblocks": [
                                    {
                                        "dataTitle": "Водоснабжение через PPR коллектор",
                                        "optionTitle": "PPR КОЛЛЕКТОР",
                                        "optionPrice": 57000,
                                        "optionText": ""
                                    },
                                    {
                                        "dataTitle": "Водоснабжение через металл коллектор",
                                        "optionTitle": "МЕТАЛЛ КОЛЛЕКТОР",
                                        "optionPrice": 114000,
                                        "optionText": ""
                                    }
                                        ]
                                    }`}</Script>

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script18"
                >{` {
                                        "title": "ВЕНТИЛЯЦИЯ",
                                        "radioName": "air",
                                        "subTitle": "",

                                        "subblocks": [
                                    {
                                        "dataTitle": "Вентиляция",
                                        "optionTitle": "БАЗОВАЯ",
                                        "optionPrice": 26000,
                                        "optionText": ""
                                    }
                                        ]
                                    }`}</Script>
              </div>
            </div>

            <div className="calculator__column">
              <div className="calculator__block">
                <div id="alert_need_platform" className="alert">
                  <div className="alert__inner">
                    <p className="alert__text">
                      ПРИ МОНТАЖЕ НА СВАЙНЫЙ ФУНДАМЕНТ В КОМПЛЕКТАЦИИ ДОМА
                      ВЫБЕРИТЕ ПЛАТФОРМУ.
                    </p>

                    <div className="buttons buttons-right">
                      <Link
                        href="/#platform"
                        className="button button-yellow"
                        onclick="this.closest('.alert').classList.remove('show');"
                      >
                        ОК
                      </Link>
                    </div>
                  </div>
                </div>

                <div id="alert_not_fundament" className="alert">
                  <div className="alert__inner">
                    <p className="alert__text">
                      ПРИ МОНТАЖЕ ДОМА НА ПЛИТНЫЙ ФУНДАМЕНТ В КОМПЛЕКТАЦИИ ДОМА
                      УБЕРИТЕ ПЛАТФОРМУ.
                    </p>

                    <div className="buttons buttons-right">
                      <Link
                        href="/#platform"
                        className="button button-yellow"
                        onclick="this.closest('.alert').classList.remove('show');"
                      >
                        ОК
                      </Link>
                    </div>
                  </div>
                </div>

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script19"
                >{`  {
                                        "title": "ФУНДАМЕНТ",
                                        "radioName": "fundament",
                                        "subTitle": "",

                                        "subblocks": [
                                    {
                                        "dataTitle": "Фундамент - ЖБ сваи",
                                        "optionTitle": "ЖБ СВАИ",
                                        "optionPrice": 240000,
                                        "optionText": "",
                                        "require": [
                                    {
                                        "id": "platform",
                                        "alert": "alert_need_platform"
                                    }
                                        ]
                                    },
                                    {
                                        "dataTitle": "Фундамент - ЖБ плита",
                                        "optionTitle": "ЖБ ПЛИТА",
                                        "optionPrice": 1120000,
                                        "optionText": ""
                                    }
                                        ]
                                    }`}</Script>
              </div>

              <h3 className="h4">ВНУТРЕННЯЯ ИНЖЕНЕРИЯ</h3>

              <div className="calculator__block">
                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script20"
                >{` {
                                        "title": "ВНУТРЕННЯЯ ОТДЕЛКА СТЕН",
                                        "radioName": "walls",
                                        "subTitle": "",

                                        "subblocks": [
                                    {
                                        "dataTitle": "Отделка - ГКЛ/ГВЛ",
                                        "optionTitle": "ГКЛ/ГВЛ",
                                        "optionPrice": 338500,
                                        "optionText": ""
                                    },
                                    {
                                        "dataTitle": "Отделка - OSB + ГКЛ/ГВЛ",
                                        "optionTitle": "OSB + ГКЛ/ГВЛ",
                                        "optionPrice": 652000,
                                        "optionText": ""
                                    }
                                        ]
                                    }`}</Script>
              </div>

              <h3 className="h4">ВНЕШНЯЯ ИНЖЕНЕРИЯ</h3>

              <div className="calculator__block">
                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script21"
                >{`  {
                                        "dataTitle": "Водоснабжение",
                                        "title": "ВОДОСНАБЖЕНИЕ",
                                        "checkboxName": "engineer-water",
                                        "subTitle": "Скважина 50м",
                                        "price": 250000
                                    }`}</Script>

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script22"
                >{`  {
                                        "dataTitle": "Канализация",
                                        "title": "КАНАЛИЗАЦИЯ",
                                        "checkboxName": "engineer-sewerage",
                                        "subTitle": "ТОПАС 5 с монтажом",
                                        "price": 270000
                                    }`}</Script>

                <Script
                  data-block-template-checkbox
                  type={"application/json"}
                  id="my-script23"
                >{` {
                                        "dataTitle": "Электричество",
                                        "title": "ЭЛЕКТРИЧЕСТВО",
                                        "checkboxName": "engineer-energy",
                                        "subTitle": "Подключение дома",
                                        "price": 50000
                                    }`}</Script>
              </div>
            </div>
          </div>
        </div>

        <div className="calculator__summary">
          <div className="section__inner buttons buttons-right">
            <Link
              className="button button-yellow-outline no-link"
              id="wa-check-summary"
              href="https://wa.me/79145445585?text=%20Здравствуйте!%20Хочу%20получить%20расцветку%20дома%20на%20МКЦ-08"
            >
              СОХРАНИТЬ РАСЧЁТ НА WA
            </Link>

            <span className="button button-yellow-outline disabled">
              ИТОГО СТОИМОСТЬ: <b id="summary-global">5 354 000 ₽</b>
            </span>
          </div>
        </div>
      </section>

      <Script id="my-script3">
        {`function radioReset(name) {

                var allRadios = document.getElementsByName(name);
                var booRadio;
                var x = 0;
                for(x = 0; x < allRadios.length; x++){
                allRadios[x].onclick = function() {
                if(booRadio == this){
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
            };
            }

            }
                document.addEventListener('DOMContentLoaded', () => {

                radioReset('energy')
                radioReset('heat')
                radioReset('water')
                radioReset('air')
                radioReset('walls')
                radioReset('terrace')
                radioReset('fundament')

            })');`}
      </Script>
    </section>
  );
};

export default Calculator;
