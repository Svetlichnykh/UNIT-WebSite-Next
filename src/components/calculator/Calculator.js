import React from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

const Calculator = () => {
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

      {/* External CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css"
      />

      {/* Local scripts */}
      <Script src="/scripts/tooltips.js" strategy="afterInteractive" />
      <Script src="/scripts/pannellum.js" strategy="afterInteractive" />

      {/* External scripts */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js"
        strategy="afterInteractive"
      />
      <section className="section">
        <div className="section__inner">
          <h2 className="h2 p-d-20">Планировка дома</h2>

          <div className="visualization-block">
            <div className="visualization-scheme__wrapper">
              <div
                className="visualization-scheme area area-bedroom-1"
                data-tooltip="Детская\n( 10 м² )"
              ></div>
              <div
                className="visualization-scheme area area-bedroom-2"
                data-tooltip="Спальня\n( 10.3 м² )"
              ></div>
              <div
                className="visualization-scheme area area-bedroom-3"
                data-tooltip="Вторая спальня\n( 12.8 м² )"
              ></div>
              <div
                className="visualization-scheme area area-hall"
                data-tooltip="Коридор\n( 3.9 м² )"
              ></div>
              <div
                className="visualization-scheme area area-kitchen"
                data-tooltip="Кухня-Гостиная\n( 9.2 + 14.1 м² )"
              ></div>
              <div
                className="visualization-scheme area area-tambur"
                data-tooltip="Тамбур\n( 2 м² )"
              ></div>
              <div
                className="visualization-scheme area area-tech"
                data-tooltip="Тех. помещение\n( 2.6 м² )"
              ></div>
              <div
                className="visualization-scheme area area-toilet"
                data-tooltip="Туалет\n( 4.7 м² )"
              ></div>

              <div className="visualization-scheme"></div>

              <nav
                className="home-plan__nav"
                aria-label="Навигация по плану дома"
              >
                <button
                  className="home-plan__arrow home-plan__arrow--front home-plan__arrow--active"
                  aria-label="Вид спереди"
                  data-view="front"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 42 36"
                    width="42"
                    height="36"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 36L41.7846 0H0.215393L21 36Z"
                    />
                  </svg>
                </button>
                <button
                  className="home-plan__arrow home-plan__arrow--left"
                  aria-label="Вид слева"
                  data-view="left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 42 36"
                    width="42"
                    height="36"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 36L41.7846 0H0.215393L21 36Z"
                    />
                  </svg>
                </button>
                <button
                  className="home-plan__arrow home-plan__arrow--back"
                  aria-label="Вид сзади"
                  data-view="back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 42 36"
                    width="42"
                    height="36"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 36L41.7846 0H0.215393L21 36Z"
                    />
                  </svg>
                </button>
                <button
                  className="home-plan__arrow home-plan__arrow--right"
                  aria-label="Вид справа"
                  data-view="right"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 42 36"
                    width="42"
                    height="36"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21 36L41.7846 0H0.215393L21 36Z"
                    />
                  </svg>
                </button>
              </nav>
            </div>

            <div className="visualization-sliders__wrapper">
              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/bedroom_one__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_one__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_one__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_one__04.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_one__05.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_one__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_one__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_one__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_one__04.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_one__05.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/bedroom_two__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_two__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_two__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_two__04.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_two__05.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_two__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_two__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_two__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_two__04.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_two__05.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/bedroom_three__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_three__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_three__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_three__04.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/bedroom_three__05.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_three__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_three__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_three__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_three__04.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__bedroom_three__05.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/hall__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/hall__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__hall__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__hall__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/kitchen__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/kitchen__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/kitchen__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/kitchen__04.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/kitchen__05.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/kitchen__06.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/kitchen__07.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__04.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__05.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__06.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__kitchen__07.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/tambur__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/tambur__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/tambur__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__tambur__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__tambur__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__tambur__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/tech__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/tech__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/tech__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/tech__04.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/tech__05.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__tech__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__tech__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__tech__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__tech__04.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__tech__05.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="visualization-slider">
                <div className="visual-slider">
                  <Image
                    src={"/img/renders/toilet__01.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/toilet__02.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/toilet__03.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/toilet__04.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/renders/toilet__05.jpg"}
                    alt={""}
                    className="slider__slide"
                    width={400}
                    height={400}
                  />
                </div>

                <div className="visual-slider__thumbnails">
                  <Image
                    src={"/img/thumbnail/thamb__toilet__01.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__toilet__02.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__toilet__03.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__toilet__04.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                  <Image
                    src={"/img/thumbnail/thamb__toilet__05.png"}
                    alt={""}
                    width={400}
                    height={400}
                  />
                </div>
              </div>
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

      <Script src={"/scripts/visualization.js"} />

      <div className="roof-switch">
        <button
          className="roof-switch__btn is-active left-button"
          data-roof="hip"
        >
          Вальмовая кровля
        </button>
        <button className="roof-switch__btn right-button" data-roof="gable">
          Двускатная кровля
        </button>
      </div>
      <section className="section sect-views">
        <div className="section__inner">
          <div className="sect-views__frame" id="views-frame">
            <div className="active-frame" id="active-frame"></div>

            <div className="sect-views__slider">
              <Image
                src={"/img/views/view_08_back.png"}
                alt={""}
                className="sect-views__image"
                data-view="back"
                width={400}
                height={400}
              />
              <Image
                src={"/img/views/view_08_left.png"}
                alt={""}
                className="sect-views__image"
                data-view="left"
                width={400}
                height={400}
              />
              <Image
                src={"/img/views/view_08_front.png"}
                alt={""}
                className="sect-views__image"
                data-view="front"
                width={400}
                height={400}
              />
              <Image
                src={"/img/views/view_08_right.png"}
                alt={""}
                className="sect-views__image"
                data-view="right"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      <Script src={"/scripts/home.js"} />

      <section className="section section-calculator">
        <div className="section__inner section-calculator__inner">
          <h2 className="h2 p-d-20">Домокомплект</h2>

          <div className="section-calculator__section">
            <div className="section-calculator__block calculator__block-house">
              <div
                className="section-calculator-block__house"
                id="colors-params"
              >
                <Image
                  src="/img/home/default.jpg"
                  alt="база дома"
                  id="default"
                  className="house__img-default hidden"
                  width={400}
                  height={400}
                  data-group="default"
                />
                <Image
                  src="/img/home/default-gable.jpg"
                  alt="база дома"
                  id="default-gable"
                  className="house__img-default hidden"
                  width={400}
                  height={400}
                  data-group="default"
                />
                <Image
                  src="/img/home/mkc-08__facade__white.png"
                  className="house__img hidden"
                  id="facade__white"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="белый фасад"
                />
                <Image
                  src="/img/home/mkc-08__facade__gray.png"
                  className="house__img hidden"
                  id="facade__gray"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="серый фасад"
                />
                <Image
                  src="/img/home/mkc-08__facade__black.png"
                  className="house__img hidden"
                  id="facade__black"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="чёрный фасад"
                />
                <Image
                  src="/img/home/mkc-08__facade__white-gable.png"
                  className="house__img hidden"
                  id="facade__white-gable"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="белый фасад двускатный"
                />
                <Image
                  src="/img/home/mkc-08__facade__gray-gable.png"
                  className="house__img hidden"
                  id="facade__gray-gable"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="серый фасад двускатный"
                />
                <Image
                  src="/img/home/mkc-08__facade__black-gable.png"
                  className="house__img hidden"
                  id="facade__black-gable"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="чёрный фасад двускатный"
                />
                <Image
                  src="/img/home/mkc-08__facade-planken_white.png"
                  className="house__img hidden"
                  id="facade-planken__white"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="фасад планкен белый"
                />
                <Image
                  src="/img/home/mkc-08__facade-planken_gray.png"
                  className="house__img hidden"
                  id="facade-planken__gray"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="фасад планкен серый"
                />
                <Image
                  src="/img/home/mkc-08__facade-planken_black.png"
                  className="house__img hidden"
                  id="facade-planken__black"
                  data-group="fasad"
                  width={400}
                  height={400}
                  alt="фасад планкен чёрный"
                />
                <Image
                  src="/img/home/mkc-08__planken__walnut.png"
                  className="house__img hidden"
                  id="planken__walnut"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен орех"
                />
                <Image
                  src="/img/home/mkc-08__planken__rosewood.png"
                  className="house__img hidden"
                  id="planken__rosewood"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен палисандр"
                />
                <Image
                  src="/img/home/mkc-08__planken__pine.png"
                  className="house__img hidden"
                  id="planken__pine"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен сосна"
                />
                <Image
                  src="/img/home/mkc-08__planken__black.png"
                  className="house__img hidden"
                  id="planken__black"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен чёрный"
                />
                <Image
                  src="/img/home/mkc-08__planken__walnut-gable.png"
                  className="house__img hidden"
                  id="planken__walnut-gable"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен орех двускатный"
                />
                <Image
                  src="/img/home/mkc-08__planken__rosewood-gable.png"
                  className="house__img hidden"
                  id="planken__rosewood-gable"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен палисандр двускатный"
                />
                <Image
                  src="/img/home/mkc-08__planken__pine-gable.png"
                  className="house__img hidden"
                  id="planken__pine-gable"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен сосна двускатный"
                />
                <Image
                  src="/img/home/mkc-08__planken__black-gable.png"
                  className="house__img hidden"
                  id="planken__black-gable"
                  data-group="balk"
                  width={400}
                  height={400}
                  alt="планкен чёрный двускатный"
                />
                <Image
                  src="/img/home/mkc-08__windows__graphite.png"
                  alt="окна графит"
                  className="house__img hidden"
                  id="windows__graphite"
                  width={400}
                  height={400}
                  data-group="windows"
                />
                <Image
                  src="/img/home/mkc-08__windows__light-wood.png"
                  alt="окна светлое дерево"
                  className="house__img hidden"
                  id="windows__light_wood"
                  width={400}
                  height={400}
                  data-group="windows"
                />
                <Image
                  src="/img/home/mkc-08__windows__chocolate.png"
                  alt="окна шоколад"
                  className="house__img hidden"
                  id="windows__chocolate"
                  width={400}
                  height={400}
                  data-group="windows"
                />
                <Image
                  src="/img/home/mkc-08__windows__light-wood-gable.png"
                  className="house__img hidden"
                  id="windows__light_wood-gable"
                  data-group="windows"
                  width={400}
                  height={400}
                  alt="окна светлое дерево"
                />
                <Image
                  src="/img/home/mkc-08__windows__graphite-gable.png"
                  className="house__img hidden"
                  id="windows__graphite-gable"
                  data-group="windows"
                  width={400}
                  height={400}
                  alt="окна антрацит двускатные"
                />
                <Image
                  src="/img/home/mkc-08__windows__chocolate-gable.png"
                  className="house__img hidden"
                  id="windows__chocolate-gable"
                  data-group="windows"
                  width={400}
                  height={400}
                  alt="окна шоколад двускатные"
                />
                <Image
                  src="/img/home/mkc-08__fasad-light_white.png"
                  className="house__img hidden"
                  id="fasad-light__white"
                  alt="фасадное освещение белое"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__fasad-light_gray.png"
                  className="house__img hidden"
                  id="fasad-light__gray"
                  alt="фасадное освещение серое"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__fasad-light_black.png"
                  className="house__img hidden"
                  id="fasad-light__black"
                  alt="фасадное освещение чёрное"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__fasad-light_white-gable.png"
                  className="house__img hidden"
                  id="fasad-light__white-gable"
                  alt="фасадное освещение белое двускатное"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__fasad-light_gray-gable.png"
                  className="house__img hidden"
                  id="fasad-light__gray-gable"
                  alt="фасадное освещение серое двускатное"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__fasad-light_black-gable.png"
                  className="house__img hidden"
                  id="fasad-light__black-gable"
                  alt="фасадное освещение чёрное двускатное"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__roof_metal.png"
                  className="house__img hidden"
                  id="roof__metal"
                  alt="крыша металл"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__roof_fals.png"
                  className="house__img hidden"
                  id="roof__fals"
                  alt="крыша клик-фальц"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__roof_metal-gable.png"
                  className="house__img hidden"
                  id="roof__metal-gable"
                  alt="крыша металл двускатная"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__roof_fals-gable.png"
                  className="house__img hidden"
                  id="roof__fals-gable"
                  alt="крыша клик-фальц двускатная"
                  width={400}
                  height={400}
                />
                \
                <Image
                  src="/img/home/mkc-08__snow-holders_metal.png"
                  className="house__img hidden"
                  id="snow-holders__metal"
                  alt="снегодержатели металл"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__snow-holders_fals.png"
                  className="house__img hidden"
                  id="snow-holders__fals"
                  alt="снегодержатели фальц"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__snow-holders_metal-gable.png"
                  className="house__img hidden"
                  id="snow-holders__metal-gable"
                  alt="снегодержатели металл двускатные"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__snow-holders_fals-gable.png"
                  className="house__img hidden"
                  id="snow-holders__fals-gable"
                  alt="снегодержатели фальц двускатные"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__water-sliv-system_base.png"
                  className="house__img hidden"
                  id="water-sliv-system__base"
                  alt="водосточная система"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__water-sliv-system_base-gable.png"
                  className="house__img hidden"
                  id="water-sliv-system__base-gable"
                  alt="водосточная система двускатная"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__inner-group_metal.png"
                  className="house__img hidden"
                  id="inner-group__metal"
                  alt="входная группа металл"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__inner-group_fals.png"
                  className="house__img hidden"
                  id="inner-group__fals"
                  alt="входная группа фальц"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__inner-group_metal-gable.png"
                  className="house__img hidden"
                  id="inner-group__metal-gable"
                  alt="входная группа металл двускатная"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__inner-group_fals-gable.png"
                  className="house__img hidden"
                  id="inner-group__fals-gable"
                  alt="входная группа фальц двускатная"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__water-sliv-system_inner-group.png"
                  className="house__img hidden"
                  id="water-sliv-system__inner-group"
                  alt="водосток входной группы"
                  width={400}
                  height={400}
                />
                <Image
                  src="/img/home/mkc-08__water-sliv-system_inner-group-gable.png"
                  className="house__img hidden"
                  id="water-sliv-system__inner-group-gable"
                  alt="водосток входной группы двускатный"
                  width={400}
                  height={400}
                />
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
                  <div className="items fasad" id="section__fasad">
                    <div className="item color__red" data-img="facade__white">
                        <Image src={"/img/parts/btn__facade__white.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Белый фасад</span>
                    </div>
                    <div className="item color__green" data-img="facade__gray">
                        <Image src={"/img/parts/btn__facade__gray.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Серый фасад</span>
                    </div>
                    <div className="item color__blue" data-img="facade__black">
                        <Image src={"/img/parts/btn__facade__black.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Чёрный фасад</span>
                    </div>
                  </div>

                  <div className="items balk hidden" id="section__balk">
                    <div className="item color__red" data-img="planken__walnut">
                        <Image src={"/img/parts/btn__planken__walnut.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Планкен орех</span>
                    </div>
                    <div
                      className="item color__green"
                      data-img="planken__rosewood"
                    >
                        <Image src={"/img/parts/btn__planken__rosewood.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Планкен палисандр</span>
                    </div>
                    <div className="item color__blue" data-img="planken__pine">
                        <Image src={"/img/parts/btn__planken__pine.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Планкен сосна</span>
                    </div>
                    <div className="item color__blue" data-img="planken__black">
                        <Image src={"/img/parts/btn__planken__black.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Планкен чёрный</span>
                    </div>
                  </div>

                  <div className="items windows hidden" id="section__windows">
                    <div
                      className="item color__red"
                      data-img="windows__graphite"
                    >
                        <Image src={"/img/parts/btn__windows__graphite.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Окна графит</span>
                    </div>
                    <div
                      className="item color__green"
                      data-img="windows__light_wood"
                    >
                        <Image src={"/img/parts/btn__windows__light_wood.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Окна светлое дерево</span>
                    </div>
                    <div
                      className="item color__blue"
                      data-img="windows__chocolate"
                    >
                        <Image src={"/img/parts/btn__windows__chocolate.png"} alt={""} className={"image"} width={400} height={400} />
                      <span className="text">Окна шоколад</span>
                    </div>
                  </div>
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

      <Script src={"/scripts/csr.js"} />

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

      <Script src={"/scripts/tabs.js"} />
    </section>
  );
};

export default Calculator;
