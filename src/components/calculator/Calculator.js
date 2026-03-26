"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import "tiny-slider/dist/tiny-slider.css";
import { useEffect, useRef, useState } from "react";
import CalculatorBlock from "@/components/calculator-block/Calculator-block";
import SectionTitle from "@/components/ui/sectionTitle";

const Calculator = ({ calculatorData }) => {
  const blocksData = calculatorData.blocksData;
  const calculatorGroups = calculatorData.calculatorGroups;
  const terraceBlock = calculatorData.terraceBlock;
  const HOUSE_IMAGES = calculatorData.HOUSE_IMAGES;
  const CHOICE_IMAGES = calculatorData.CHOICE_IMAGES;
  const roofImages = calculatorData.roofImages;
  const AVAILABLE_ROOFS = calculatorData.available_roofs;
  const AVAILABLE_LAYOUTS = calculatorData.available_layouts;
  const BASE_PRICE = calculatorData.base_price;
  const viewsOrder = ["back", "left", "front", "right"];
  const flatCalculatorGroups = calculatorGroups.flatMap((col) =>
    col.sections.flatMap((section) => section.blocks),
  );
  const [activeTab, setActiveTab] = useState("fasad");
  const withRoof = (id) => (currentRoof === "gable" ? `${id}-gable` : id);
  const rooms = calculatorData.rooms;
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const [currentView, setCurrentView] = useState("front");
  const [currentRoof, setCurrentRoof] = useState(AVAILABLE_ROOFS[0].id);
  const [currentLayout, setCurrentLayout] = useState(AVAILABLE_LAYOUTS[0].picture);
  const [inputs, setInputs] = useState({});
  const [baseValues, setBaseValues] = useState({});
  const [requirementsMap, setRequirementsMap] = useState({});
  const [excludeMap, setExcludeMap] = useState({});
  const isWindowsLaminated =
    inputs["windows-2"]?.checked || inputs["windows-3"]?.checked;
  const isPlankenEnabled = inputs["fasad-planken"]?.checked;
  const excludes = {};
  const [hasInteracted, setHasInteracted] = useState(false);
  const allBlocks = [terraceBlock, ...blocksData, ...flatCalculatorGroups];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initSlider = async () => {
      const { tns } = await import("tiny-slider/src/tiny-slider");

      const sliders = document.querySelectorAll(".visual-slider");

      sliders.forEach((slider) => {
        if (slider.dataset.initialized) return;

        const thumbs = slider.parentElement.querySelector(
          ".visual-slider__thumbnails",
        );

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

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const activeRoomData = rooms.find(r => r.id === activeRoom);

    const startX = useRef(0);
    const isDragging = useRef(false);

    useEffect(() => {
        if (!lightboxOpen) return;

        const handleStart = (x) => {
            startX.current = x;
            isDragging.current = true;
        };

        const handleEnd = (x) => {
            if (!isDragging.current || !activeRoomData) return;

            const diff = x - startX.current;

            if (Math.abs(diff) > 50) {
                if (diff < 0) {
                    // свайп влево → вперед
                    setCurrentImageIndex((prev) =>
                        (prev + 1) % activeRoomData.images.length
                    );
                } else {
                    // свайп вправо → назад
                    setCurrentImageIndex((prev) =>
                        prev === 0
                            ? activeRoomData.images.length - 1
                            : prev - 1
                    );
                }
            }

            isDragging.current = false;
        };

        // TOUCH
        const onTouchStart = (e) =>
            handleStart(e.touches[0].clientX);

        const onTouchEnd = (e) =>
            handleEnd(e.changedTouches[0].clientX);

        // MOUSE
        const onMouseDown = (e) => handleStart(e.clientX);
        const onMouseUp = (e) => handleEnd(e.clientX);

        window.addEventListener("touchstart", onTouchStart);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [lightboxOpen, activeRoom]);


    useEffect(() => {
        if (!lightboxOpen || !activeRoomData) return;

        const handleKey = (e) => {
            if (e.key === "Escape") setLightboxOpen(false);

            if (e.key === "ArrowRight") {
                setCurrentImageIndex((prev) =>
                    (prev + 1) % activeRoomData.images.length
                );
            }

            if (e.key === "ArrowLeft") {
                setCurrentImageIndex((prev) =>
                    prev === 0
                        ? activeRoomData.images.length - 1
                        : prev - 1
                );
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxOpen, activeRoom]);
    const [isMainLayout, setMainLayout] = useState(true);

    useEffect(() => {
        setMainLayout(currentLayout === AVAILABLE_LAYOUTS[0].picture)
    }, [currentLayout])

  return (
    <section className={`overflow-x-hidden`}>
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


        <SectionTitle
            sectionName={"План"}
            sectionTitle={"План"}
            no_line={true}
            no_descr={true}
        />

        {/* ROOF SWITCH */}
        <div className="roof-switch switch-cont-spec-2 flex flex-wrap gap-2 justify-center">
            {AVAILABLE_LAYOUTS.map((layout) => (
                <button
                    key={layout.label}
                    className={`roof-switch__btn switch-spec-2 ${
                        currentLayout === layout.picture ? "is-active" : ""
                    }`}
                    onClick={() => {
                        if (AVAILABLE_LAYOUTS.length > 1) {
                            setCurrentLayout(layout.picture);
                        }
                    }}
                    disabled={AVAILABLE_LAYOUTS.length === 1}
                >
                    {layout.label}
                </button>
            ))}
        </div>

        <section className="section sec_plan">
            <div className="section__inner plan">
                <div className="flex flex-col gap-6 items-center">

                    {/* ПЛАН */}
                    <div className="visualization-scheme__wrapper max-lg:w-[calc(100vw - 100px)] w-[800px] layout-cont">
                        <div
                            className="visualization-scheme"
                            style={{
                                backgroundImage: `url(${currentLayout})`,
                            }}
                        />

                        {/* ❌ overlay только для первого плана */}
                        {isMainLayout &&
                            rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className={`visualization-scheme area ${
                                        hasInteracted && activeRoom === room.id ? "active" : ""
                                    }`}
                                    style={{
                                        clipPath: `polygon(${room.polygon
                                            .map(([x, y]) => `${x}% ${y}%`)
                                            .join(",")})`,
                                    }}
                                    data-tooltip={`${room.label}\n( ${room.area} )`}
                                    onClick={() => {
                                        setActiveRoom(room.id);
                                        setHasInteracted(true);
                                    }}
                                />
                            ))}
                    </div>

                    {/* ❌ блок с кнопками и галереей только для первого плана */}
                    {isMainLayout && (() => {
                        const activeRoomData =
                            rooms.find((r) => r.id === activeRoom) || rooms[0];

                        return (
                            <div className="w-full">

                                {/* ROOM SWITCH */}
                                <div className="roof-switch switch-cont-spec flex flex-wrap gap-2 justify-center">
                                    {rooms.map((room) => (
                                        <button
                                            key={room.id}
                                            className={`roof-switch__btn switch-spec ${
                                                activeRoomData.id === room.id ? "is-active" : ""
                                            }`}
                                            onClick={() => {
                                                setActiveRoom(room.id);
                                                setHasInteracted(true);
                                            }}
                                        >
                                            {room.label}
                                        </button>
                                    ))}
                                </div>

                                {/* ГАЛЕРЕЯ */}
                                <div className="p-10 bg-[#909090] rounded-b-xl">
                                    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 pb-2">
                                        {activeRoomData.images.map((src, i) => (
                                            <Image
                                                key={i}
                                                src={src}
                                                alt={activeRoomData.label}
                                                width={220}
                                                height={160}
                                                className="w-full h-auto rounded-xl cursor-pointer hover:opacity-80 transition"
                                                onClick={() => {
                                                    setCurrentImageIndex(i);
                                                    setLightboxOpen(true);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        );
                    })()}

                </div>
            </div>
        </section>

        {lightboxOpen && activeRoomData && (
            <div
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center select-none"
                onClick={() => setLightboxOpen(false)}
            >
                {/* ЗАКРЫТЬ */}
                <button
                    className="absolute top-6 right-6 text-white text-4xl z-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLightboxOpen(false);
                    }}
                >
                    ✕
                </button>

                {/* ЛЕВАЯ ЗОНА (большой хитбокс) */}
                <div
                    className="absolute left-0 top-0 h-full w-1/2 cursor-pointer flex items-center pl-6"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) =>
                            prev === 0
                                ? activeRoomData.images.length - 1
                                : prev - 1
                        );
                    }}
                >
      <span className="text-white text-6xl opacity-70 hover:opacity-100 transition">
        ‹
      </span>
                </div>

                {/* ПРАВАЯ ЗОНА */}
                <div
                    className="absolute right-0 top-0 h-full w-1/2 cursor-pointer flex items-center justify-end pr-6"
                    onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) =>
                            (prev + 1) % activeRoomData.images.length
                        );
                    }}
                >
      <span className="text-white text-6xl opacity-70 hover:opacity-100 transition">
        ›
      </span>
                </div>

                {/* КАРТИНКА */}
                <Image
                    src={activeRoomData.images[currentImageIndex]}
                    alt="preview"
                    width={1400}
                    height={900}
                    draggable={false}
                    className="max-h-[90vh] w-auto object-contain pointer-events-none"
                />
            </div>
        )}








        <SectionTitle
            sectionName={"Фасады"}
            sectionTitle={"Фасады"}
            no_line={true}
            no_descr={true}
            c
        />



        <section className="section sect-views">
            <div className="section__inner inner-spec">

                {/* БОЛЬШАЯ КАРТИНКА */}
                <div className={`flex max-2sm:flex-col max-2sm:items-center`} >
                    <div className={`w-1/2 max-2sm:w-4/5`}>
                        <div className="visualization-scheme__wrapper">
                            <div
                                className="visualization-scheme"
                                style={{
                                    backgroundImage: `url(${calculatorData.planImage})`,
                                }}
                            >
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

                        </div>
                    </div>
                    <div className="max-2sm:w-4/5 sect-views__preview w-1/2 flex justify-center items-center">
                        <Image
                            src={roofImages[currentRoof][currentView]}
                            alt=""
                            className="sect-views__preview-image"
                            width={900}
                            height={600}
                            priority
                        />
                    </div>
                </div>

                <div className="roof-switch mt-8">
                    {AVAILABLE_ROOFS.map((roof) => (
                        <button
                            key={roof.id}
                            className={`roof-switch__btn ${
                                currentRoof === roof.id ? "is-active" : ""
                            }`}
                            onClick={() => {
                                if (AVAILABLE_ROOFS.length > 1) {
                                    setCurrentRoof(roof.id);
                                }
                            }}
                            disabled={AVAILABLE_ROOFS.length === 1}
                        >
                            {roof.label}
                        </button>
                    ))}
                </div>
                <div className={`py-8 relative`}>
                    <div className={`absolute w-full bg-[#909090] h-full -translate-y-8 rounded-2xl`}></div>
                        <div
                            className="sect-views__frame "
                            id="views-frame"
                            ref={containerRef}
                        >
                            <div className="active-frame" id="active-frame" ref={frameRef} />

                            {/* СЛАЙДЕР СНИЗУ */}
                            <div className="sect-views__slider">
                                {viewsOrder.map((view) => (
                                    <Image
                                        key={view}
                                        src={roofImages[currentRoof][view]}
                                        alt=""
                                        className={`sect-views__image ${
                                            currentView === view ? "is-active" : ""
                                        }`}
                                        data-view={view}
                                        width={120}
                                        height={120}
                                        onClick={() => setCurrentView(view)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>





            </div>
        </section>







      <section className="section section-calculator">
        <div className="section__inner section-calculator__inner">
          {/*<h2 className="h2 p-d-20">Домокомплект</h2>*/}
                <SectionTitle
                    sectionName={"Домокомплект"}
                    sectionTitle={"Домокомплект"}
                    no_line={true}
                    no_over={true}
                    no_descr={true}
                />


          <div className="section-calculator__section">
            <div className="section-calculator__block calculator__block-house ">
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

            <div className="calculator__blocks p-d-20 pt-5">
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
