"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import "tiny-slider/dist/tiny-slider.css";
import { useEffect, useRef, useState } from "react";
import CalculatorBlock from "@/components/calculator-block/Calculator-block";

const blocksData = [
  {
    dataTitle: "Платформа",
    title: "ПЛАТФОРМА",
    checkboxName: "platform",
    subTitle: "Необходима при монтаже дома на свайный или ленточный фундамент.",
    price: 618500,
    localSumName: "home",
    relations: [
      { id: "house-montage", change: "150000" },
      { id: "house-delivery", change: "60000" },
    ],
    exclude: [
      {
        id: "fundament-2",
      },
    ],
  },
  {
    dataTitle: "Фасад с окрашиванием",
    title: "ФАСАД С ФАКТУРНЫМ ОКРАШИВАНИЕМ",
    checkboxName: "fasad-color",
    subTitle: "выберите цвет",
    price: 0,
    default: "forever",
    localSumName: "home",
  },
  {
    dataTitle: "Фасад с планкеном",
    title: "ДЕКОР ФАСАДА ПЛАНКЕН",
    checkboxName: "fasad-planken",
    subTitle: "выберите цвет",
    price: 110000,
    localSumName: "home",
  },
  {
    title: "ОКНА",
    radioName: "windows",
    subTitle: "выберите цвет и тип ламинации",
    default: 1,
    localSumName: "home",
    subblocks: [
      {
        dataTitle: "Белые окна",
        optionTitle: "БЕЛЫЕ",
        optionPrice: 0,
        optionText: "входит в базовую стоимость",
      },
      {
        dataTitle: "Окна с ламинацией снаружи",
        optionTitle: "С ЛАМИНАЦИЕЙ СНАРУЖИ",
        optionPrice: 92000,
        optionText: "",
      },
      {
        dataTitle: "Окна с ламинацией снаружи и внутри",
        optionTitle: "С ЛАМИНАЦИЕЙ СНАРУЖИ И ВНУТРИ",
        optionPrice: 115000,
        optionText: "",
      },
    ],
  },
  {
    title: "КРОВЛЯ",
    radioName: "roof",
    subTitle: "выберите тип кровли",
    default: 1,
    localSumName: "home",
    subblocks: [
      {
        dataTitle: "Крыша металлочерепица",
        optionTitle: "МЕТАЛЛОЧЕРЕПИЦА",
        optionPrice: 0,
        optionText: "входит в базовую стоимость",
      },
      {
        dataTitle: "Крыша клик-фальц",
        optionTitle: "КЛИК-ФАЛЬЦ",
        optionPrice: 35500,
        optionText: "",
        relations: [
          { id: "house-montage", change: "20000" },
          { id: "inner-group", change: "6500" },
        ],
      },
    ],
  },
  {
    dataTitle: "Входная группа",
    title: "ВХОДНАЯ ГРУППА",
    checkboxName: "inner-group",
    subTitle: "",
    price: 89500,
    localSumName: "home",
    relations: [
      { id: "house-montage", change: "50000" },
      { id: "house-delivery", change: "10000" },
      { id: "water-sliv-system", change: "14000" },
    ],
  },
  {
    dataTitle: "Водосточная система",
    title: "ВОДОСТОЧНАЯ СИСТЕМА",
    checkboxName: "water-sliv-system",
    subTitle: "",
    price: 34500,
    localSumName: "home",
    relations: [{ id: "house-montage", change: "25000" }],
  },
  {
    dataTitle: "Снегозадержатели",
    title: "СНЕГОЗАДЕРЖАТЕЛИ",
    checkboxName: "snow-holders",
    subTitle: "",
    price: 55000,
    localSumName: "home",
    relations: [{ id: "house-montage", change: "20000" }],
  },
  {
    dataTitle: "Фасадное освещение",
    title: "ФАСАДНОЕ ОСВЕЩЕНИЕ",
    checkboxName: "fasad-light",
    subTitle:
      "Только в комплекте с электрикой, выберите тип электрики для Вашего дома",
    price: 50000,
    localSumName: "home",
    relations: [{ id: "house-montage", change: "11200" }],
  },
];

const calculatorGroups = [
  {
    column: 1,
    sections: [
      {
        title: "ВНУТРЕННЯЯ ОТДЕЛКА",
        blocks: [
          {
            title: "ЭЛЕКТРОСНАБЖЕНИЕ",
            radioName: "energy",
            allowDeselect: true,
            subTitle: "",
            subblocks: [
              {
                dataTitle: "Базовое электроснабжение",
                optionTitle: "БАЗОВОЕ",
                optionPrice: 271000,
                optionText: "",
              },
              {
                dataTitle: "Оптимальное электроснабжение",
                optionTitle: "ОПТИМАЛЬНОЕ",
                optionPrice: 408000,
                optionText: "",
              },
            ],
          },
          {
            title: "ОТОПЛЕНИЕ",
            radioName: "heat",
            allowDeselect: true,
            subTitle: "",
            subblocks: [
              {
                dataTitle: "Конвекторное отопление",
                optionTitle: "КОНВЕКТОРНОЕ",
                optionPrice: 121500,
                optionText: "",
              },
              {
                dataTitle: "Радиаторное котельное отопление",
                optionTitle: "РАДИАТОРНОЕ КОТЕЛЬНОЕ",
                optionPrice: 196000,
                optionText: "",
              },
              {
                dataTitle: "Отопление тёплым полом",
                optionTitle: "ТЁПЛЫЙ ПОЛ ВОДЯНОЙ",
                optionPrice: 1280500,
                optionText: "",
                require: [
                  {
                    id: "fundament-2",
                    alert: "alert_need_fundament",
                  },
                ],
              },
            ],
          },
          {
            title: "ВОДОСНАБЖЕНИЕ",
            radioName: "water",
            allowDeselect: true,
            subTitle: "",
            subblocks: [
              {
                dataTitle: "Водоснабжение через PPR коллектор",
                optionTitle: "PPR КОЛЛЕКТОР",
                optionPrice: 57000,
                optionText: "",
              },
              {
                dataTitle: "Водоснабжение через металл коллектор",
                optionTitle: "МЕТАЛЛ КОЛЛЕКТОР",
                optionPrice: 114000,
                optionText: "",
              },
            ],
          },

          {
            dataTitle: "Вентиляция",
            title: "ВЕНТИЛЯЦИЯ",
            checkboxName: "air",
            price: 26000,
          },
        ],
      },
    ],
  },

  {
    column: 2,
    sections: [
      {
        title: "ФУНДАМЕНТ",
        blocks: [
          {
            title: "ФУНДАМЕНТ",
            radioName: "fundament",
            allowDeselect: true,
            subTitle: "",
            subblocks: [
              {
                dataTitle: "Фундамент - ЖБ сваи",
                optionTitle: "ЖБ СВАИ",
                optionPrice: 240000,
                optionText: "",
                require: [
                  {
                    id: "platform",
                    alert: "alert_need_platform",
                  },
                ],
              },
              {
                dataTitle: "Фундамент - ЖБ плита",
                optionTitle: "ЖБ ПЛИТА",
                optionPrice: 1120000,
                optionText: "",
                exclude: [
                  {
                    id: "platform", // если платформа включена
                    alert: "alert_not_fundament", // показать alert
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        title: "ВНУТРЕННЯЯ ИНЖЕНЕРИЯ",
        blocks: [
          {
            title: "ВНУТРЕННЯЯ ОТДЕЛКА СТЕН",
            radioName: "walls",
            allowDeselect: true,
            subTitle: "",
            subblocks: [
              {
                dataTitle: "Отделка - ГКЛ/ГВЛ",
                optionTitle: "ГКЛ/ГВЛ",
                optionPrice: 338500,
                optionText: "",
              },
              {
                dataTitle: "Отделка - OSB + ГКЛ/ГВЛ",
                optionTitle: "OSB + ГКЛ/ГВЛ",
                optionPrice: 652000,
                optionText: "",
              },
            ],
          },
        ],
      },

      {
        title: "ВНЕШНЯЯ ИНЖЕНЕРИЯ",
        blocks: [
          {
            dataTitle: "Водоснабжение",
            title: "ВОДОСНАБЖЕНИЕ",
            checkboxName: "engineer-water",
            subTitle: "Скважина 50м",
            price: 250000,
          },
          {
            dataTitle: "Канализация",
            title: "КАНАЛИЗАЦИЯ",
            checkboxName: "engineer-sewerage",
            subTitle: "ТОПАС 5 с монтажом",
            price: 270000,
          },
          {
            dataTitle: "Электричество",
            title: "ЭЛЕКТРИЧЕСТВО",
            checkboxName: "engineer-energy",
            subTitle: "Подключение дома",
            price: 50000,
          },
        ],
      },
    ],
  },
];

const terraceBlock = {
  radioName: "terrace",
  allowDeselect: true,
  subblocks: [
    {
      dataTitle: "Террасса - крытая",
      optionTitle: "КРЫТАЯ",
      optionPrice: 775000,
      relations: [
        { id: "house-montage", change: 140000 },
        { id: "house-delivery", change: 40000 },
      ],
      imageSrc: "/img/house_08_ultimate.jpg",
    },
    {
      dataTitle: "Террасса - открытая",
      optionTitle: "ОТКРЫТАЯ",
      optionPrice: 230000,
      relations: [
        { id: "house-montage", change: 40000 },
        { id: "house-delivery", change: 25000 },
      ],
      imageSrc: "/img/house_08_open.jpg",
    },
  ],
};

const BASE_PRICE = 5_150_000;

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
    className: "house__img-default hidden-custom",
    dataGroup: "default",
    width: 400,
    height: 400,
  },
  {
    id: "default-gable",
    src: "/img/home/default-gable.jpg",
    alt: "база дома",
    className: "house__img-default hidden-custom",
    dataGroup: "default",
    width: 400,
    height: 400,
  },

  // фасад
  {
    id: "facade__white",
    src: "/img/home/mkc-08__facade__white.png",
    alt: "белый фасад",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__gray",
    src: "/img/home/mkc-08__facade__gray.png",
    alt: "серый фасад",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__black",
    src: "/img/home/mkc-08__facade__black.png",
    alt: "чёрный фасад",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__white-gable",
    src: "/img/home/mkc-08__facade__white-gable.png",
    alt: "белый фасад двускатный",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__gray-gable",
    src: "/img/home/mkc-08__facade__gray-gable.png",
    alt: "серый фасад двускатный",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade__black-gable",
    src: "/img/home/mkc-08__facade__black-gable.png",
    alt: "чёрный фасад двускатный",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },

  // фасад планкен
  {
    id: "facade-planken__white",
    src: "/img/home/mkc-08__facade-planken_white.png",
    alt: "фасад планкен белый",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade-planken__gray",
    src: "/img/home/mkc-08__facade-planken_gray.png",
    alt: "фасад планкен серый",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },
  {
    id: "facade-planken__black",
    src: "/img/home/mkc-08__facade-planken_black.png",
    alt: "фасад планкен чёрный",
    className: "house__img hidden-custom",
    dataGroup: "fasad",
    width: 400,
    height: 400,
  },

  // планкен
  {
    id: "planken__walnut",
    src: "/img/home/mkc-08__planken__walnut.png",
    alt: "планкен орех",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__rosewood",
    src: "/img/home/mkc-08__planken__rosewood.png",
    alt: "планкен палисандр",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__pine",
    src: "/img/home/mkc-08__planken__pine.png",
    alt: "планкен сосна",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__black",
    src: "/img/home/mkc-08__planken__black.png",
    alt: "планкен чёрный",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },

  // планкен двускатные
  {
    id: "planken__walnut-gable",
    src: "/img/home/mkc-08__planken__walnut-gable.png",
    alt: "планкен орех двускатный",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__rosewood-gable",
    src: "/img/home/mkc-08__planken__rosewood-gable.png",
    alt: "планкен палисандр двускатный",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__pine-gable",
    src: "/img/home/mkc-08__planken__pine-gable.png",
    alt: "планкен сосна двускатный",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },
  {
    id: "planken__black-gable",
    src: "/img/home/mkc-08__planken__black-gable.png",
    alt: "планкен чёрный двускатный",
    className: "house__img hidden-custom",
    dataGroup: "balk",
    width: 400,
    height: 400,
  },

  // окна
  {
    id: "windows__graphite",
    src: "/img/home/mkc-08__windows__graphite.png",
    alt: "окна графит",
    className: "house__img hidden-custom",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__light_wood",
    src: "/img/home/mkc-08__windows__light-wood.png",
    alt: "окна светлое дерево",
    className: "house__img hidden-custom",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__chocolate",
    src: "/img/home/mkc-08__windows__chocolate.png",
    alt: "окна шоколад",
    className: "house__img hidden-custom",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },

  // окна двускатные
  {
    id: "windows__light_wood-gable",
    src: "/img/home/mkc-08__windows__light-wood-gable.png",
    alt: "окна светлое дерево",
    className: "house__img hidden-custom",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__graphite-gable",
    src: "/img/home/mkc-08__windows__graphite-gable.png",
    alt: "окна антрацит двускатные",
    className: "house__img hidden-custom",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },
  {
    id: "windows__chocolate-gable",
    src: "/img/home/mkc-08__windows__chocolate-gable.png",
    alt: "окна шоколад двускатные",
    className: "house__img hidden-custom",
    dataGroup: "windows",
    width: 400,
    height: 400,
  },

  // фасадное освещение
  {
    id: "fasad-light__white",
    src: "/img/home/mkc-08__fasad-light_white.png",
    alt: "фасадное освещение белое",
    className: "house__img hidden-custom",
    width: 400,
    height: 400,
  },
  {
    id: "fasad-light__black",
    src: "/img/home/mkc-08__fasad-light_black.png",
    alt: "фасадное освещение чёрное",
    className: "house__img hidden-custom",
    width: 400,
    height: 400,
  },
  // фасадное освещение (дополнение)
  {
    id: "fasad-light__gray",
    src: "/img/home/mkc-08__fasad-light_gray.png",
    alt: "фасадное освещение серое",
    className: "house__img hidden-custom",
    dataGroup: "fasad-light",
    width: 400,
    height: 400,
  },
  {
    id: "fasad-light__white-gable",
    src: "/img/home/mkc-08__fasad-light_white-gable.png",
    alt: "фасадное освещение белое двускатное",
    className: "house__img hidden-custom",
    dataGroup: "fasad-light",
    width: 400,
    height: 400,
  },
  {
    id: "fasad-light__gray-gable",
    src: "/img/home/mkc-08__fasad-light_gray-gable.png",
    alt: "фасадное освещение серое двускатное",
    className: "house__img hidden-custom",
    dataGroup: "fasad-light",
    width: 400,
    height: 400,
  },
  {
    id: "fasad-light__black-gable",
    src: "/img/home/mkc-08__fasad-light_black-gable.png",
    alt: "фасадное освещение чёрное двускатное",
    className: "house__img hidden-custom",
    dataGroup: "fasad-light",
    width: 400,
    height: 400,
  },

  // крыша
  {
    id: "roof__metal",
    src: "/img/home/mkc-08__roof_metal.png",
    alt: "крыша металл",
    className: "house__img hidden-custom",
    dataGroup: "roof",
    width: 400,
    height: 400,
  },
  {
    id: "roof__fals",
    src: "/img/home/mkc-08__roof_fals.png",
    alt: "крыша клик-фальц",
    className: "house__img hidden-custom",
    dataGroup: "roof",
    width: 400,
    height: 400,
  },
  {
    id: "roof__metal-gable",
    src: "/img/home/mkc-08__roof_metal-gable.png",
    alt: "крыша металл двускатная",
    className: "house__img hidden-custom",
    dataGroup: "roof",
    width: 400,
    height: 400,
  },
  {
    id: "roof__fals-gable",
    src: "/img/home/mkc-08__roof_fals-gable.png",
    alt: "крыша клик-фальц двускатная",
    className: "house__img hidden-custom",
    dataGroup: "roof",
    width: 400,
    height: 400,
  },

  // снегодержатели
  {
    id: "snow-holders__metal",
    src: "/img/home/mkc-08__snow-holders_metal.png",
    alt: "снегодержатели металл",
    className: "house__img hidden-custom",
    dataGroup: "snow",
    width: 400,
    height: 400,
  },
  {
    id: "snow-holders__fals",
    src: "/img/home/mkc-08__snow-holders_fals.png",
    alt: "снегодержатели фальц",
    className: "house__img hidden-custom",
    dataGroup: "snow",
    width: 400,
    height: 400,
  },
  {
    id: "snow-holders__metal-gable",
    src: "/img/home/mkc-08__snow-holders_metal-gable.png",
    alt: "снегодержатели металл двускатные",
    className: "house__img hidden-custom",
    dataGroup: "snow",
    width: 400,
    height: 400,
  },
  {
    id: "snow-holders__fals-gable",
    src: "/img/home/mkc-08__snow-holders_fals-gable.png",
    alt: "снегодержатели фальц двускатные",
    className: "house__img hidden-custom",
    dataGroup: "snow",
    width: 400,
    height: 400,
  },

  // водосточная система
  {
    id: "water-sliv-system__base",
    src: "/img/home/mkc-08__water-sliv-system_base.png",
    alt: "водосточная система",
    className: "house__img hidden-custom",
    dataGroup: "gutter",
    width: 400,
    height: 400,
  },
  {
    id: "water-sliv-system__base-gable",
    src: "/img/home/mkc-08__water-sliv-system_base-gable.png",
    alt: "водосточная система двускатная",
    className: "house__img hidden-custom",
    dataGroup: "gutter",
    width: 400,
    height: 400,
  },

  // входная группа
  {
    id: "inner-group__metal",
    src: "/img/home/mkc-08__inner-group_metal.png",
    alt: "входная группа металл",
    className: "house__img hidden-custom",
    dataGroup: "entrance",
    width: 400,
    height: 400,
  },
  {
    id: "inner-group__fals",
    src: "/img/home/mkc-08__inner-group_fals.png",
    alt: "входная группа фальц",
    className: "house__img hidden-custom",
    dataGroup: "entrance",
    width: 400,
    height: 400,
  },
  {
    id: "inner-group__metal-gable",
    src: "/img/home/mkc-08__inner-group_metal-gable.png",
    alt: "входная группа металл двускатная",
    className: "house__img hidden-custom",
    dataGroup: "entrance",
    width: 400,
    height: 400,
  },
  {
    id: "inner-group__fals-gable",
    src: "/img/home/mkc-08__inner-group_fals-gable.png",
    alt: "входная группа фальц двускатная",
    className: "house__img hidden-custom",
    dataGroup: "entrance",
    width: 400,
    height: 400,
  },

  // водосток входной группы
  {
    id: "water-sliv-system__inner-group",
    src: "/img/home/mkc-08__water-sliv-system_inner-group.png",
    alt: "водосток входной группы",
    className: "house__img hidden-custom",
    dataGroup: "gutter-entrance",
    width: 400,
    height: 400,
  },
  {
    id: "water-sliv-system__inner-group-gable",
    src: "/img/home/mkc-08__water-sliv-system_inner-group-gable.png",
    alt: "водосток входной группы двускатный",
    className: "house__img hidden-custom",
    dataGroup: "gutter-entrance",
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
  // разворачиваем второй массив в плоский
  const flatCalculatorGroups = calculatorGroups.flatMap((col) =>
    col.sections.flatMap((section) => section.blocks),
  );
  const [activeTab, setActiveTab] = useState("fasad");
  // helper для -gable
  const withRoof = (id) => (currentRoof === "gable" ? `${id}-gable` : id);
  const [activeSlider, setActiveSlider] = useState(4); // по умолчанию кухня (как у тебя showSlider(4))
  const slidersRef = useRef([]);
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const [currentView, setCurrentView] = useState("front");
  const [currentRoof, setCurrentRoof] = useState("hip");
  // inputsState: { id: { id, value, checked, disabled } }
  const [inputs, setInputs] = useState({});
  // baseValues: original numbers (to recalc relations each time)
  const [baseValues, setBaseValues] = useState({});
  // requirements map (если нужно, берем из данных — в ваших JSON-ах нет require, но поддержка оставлена)
  const [requirementsMap, setRequirementsMap] = useState({});
  const [excludeMap, setExcludeMap] = useState({});
  const isWindowsLaminated =
    inputs["windows-2"]?.checked || inputs["windows-3"]?.checked;
  const isPlankenEnabled = inputs["fasad-planken"]?.checked;
  const excludes = {};
  // объединяем всё в один массив
  const allBlocks = [terraceBlock, ...blocksData, ...flatCalculatorGroups];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initSlider = async () => {
      const { tns } = await import("tiny-slider/src/tiny-slider");

      slidersRef.current.forEach((sliderBlock) => {
        if (!sliderBlock) return;

        const slider = sliderBlock.querySelector(".visual-slider");
        const thumbs = sliderBlock.querySelector(".visual-slider__thumbnails");

        if (!slider || slider.dataset.initialized) return;

        tns({
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

        if (!slidersRef.current.length) return;

        slidersRef.current.forEach((sliderBlock) => {
          if (!sliderBlock) return;

          const slider = sliderBlock.querySelector(".visual-slider");
          const thumbs = sliderBlock.querySelector(
            ".visual-slider__thumbnails",
          );

          if (!slider || slider.dataset.initialized) return;

          if (tns) {
          }
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

        slider.dataset.initialized = "true";
      });
    };

    initSlider();
  }, []);

  useEffect(() => {
    const initial = {};
    const base = {};
    const reqs = {};

    allBlocks.forEach((b) => {
      if (b.subblocks && b.radioName) {
        b.subblocks.forEach((sub, idx) => {
          const id = `${b.radioName}-${idx + 1}`;
          const val = parseInt(sub.optionPrice || 0, 10);
          base[id] = val;
          initial[id] = {
            id,
            value: val,
            checked: b.default === idx + 1,
          };
          // если подблок имеет require / relations, мы могли бы сохранить (в вашем JSON relations есть)
          if (sub.require) reqs[id] = sub.require;
          if (sub.exclude) excludes[id] = sub.exclude;
          if (sub.relations) {
            // attach relations in block data (we will read from blocksData when computing)
          }
        });
      } else if (b.checkboxName) {
        const id = b.checkboxName;
        const val = parseInt(b.price || 0, 10);
        base[id] = val;
        initial[id] = {
          id,
          value: val,
          checked:
            b.default === "yes" || b.default === "forever" ? true : false,
          disabled: b.default === "forever",
        };
        if (b.require) reqs[id] = b.require;
        if (b.exclude) excludes[id] = b.exclude;
      }
    });

    setInputs(initial);
    setBaseValues(base);
    setRequirementsMap(reqs);
    setExcludeMap(excludes);
  }, []);

  const relationsBySource = useMemo(() => {
    const map = {};
    allBlocks.forEach((b) => {
      if (b.relations && b.checkboxName) {
        map[b.checkboxName] = b.relations.map((r) => ({
          id: r.id,
          change: parseInt(r.change, 10),
        }));
      }
      if (b.subblocks && b.radioName) {
        b.subblocks.forEach((sub, idx) => {
          if (sub.relations) {
            const id = `${b.radioName}-${idx + 1}`;
            map[id] = sub.relations.map((r) => ({
              id: r.id,
              change: parseInt(r.change, 10),
            }));
          }
        });
      }
    });
    return map;
  }, []);

  const checkRequirements = (id) => {
    const reqs = requirementsMap[id];
    if (!reqs) return { ok: true };

    for (let req of reqs) {
      if (!inputs[req.id]?.checked) {
        return {
          ok: false,
          alertId: req.alert, // 👈 теперь возвращаем id DOM-элемента
        };
      }
    }

    return { ok: true };
  };

  const checkExcludes = (id) => {
    const excludes = excludeMap[id];
    if (!excludes) return { ok: true };

    for (let ex of excludes) {
      if (inputs[ex.id]?.checked) {
        return {
          ok: false,
          alertId: ex.alert,
        };
      }
    }

    return { ok: true };
  };

  const showAlert = (alertId) => {
    if (!alertId) return;

    const el = document.getElementById(alertId);
    if (!el) return;

    el.classList.add("show");
  };

  const applyRelations = (state) => {
    let updated = { ...state };
    let changed = true;

    while (changed) {
      changed = false;

      // --- REQUIRE ---
      Object.entries(requirementsMap).forEach(([id, requirements]) => {
        if (!updated[id]?.checked) return;

        const ok = requirements.every((req) => updated[req.id]?.checked);

        if (!ok) {
          updated[id] = {
            ...updated[id],
            checked: false,
          };
          changed = true;
        }
      });

      // --- EXCLUDE ---
      Object.entries(excludeMap).forEach(([id, excludes]) => {
        if (!updated[id]?.checked) return;

        excludes.forEach((ex) => {
          if (updated[ex.id]?.checked) {
            updated[ex.id] = {
              ...updated[ex.id],
              checked: false,
            };
            changed = true;
          }
        });
      });
    }

    return updated;
  };

  // Пересчитать текущие значения (применить relations суммируемо)
  const computeCurrentValues = () => {
    // start from baseValues
    const current = { ...baseValues };
    // apply relations from each checked input
    Object.values(inputs).forEach((inp) => {
      if (!inp.checked) return;
      const rels = relationsBySource[inp.id];
      if (!rels) return;
      rels.forEach(({ id: targetId, change }) => {
        // ensure target exists in current map, если нет — создаём
        current[targetId] = (current[targetId] || 0) + change;
      });
    });
    return current;
  };

  const currentValues = computeCurrentValues();

  // Сумма по локальным группам
  const computeSummary = () => {
    let total = BASE_PRICE;
    const reportLines = [
      "Стоимость домокомплекта МКЦ-08:",
      "",
      `Базовая стоимость  - ${BASE_PRICE.toLocaleString()} ₽`,
      "",
    ];
    const localSums = {};

    // build updated (reset inputs values based on currentValues)
    Object.values(inputs).forEach((inp) => {
      const price = currentValues[inp.id] ?? inp.value ?? 0;
      if (inp.checked) {
        total += price;
        const title = (function () {
          // try to find dataTitle from blocksData for nicer report
          for (let b of allBlocks) {
            if (b.checkboxName === inp.id) return b.dataTitle || b.title;
            if (b.subblocks && b.radioName) {
              const idx = b.subblocks.findIndex(
                (_, i) => `${b.radioName}-${i + 1}` === inp.id,
              );
              if (idx !== -1) return b.subblocks[idx].dataTitle;
            }
          }
          return inp.id;
        })();
        reportLines.push(`- ${title} - ${price.toLocaleString()} ₽`);

        // local sums
        // find localSumName from blocksData
        for (let b of allBlocks) {
          if (b.checkboxName === inp.id && b.localSumName) {
            localSums[b.localSumName] =
              (localSums[b.localSumName] || BASE_PRICE) + price;
          }
          if (b.subblocks && b.radioName) {
            const idx = b.subblocks.findIndex(
              (_, i) => `${b.radioName}-${i + 1}` === inp.id,
            );
            if (idx !== -1 && b.localSumName) {
              localSums[b.localSumName] =
                (localSums[b.localSumName] || BASE_PRICE) + price;
            }
          }
        }
      }
    });

    reportLines.push(
      "",
      `Итого дом на участке с инженерией: ${total.toLocaleString()} ₽`,
    );

    return {
      total,
      reportText: encodeURIComponent(reportLines.join("\n")),
      localSums,
      reportLines,
    };
  };

  const { total, reportText, localSums } = computeSummary();

  // Обработчики изменений
  const handleToggle = (id, checked) => {
    if (checked) {
      // 1️⃣ Проверяем require для выбранного элемента
      const requirementCheck = checkRequirements(id);
      if (!requirementCheck.ok) {
        showAlert(requirementCheck.alertId);
        return;
      }

      // 2️⃣ Применяем updated сразу, чтобы проверять excludes от включенных элементов
      setInputs((prev) => {
        let updated = { ...prev, [id]: { ...prev[id], checked } };

        updated = applyRelations(updated);

        // 3️⃣ Проверяем исключения от всех включенных элементов
        for (let [sourceId, excludes] of Object.entries(excludeMap)) {
          if (!updated[sourceId]?.checked) continue;

          for (let ex of excludes) {
            if (updated[ex.id]?.checked) {
              // снимаем конфликтующий элемент
              updated[ex.id] = { ...updated[ex.id], checked: false };
              // показываем alert от источника (sourceId)
              if (ex.alert) showAlert(ex.alert);
            }
          }
        }

        return updated;
      });
    } else {
      // если снимаем — просто обновляем
      setInputs((prev) => ({ ...prev, [id]: { ...prev[id], checked } }));
    }

    // === синхронизация картинок (оставляем без изменений) ===
    if (id === "snow-holders")
      setSelectedParts((prev) => ({ ...prev, snow: checked ? true : null }));
    if (id === "inner-group")
      setSelectedParts((prev) => ({
        ...prev,
        entrance: checked ? true : null,
      }));
    if (id === "water-sliv-system")
      setSelectedParts((prev) => ({ ...prev, gutter: checked ? true : null }));
    if (id === "fasad-light")
      setSelectedParts((prev) => ({
        ...prev,
        fasadLight: checked ? true : null,
      }));
  };

  const firstFacade =
    CHOICE_IMAGES.find((s) => s.section === "fasad")?.items?.[0]?.id ?? null;

  // выбранные элементы
  const [selectedParts, setSelectedParts] = useState({
    fasad: firstFacade,
    balk: null,
    windows: null,
    roof: "metal",
    snow: null,
    gutter: null,
    entrance: null,
    gutterEntrance: null,
    fasadLight: null,
    terrace: null,
  });

  const handleRadioChange = (groupName, selectedId) => {
    const group = allBlocks.find((b) => b.radioName === groupName);
    if (!group) return;

    const allowDeselect = group.allowDeselect === true;
    const requirementCheck = checkRequirements(selectedId);
    const excludeCheck = checkExcludes(selectedId);

    if (!requirementCheck.ok) {
      showAlert(requirementCheck.alertId);
      return;
    }

    if (!excludeCheck.ok) {
      showAlert(excludeCheck.alertId);
      return;
    }

    setInputs((prev) => {
      const copy = { ...prev };
      const isAlreadySelected = prev[selectedId]?.checked;

      if (allowDeselect && isAlreadySelected) {
        // снимаем все в группе
        group.subblocks.forEach((_, idx) => {
          const id = `${groupName}-${idx + 1}`;
          copy[id] = { ...(copy[id] || {}), checked: false };
        });

        // ✅ Обновляем selectedParts после deselect
        if (groupName === "roof") {
          setSelectedParts((prev) => ({ ...prev, roof: null }));
        }

        return applyRelations(copy);
      }

      // обычное radio поведение
      group.subblocks.forEach((_, idx) => {
        const id = `${groupName}-${idx + 1}`;
        copy[id] = { ...(copy[id] || {}), checked: id === selectedId };
      });

      return applyRelations(copy);
    });

    // ✅ Если это крыша и не снятие, обновляем selectedParts
    if (groupName === "roof") {
      const idx = parseInt(selectedId.split("-")[1], 10) - 1;
      const option = group.subblocks[idx];
      if (option) {
        const roofName = option.dataTitle.toLowerCase().includes("клик-фальц")
          ? "fals"
          : "metal";
        setSelectedParts((prev) => ({ ...prev, roof: roofName }));
      }
    }
  };

  const closeAlert = (alertId) => {
    const el = document.getElementById(alertId);
    if (el) {
      el.classList.remove("show");
    }
  };

  useEffect(() => {
    // --- ПЛАНКЕН ---
    if (isPlankenEnabled) {
      // открыть вкладку
      setActiveTab("balk");

      // если ничего не выбрано — выбрать первый
      if (!selectedParts.balk) {
        const firstPlanken = CHOICE_IMAGES.find((s) => s.section === "balk")
          ?.items?.[0]?.id;

        if (firstPlanken) {
          setSelectedParts((prev) => ({
            ...prev,
            balk: firstPlanken,
          }));
        }
      }
    } else {
      // если выключили — сбросить
      setSelectedParts((prev) => ({
        ...prev,
        balk: null,
      }));

      // если активная вкладка была balk — вернуть на фасад
      if (activeTab === "balk") {
        setActiveTab("fasad");
      }
    }

    // --- ОКНА ---
    if (isWindowsLaminated) {
      setActiveTab("windows");

      if (!selectedParts.windows) {
        const firstWindow = CHOICE_IMAGES.find((s) => s.section === "windows")
          ?.items?.[0]?.id;

        if (firstWindow) {
          setSelectedParts((prev) => ({
            ...prev,
            windows: firstWindow,
          }));
        }
      }
    } else {
      setSelectedParts((prev) => ({
        ...prev,
        windows: null,
      }));

      if (activeTab === "windows") {
        setActiveTab("fasad");
      }
    }
  }, [isPlankenEnabled, isWindowsLaminated]);

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

  const getFacadeColor = () => {
    if (!selectedParts.fasad) return null;

    // facade__white → white
    return selectedParts.fasad.split("__")[1];
  };

  const visibleImages = useMemo(() => {
    const result = [];

    // база
    result.push(currentRoof === "gable" ? "default-gable" : "default");

    // фасад
    if (selectedParts.fasad) {
      result.push(withRoof(selectedParts.fasad));
    }

    // планкен
    if (selectedParts.balk) {
      result.push(withRoof(selectedParts.balk));
    }

    // окна
    if (selectedParts.windows) {
      result.push(withRoof(selectedParts.windows));
    }

    // крыша
    if (selectedParts.roof) {
      result.push(
        currentRoof === "gable"
          ? `roof__${selectedParts.roof}-gable`
          : `roof__${selectedParts.roof}`,
      );
    }

    // терраса
    if (selectedParts.terrace) {
      result.push(
        currentRoof === "gable"
          ? `${selectedParts.terrace}-gable`
          : selectedParts.terrace,
      );
    }

    // снегозадержатели
    if (selectedParts.snow) {
      result.push(
        currentRoof === "gable"
          ? `snow-holders__${selectedParts.roof}-gable`
          : `snow-holders__${selectedParts.roof}`,
      );
    }

    // входная группа
    if (selectedParts.entrance) {
      result.push(
        currentRoof === "gable"
          ? `inner-group__${selectedParts.roof}-gable`
          : `inner-group__${selectedParts.roof}`,
      );
    }

    // водосток входной группы
    if (selectedParts.gutterEntrance) {
      result.push(
        currentRoof === "gable"
          ? "water-sliv-system__inner-group-gable"
          : "water-sliv-system__inner-group",
      );
    }

    // фасадное освещение
    // фасадное освещение
    if (selectedParts.fasadLight && selectedParts.fasad) {
      const color = getFacadeColor();

      if (color) {
        result.push(
          currentRoof === "gable"
            ? `fasad-light__${color}-gable`
            : `fasad-light__${color}`,
        );
      }
    }

    // общая водосточка
    if (selectedParts.gutter) {
      result.push(
        currentRoof === "gable"
          ? "water-sliv-system__base-gable"
          : "water-sliv-system__base",
      );
    }

    // водосток входной группы (если и входная группа, и водосточка включены)
    if (selectedParts.entrance && selectedParts.gutter) {
      result.push(
        currentRoof === "gable"
          ? "water-sliv-system__inner-group-gable"
          : "water-sliv-system__inner-group",
      );
    }

    return result;
  }, [selectedParts, currentRoof]);

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
                    width={400}
                    height={400}
                    className={`house__img ${
                      visibleImages.includes(img.id) ? "" : "hidden-custom"
                    }`}
                    priority={true}
                  />
                ))}
              </div>

              <div className="choice__wrapper p-t-20 p-d-20">
                <div className="choice-buttons">
                  <button
                    className={`choice-button ${activeTab === "fasad" ? "active" : ""}`}
                    onClick={() => setActiveTab("fasad")}
                  >
                    Фасад
                  </button>

                  {isPlankenEnabled && (
                    <button
                      className={`choice-button ${activeTab === "balk" ? "active" : ""}`}
                      onClick={() => setActiveTab("balk")}
                    >
                      Планкен
                    </button>
                  )}

                  {isWindowsLaminated && (
                    <button
                      className={`choice-button ${activeTab === "windows" ? "active" : ""}`}
                      onClick={() => setActiveTab("windows")}
                    >
                      Окна
                    </button>
                  )}
                </div>

                <div className="choice-content">
                  {CHOICE_IMAGES.map((section) => (
                    <div
                      key={section.section}
                      className={`items ${
                        activeTab === section.section ? "" : "hidden-custom"
                      }`}
                    >
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className={`item color__${item.color} ${
                            selectedParts[section.section] === item.id
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedParts((prev) => ({
                              ...prev,
                              [section.section]: item.id,
                            }))
                          }
                        >
                          <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            className="image"
                            width={400}
                            height={400}
                            style={{ maxWidth: "none" }}
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
              {blocksData.map((b) => {
                // Если это radio group — передаём сам объект
                if (b.subblocks && b.radioName) {
                  return (
                    <CalculatorBlock
                      key={b.radioName}
                      block={b}
                      inputs={inputs}
                      onToggle={handleToggle}
                      onRadioChange={handleRadioChange}
                      currentValues={currentValues}
                    />
                  );
                } else {
                  return (
                    <CalculatorBlock
                      key={b.checkboxName}
                      block={b}
                      inputs={inputs}
                      onToggle={handleToggle}
                      onRadioChange={handleRadioChange}
                      currentValues={currentValues}
                    />
                  );
                }
              })}
            </div>
          </div>

          <div className="calculator-terrace-sliders__wrapper">
            <div className="block-choice__title p-d-20">
              <div className="block__price">
                <h3 className="h4">ТЕРРАССА</h3>
              </div>
            </div>
            {/* === Терраса сверху === */}
            <div className="calculator__terrace-sliders">
              {allBlocks
                .filter((b) => b.radioName === "terrace")
                .map((b) =>
                  b.subblocks.map((sub, idx) => {
                    const inputId = `${b.radioName}-${idx + 1}`;
                    const input = inputs[inputId] || {};
                    const effectiveValue =
                      currentValues[inputId] ?? input.value ?? 0;

                    return (
                      <div className="calculator__terrace-slide" key={inputId}>
                        {/* === Картинка === */}
                        {sub.imageSrc && (
                          <img
                            src={
                              currentRoof === "gable"
                                ? sub.imageSrc.replace(
                                    /(\.jpg|\.png)$/,
                                    "-gable$1",
                                  )
                                : sub.imageSrc
                            }
                            alt={sub.dataTitle || sub.optionTitle}
                            className="calculator__terrace-slide-img p-d-10"
                          />
                        )}

                        {/* === Выбор === */}
                        <div className="block-choice indent-20L">
                          <div className="block-choice__check">
                            <input
                              type="radio"
                              id={inputId}
                              name={b.radioName}
                              checked={!!input.checked}
                              onClick={() =>
                                handleRadioChange(b.radioName, inputId)
                              }
                              onChange={() => {}}
                            />
                            <label htmlFor={inputId}></label>
                          </div>
                          <div className="block-choice__title">
                            <div className="block__price">
                              <h5 className="h5">{sub.optionTitle}</h5>
                              <span className="h5 price-value">
                                {`+${effectiveValue.toLocaleString()} ₽`}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* === JSON для шаблона (если нужен) === */}
                        <script
                          data-block-template-checkbox
                          type="application/json"
                          dangerouslySetInnerHTML={{
                            __html: JSON.stringify(sub),
                          }}
                        />
                      </div>
                    );
                  }),
                )}
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
            {calculatorGroups.map((col, colIndex) => (
              <div className="calculator__column" key={colIndex}>
                {col.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {section.title && <h3 className="h4">{section.title}</h3>}

                    <div className="calculator__block">
                      {section.blocks.map((block) => (
                        <CalculatorBlock
                          key={block.radioName || block.checkboxName}
                          block={block}
                          inputs={inputs}
                          onToggle={handleToggle}
                          onRadioChange={handleRadioChange}
                          currentValues={currentValues}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
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
              ИТОГО СТОИМОСТЬ:{" "}
              <b id="summary-global">{total.toLocaleString("ru-RU")} ₽</b>
            </span>
          </div>
        </div>
      </section>

      <div id="alert_need_platform" className="alert">
        <div className="alert__inner">
          <p className="alert__text">
            ПРИ МОНТАЖЕ НА СВАЙНЫЙ ФУНДАМЕНТ В КОМПЛЕКТАЦИИ ДОМА ВЫБЕРИТЕ
            ПЛАТФОРМУ.
          </p>

          <div className="buttons buttons-right">
            <button
              type="button"
              className="button button-yellow"
              onClick={() => {
                closeAlert("alert_need_platform");

                // скролл к блоку
                document.getElementById("platform")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              ОК
            </button>
          </div>
        </div>
      </div>

      <div id="alert_not_fundament" className="alert">
        <div className="alert__inner">
          <p className="alert__text">
            ПРИ МОНТАЖЕ ДОМА НА ПЛИТНЫЙ ФУНДАМЕНТ В КОМПЛЕКТАЦИИ ДОМА УБЕРИТЕ
            ПЛАТФОРМУ.
          </p>

          <div className="buttons buttons-right">
            <button
              type="button"
              className="button button-yellow"
              onClick={() => {
                closeAlert("alert_not_fundament");

                document.getElementById("platform")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              ОК
            </button>
          </div>
        </div>
      </div>

      <div id="alert_need_fundament" className="alert">
        <div className="alert__inner">
          <p className="alert__text">
            ДЛЯ ДАННОГО ТИПА ОТОПЛЕНИЯ ВЫБЕРЕТЕ ПЛИТНЫЙ ФУНДАМЕНТ
          </p>

          <div className="buttons buttons-right">
            <button
              type="button"
              className="button button-yellow"
              onClick={() => {
                closeAlert("alert_need_fundament");

                // скроллим к блоку фундамента
                document.getElementById("fundament")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              ОК
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
