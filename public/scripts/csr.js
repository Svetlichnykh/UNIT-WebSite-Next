
document.addEventListener("DOMContentLoaded", () => {
  const relationsMap = {};
  const baseValues = {};
  const requirementsMap = {};

  function checkRequirements(input) {
    const requirements = requirementsMap[input.id];
    if (!requirements) return true;

    let allMet = true;

    requirements.forEach(({ id, alert }) => {
      const target = document.getElementById(id);
      const alertElement = document.getElementById(alert);

      if (!target?.checked) {
        alertElement?.classList.add("show");
        allMet = false;
      } else {
        alertElement?.classList.remove("show");
      }
    });

    return allMet;
  }
  document
    .querySelectorAll(
      "[data-block-template-checkbox], [data-block-template-radio]",
    )
    .forEach((template) => {
      let data;
      try {
        data = JSON.parse(template.textContent.trim());
      } catch (e) {
        console.error("Ошибка парсинга JSON:", e);
        return;
      }

      // Для зависимостей (require)
      if (data.require) {
        const elementId = data.checkboxName || data.radioName;
        requirementsMap[elementId] = data.require;
      }

      // Для чекбоксов
      if (data.relations) {
        relationsMap[data.checkboxName] = data.relations;
      }

      // Для радио-кнопок (проверяем relations и require в подблоках)
      if (data.subblocks) {
        data.subblocks.forEach((sub, index) => {
          if (sub.relations) {
            const inputId = `${data.radioName}-${index + 1}`;
            relationsMap[inputId] = sub.relations;
          }

          if (sub.require) {
            const elementId = `${data.radioName}-${index + 1}`;
            requirementsMap[elementId] = sub.require;
          }
        });
      }
    });


  // Находим все элементы с атрибутом data-block-template-radio
  document
    .querySelectorAll("[data-block-template-radio]")
    .forEach((template) => {
      let data;
      try {
        data = JSON.parse(template.textContent.trim());
      } catch (e) {
        console.error("Ошибка парсинга JSON:", e);
        return;
      }

      // Заголовок основного блока с ценой по умолчанию 0
      const headerHTML = `
            <div class="block-choice__title">
                <div class="block__price">
                    <h4 class="h4">${data.title}</h4>
                    <span class="h4 price-display">+0 ₽</span>
                </div>
                <p class="text">${data.subTitle}</p>
            </div>
        `;

      // Генерация подблоков
      const subblocksHTML = data.subblocks
        .map((sub, index) => {
          // Формируем id для каждого подблока
          const inputId = `${data.radioName}-${index + 1}`;
          const localAttr = data.localSumName
            ? `data-local-sum-name="${data.localSumName}"`
            : "";
          const checkedAttr = data.default === index + 1 ? "checked" : "";
          const relationsAttr = sub.relations
            ? `data-relations='${JSON.stringify(sub.relations)}'`
            : "";

          return `
                <div class="block-choice indent-30L">
                    <div class="block-choice__check">
                        <input type="radio" name="${data.radioName}" id="${inputId}" value="${sub.optionPrice}" 
                               data-title="${sub.dataTitle}" ${checkedAttr} ${localAttr} ${relationsAttr}>
                        <label for="${inputId}"></label>
                    </div>
                    <div class="block-choice__title">
                        <div class="block__price">
                            <h5 class="h5">${sub.optionTitle}</h5>
                            <span class="h5 price-value">+${sub.optionPrice.toLocaleString()} ₽</span>
                        </div>
                        <p class="text">${sub.optionText}</p>
                    </div>
                </div>
            `;
        })
        .join("");

      // Создаём контейнер и заменяем исходный элемент
      const container = document.createElement("div");
      container.className = "calculator__block-radio";
      container.innerHTML = headerHTML + subblocksHTML;
      template.parentNode.replaceChild(container, template);

      const updatePrice = () => {
        const selectedInput = container.querySelector(
          `input[name="${data.radioName}"]:checked`,
        );
        const priceDisplay = container.querySelector(".price-display");

        if (selectedInput) {
          priceDisplay.textContent = `+${parseInt(selectedInput.value, 10).toLocaleString()} ₽`;
          // updateRelatedElements(selectedInput, true);
        } else {
          priceDisplay.textContent = `+0 ₽`;
        }
      };

      // Инициализируем обновление цены
      updatePrice();

      container
        .querySelectorAll(`input[name="${data.radioName}"]`)
        .forEach((input) => {
          input.addEventListener("change", function (e) {
            if (this.checked && !checkRequirements(this)) {
              // Блокируем изменение и восстанавливаем предыдущее состояние
              this.checked = false;

              const prevChecked = container.querySelector(
                `input[name="${data.radioName}"]:checked`,
              );
              if (prevChecked) {
                prevChecked.checked = true;
                prevChecked.dispatchEvent(new Event("change")); // Форсируем обновление
              }

              e.stopImmediatePropagation();
              updateSummary(); // Обновляем итоги
              return;
            }
          });
        });

      // Навешиваем обработчик на все радиокнопки этого блока
      container
        .querySelectorAll(`input[name="${data.radioName}"]`)
        .forEach((input) => {
          input.addEventListener("change", updatePrice);
        });

      document
        .querySelectorAll(".section-calculator .block-choice")
        .forEach((label) => {
          label.addEventListener("click", updatePrice);
        });
    });

  // Находим все элементы с атрибутом data-block-template-checkbox
  document
    .querySelectorAll("[data-block-template-checkbox]")
    .forEach((template) => {
      let data;
      try {
        data = JSON.parse(template.textContent.trim());
      } catch (e) {
        console.error("Ошибка парсинга JSON:", e);
        return;
      }

      const relationsAttr = data.relations
        ? `data-relations='${JSON.stringify(data.relations)}'`
        : "";
      const checkedAttr =
        data.default === "forever"
          ? "checked disabled"
          : data.default === "yes"
            ? "checked"
            : "";
      const localAttr = data.localSumName
        ? `data-local-sum-name="${data.localSumName}"`
        : "";

      let typeAttr = "checkbox";
      if (data.radio) {
        typeAttr = "radio";
      }

      let name = data.checkboxName;
      if (data.radio) {
        name = data.radio;
      }

      const fullHTML = `
            <div class="block-choice">
                <div class="block-choice__check">
                    <input type="${typeAttr}" name="${name}" id="${data.checkboxName}" value="${data.price}"
                           data-title="${data.dataTitle}" ${checkedAttr} ${localAttr} ${relationsAttr}>
                    <label for="${data.checkboxName}"></label>
                </div>

                <div class="block-choice__title">
                    <div class="block__price">
                        <h4 class="h4">${data.title}</h4>
                        <span class="h4 price-value">+${data.price.toLocaleString()} ₽</span>
                    </div>

                    <p class="text">${data.subTitle}</p>
                </div>
            </div>
        `;

      // Вставляем HTML перед текущим элементом
      template.insertAdjacentHTML("beforebegin", fullHTML);
      // Удаляем исходный элемент
      template.remove();

      // const checkbox = document.getElementById(data.checkboxName);
      // if (checkbox) {
      //     checkbox.addEventListener('change', () => {
      //         // updateRelatedElements(checkbox, checkbox.checked);
      //     });
      // }
    });


  document
    .querySelectorAll('input[type="checkbox"], input[type="radio"]')
    .forEach((input) => {
      baseValues[input.id] = parseInt(input.value, 10);
    });

  const updateSummary = () => {
    const basePrice = 3_826_000; // Базовая стоимость
    const phone = "79145445585"; // Номер телефона

    let reportLines = [
      "Стоимость домокомплекта МКЦ-08:",
      "",
      `Базовая стоимость  - ${basePrice.toLocaleString()} ₽`,
      "",
    ];

    let totalPrice = basePrice;
    const localSums = {};
    const updatedElements = new Set();

    document
      .querySelectorAll('input[type="checkbox"], input[type="radio"]')
      .forEach((input) => {
        input.value = baseValues[input.id];
        updatePriceDisplay(input);
      });

    document
      .querySelectorAll(".section-calculator input:checked")
      .forEach((input) => {
        const relations = relationsMap[input.id];
        if (relations) {
          relations.forEach(({ id, change }) => {
            const target = document.getElementById(id);
            if (target) {
              target.value = parseInt(target.value) + parseInt(change);
              updatedElements.add(target);
            }
          });
        }
      });

    updatedElements.forEach((element) => {
      updatePriceDisplay(element);
    });

    document
      .querySelectorAll(".section-calculator input:checked")
      .forEach((input) => {
        const price = parseInt(input.value);
        totalPrice += price;

        reportLines.push(
          `- ${input.dataset.title} - ${price.toLocaleString()} ₽`,
        );

        if (input.dataset.localSumName) {
          localSums[input.dataset.localSumName] =
            (localSums[input.dataset.localSumName] || basePrice) + price;
        }
      });

    // Обновляем глобальную сумму
    document.getElementById("summary-global").textContent =
      `${totalPrice.toLocaleString()} ₽`;

    // Обновление локальных итогов по каждому имени группы
    Object.keys(localSums).forEach((key) => {
      const localElem = document.getElementById(`local-summary-${key}`);
      if (localElem) {
        localElem.textContent = `${localSums[key].toLocaleString()} ₽`;
      }
    });

    // Формируем отчёт
    reportLines.push(
      "",
      `Итого дом на участке с инженерией: ${totalPrice.toLocaleString()} ₽`,
    );
    const reportText = encodeURIComponent(reportLines.join("\n"));

    // Обновляем ссылку на WhatsApp
    const waLink = document.getElementById("wa-check-summary");
    if (waLink) {
      waLink.href = `https://wa.me/${phone}?text=${reportText}`;
    }

    // В самом конце функции updateSummary добавляем:
    document
      .querySelectorAll(".section-calculator input:checked")
      .forEach((input) => {
        updatePriceDisplay(input); // Двойное обновление для вложенных зависимостей
      });
  };

  // Навешиваем обработчики на все radio и checkbox
  document
    .querySelectorAll(
      '.section-calculator input[type="radio"], .block-choice__check input[type="checkbox"]',
    )
    .forEach((input) => {
      input.addEventListener("change", updateSummary);
    });

  document
    .querySelectorAll(".section-calculator .block-choice")
    .forEach((label) => {
      label.addEventListener("click", updateSummary);
    });

  updateSummary(); // Инициализация

  // Добавляем новую функцию для обновления отображения цены
  function updatePriceDisplay(input) {
    // Для подблоков радио-кнопок
    const radioBlock = input.closest(".block-choice");
    if (radioBlock) {
      const priceElement = radioBlock.querySelector(
        ".block__price .h5:last-child",
      );
      if (priceElement) {
        priceElement.textContent = `+${parseInt(input.value).toLocaleString()} ₽`;
      }
    }

    // Для основных чекбоксов/радио
    const mainBlock = input.closest(".block-choice:not(.indent-30L)");
    if (mainBlock) {
      const priceElement = mainBlock.querySelector(
        ".block__price .h4:last-child",
      );
      if (priceElement) {
        priceElement.textContent = `+${parseInt(input.value).toLocaleString()} ₽`;
      }
    }

    // Обновление заголовка радио-группы
    const groupContainer = input.closest(".calculator__block-radio");
    if (groupContainer) {
      const groupPriceElement = groupContainer.querySelector(".price-display");
      const selectedInput = groupContainer.querySelector("input:checked");
      groupPriceElement.textContent = selectedInput
        ? `+${parseInt(selectedInput.value).toLocaleString()} ₽`
        : "+0 ₽";
    }
  }

  // Модифицируем часть с обработкой relations
  relations.forEach(({ id, change }) => {
    const target = document.getElementById(id);
    if (target) {
      target.value = parseInt(target.value) + parseInt(change);
      updatePriceDisplay(target); // Обновляем отображение
    }
  });

  document.querySelectorAll(".section-calculator input").forEach((input) => {
    input.addEventListener("change", function (e) {
      // Для радио-кнопок обработка уже выполнена в их собственном обработчике
      if (input.type === "radio") return;

      if (this.checked && !checkRequirements(this)) {
        this.checked = false;
        e.stopImmediatePropagation();
        return;
      }

      setTimeout(() => {
        updatePriceDisplay(this);
        updateSummary();
      }, 50);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fundamentCheckbox = document.getElementById("fundament-2");
  const platformElement = document.getElementById("platform");
  const alertElement = document.getElementById("alert_not_fundament");

  fundamentCheckbox.addEventListener("change", function () {
    // Проверяем, активен ли элемент #platform (например, имеет класс .active или checked)
    const isPlatformActive =
      platformElement.classList.contains("active") ||
      (platformElement.checked !== undefined && platformElement.checked);

    if (isPlatformActive && this.checked) {
      // Если platform активен и пытаются выбрать фундамент, отменяем выбор и показываем алерт
      this.checked = false;
      alertElement.classList.add("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Элементы выбора крыши
  const roof1 = document.getElementById("roof-1");
  const roof2 = document.getElementById("roof-2");

  // Элементы самой крыши
  const roofMetal = document.getElementById("roof__metal");
  const roofFals = document.getElementById("roof__fals");

  // Элемент выбора внутренней группы
  const innerGroup = document.getElementById("inner-group");

  // Элементы внутренней группы (зависят от крыши)
  const innerGroupMetal = document.getElementById("inner-group__metal");
  const innerGroupFals = document.getElementById("inner-group__fals");

  // Элемент выбора снегозадержателей
  const snowHolders = document.getElementById("snow-holders");

  // Элементы снегозадержателей (зависят от крыши)
  const snowHoldersMetal = document.getElementById("snow-holders__metal");
  const snowHoldersFals = document.getElementById("snow-holders__fals");

  // Элемент выбора водостока
  const waterSlivSystem = document.getElementById("water-sliv-system");

  // Элементы водостока
  const waterSlivBase = document.getElementById("water-sliv-system__base");
  const waterSlivInner = document.getElementById(
    "water-sliv-system__inner-group",
  );

  // Функция обновления видимости
  function updateVisibility() {
    // Управляем видимостью крыши
    if (roof1.checked) {
      roofMetal.classList.remove("hidden");
      roofFals.classList.add("hidden");
    } else if (roof2.checked) {
      roofMetal.classList.add("hidden");
      roofFals.classList.remove("hidden");
    }

    // Управляем видимостью внутренней группы (если она выбрана)
    if (innerGroup.checked) {
      if (roof1.checked) {
        innerGroupMetal.classList.remove("hidden");
        innerGroupFals.classList.add("hidden");
      } else if (roof2.checked) {
        innerGroupMetal.classList.add("hidden");
        innerGroupFals.classList.remove("hidden");
      }
    } else {
      // Если inner-group не выбран, скрываем оба
      innerGroupMetal.classList.add("hidden");
      innerGroupFals.classList.add("hidden");
    }

    // Управляем видимостью снегозадержателей (если они выбраны)
    if (snowHolders.checked) {
      if (roof1.checked) {
        snowHoldersMetal.classList.remove("hidden");
        snowHoldersFals.classList.add("hidden");
      } else if (roof2.checked) {
        snowHoldersMetal.classList.add("hidden");
        snowHoldersFals.classList.remove("hidden");
      }
    } else {
      // Если snow-holders не выбран, скрываем оба
      snowHoldersMetal.classList.add("hidden");
      snowHoldersFals.classList.add("hidden");
    }

    // Управляем видимостью водостока
    if (waterSlivSystem.checked) {
      // Базовый вариант всегда виден, если выбран water-sliv-system
      waterSlivBase.classList.remove("hidden");

      // Дополнительный вариант виден, если выбран inner-group
      if (innerGroup.checked) {
        waterSlivInner.classList.remove("hidden");
      } else {
        waterSlivInner.classList.add("hidden");
      }
    } else {
      // Если водосток не выбран, скрываем оба варианта
      waterSlivBase.classList.add("hidden");
      waterSlivInner.classList.add("hidden");
    }
  }

  // Вешаем обработчики на все радио-кнопки
  roof1.addEventListener("change", updateVisibility);
  roof2.addEventListener("change", updateVisibility);
  innerGroup.addEventListener("change", updateVisibility);
  snowHolders.addEventListener("change", updateVisibility);
  waterSlivSystem.addEventListener("change", updateVisibility);

  // Инициализация при загрузке
  updateVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
  // Переключатель фасада
  const fasadLight = document.getElementById("fasad-light");

  // Элементы фасада (цвета)
  const facadeWhite = document.querySelector('[data-img="facade__white"]');

  const facadeGray = document.querySelector('[data-img="facade__gray"]');

  const facadeBlack = document.querySelector('[data-img="facade__black"]');

  // Элементы для отображения (подсветка фасада)
  const fasadLightWhite = document.getElementById("fasad-light__white");

  const fasadLightGray = document.getElementById("fasad-light__gray");

  const fasadLightBlack = document.getElementById("fasad-light__black");

  // Функция для смены активного цвета
  function setActiveColor(clickedElement) {
    // Удаляем класс .active у всех цветов
    [facadeWhite, facadeGray, facadeBlack].forEach((el) => {
      el.classList.remove("active");
    });

    // Добавляем .active к выбранному цвету
    clickedElement.classList.add("active");

    // Обновляем отображение
    updateFasadVisibility();
  }

  // Функция обновления видимости фасада
  function updateFasadVisibility() {
    // Если переключатель включен
    if (fasadLight.checked) {
      // Проверяем, какой цвет выбран (имеет класс .active)
      if (facadeWhite.classList.contains("active")) {
        fasadLightWhite.classList.remove("hidden");
        fasadLightGray.classList.add("hidden");
        fasadLightBlack.classList.add("hidden");
      } else if (facadeGray.classList.contains("active")) {
        fasadLightWhite.classList.add("hidden");
        fasadLightGray.classList.remove("hidden");
        fasadLightBlack.classList.add("hidden");
      } else if (facadeBlack.classList.contains("active")) {
        fasadLightWhite.classList.add("hidden");
        fasadLightGray.classList.add("hidden");
        fasadLightBlack.classList.remove("hidden");
      } else {
        // Если ни один цвет не выбран, показываем белый по умолчанию
        fasadLightWhite.classList.remove("hidden");
        fasadLightGray.classList.add("hidden");
        fasadLightBlack.classList.add("hidden");
      }
    }
    // Если переключатель выключен
    else {
      fasadLightWhite.classList.add("hidden");
      fasadLightGray.classList.add("hidden");
      fasadLightBlack.classList.add("hidden");
    }
  }

  // Вешаем обработчики событий
  fasadLight.addEventListener("change", updateFasadVisibility);

  // Обработчики кликов на цветах фасада
  if (facadeWhite) {
    facadeWhite.addEventListener("click", function () {
      setActiveColor(facadeWhite);
    });
  }
  if (facadeGray) {
    facadeGray.addEventListener("click", function () {
      setActiveColor(facadeGray);
    });
  }
  if (facadeBlack) {
    facadeBlack.addEventListener("click", function () {
      setActiveColor(facadeBlack);
    });
  }

  // Инициализация при загрузке (выбираем белый по умолчанию, если ничего не выбрано)
  if (
    !facadeWhite.classList.contains("active") &&
    !facadeGray.classList.contains("active") &&
    !facadeBlack.classList.contains("active")
  ) {
    facadeWhite.classList.add("active");
  }
  updateFasadVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
  // Элементы управления
  const fasadPlanken = document.getElementById("fasad-planken");
  const windows1 = document.getElementById("windows-1");
  const windows2 = document.getElementById("windows-2");
  const windows3 = document.getElementById("windows-3");

  // Вкладки
  const btnFasad = document.getElementById("btn__fasad");
  const btnBalk = document.getElementById("btn__balk");
  const btnWindows = document.getElementById("btn__windows");

  // Фасадные элементы
  const facadeWhite = document.querySelector('[data-img="facade__white"]');
  const facadeGray = document.querySelector('[data-img="facade__gray"]');
  const facadeBlack = document.querySelector('[data-img="facade__black"]');

  // Балконные элементы
  const plankenWalnut = document.querySelector('[data-img="planken__walnut"]');
  const plankenRosewood = document.querySelector(
    '[data-img="planken__rosewood"]',
  );
  const plankenPine = document.querySelector('[data-img="planken__pine"]');
  const plankenBlack = document.querySelector('[data-img="planken__black"]');

  // Оконные элементы
  const windowsGraphite = document.querySelector(
    '[data-img="windows__graphite"]',
  );
  const windowsLightWood = document.querySelector(
    '[data-img="windows__light_wood"]',
  );
  const windowsChocolate = document.querySelector(
    '[data-img="windows__chocolate"]',
  );

  let section__fasad = document.getElementById("section__fasad");
  let section__balk = document.getElementById("section__balk");
  let section__windows = document.getElementById("section__windows");

  // Функция активации вкладки фасада
  function activateFasadTab() {
    [btnFasad, btnBalk, btnWindows].forEach((btn) =>
      btn.classList.remove("active"),
    );
    btnFasad.classList.add("active");

    section__fasad.classList.remove("hidden");
    section__balk.classList.add("hidden");
    section__windows.classList.add("hidden");
  }

  // Функция активации вкладки балкона
  function activateBalkTab() {
    [btnFasad, btnBalk, btnWindows].forEach((btn) =>
      btn.classList.remove("active"),
    );
    btnBalk.classList.add("active");

    section__fasad.classList.add("hidden");
    section__balk.classList.remove("hidden");
    section__windows.classList.add("hidden");
  }

  // Функция активации вкладки окон
  function activateWindowsTab() {
    [btnFasad, btnBalk, btnWindows].forEach((btn) =>
      btn.classList.remove("active"),
    );
    btnWindows.classList.add("active");

    section__fasad.classList.add("hidden");
    section__balk.classList.add("hidden");
    section__windows.classList.remove("hidden");
  }

  // Функция обновления видимости вкладок
  function updateTabs() {
    // Обновляем видимость вкладок без автоматического переключения
    if (fasadPlanken.checked) {
      btnBalk.classList.remove("hidden");
    } else {
      btnBalk.classList.add("hidden");
      resetPlanken();
      // Только если текущая активная вкладка - балкон, переключаем на фасад
      if (btnBalk.classList.contains("active")) {
        activateFasadTab();
      }
    }

    if (windows2.checked || windows3.checked) {
      btnWindows.classList.remove("hidden");
    } else {
      btnWindows.classList.add("hidden");
      resetWindows();
      // Только если текущая активная вкладка - окна, переключаем на фасад
      if (btnWindows.classList.contains("active")) {
        activateFasadTab();
      }
    }
  }

  // Функция установки значений по умолчанию
  function setDefaultValues() {
    if (fasadPlanken.checked) {
      // Устанавливаем "сосну" только если ничего не выбрано
      if (
        !plankenWalnut.classList.contains("active") &&
        !plankenRosewood.classList.contains("active") &&
        !plankenPine.classList.contains("active") &&
        !plankenBlack.classList.contains("active")
      ) {
        plankenPine.classList.add("active");
        updatePlanken();
      }
      activateBalkTab();
    }

    if (windows2.checked || windows3.checked) {
      // Устанавливаем "графит" только если ничего не выбрано
      if (
        !windowsGraphite.classList.contains("active") &&
        !windowsLightWood.classList.contains("active") &&
        !windowsChocolate.classList.contains("active")
      ) {
        windowsGraphite.classList.add("active");
        updateWindows();
      }
      activateWindowsTab();
    }
  }

  // Функции сброса выбора
  function resetPlanken() {
    document
      .querySelectorAll(
        "#planken__walnut, #planken__rosewood, #planken__pine, #planken__black",
      )
      .forEach((el) => el.classList.add("hidden"));
    [plankenWalnut, plankenRosewood, plankenPine, plankenBlack].forEach((el) =>
      el.classList.remove("active"),
    );
  }

  function resetWindows() {
    document
      .querySelectorAll(
        "#windows__graphite, #windows__light_wood, #windows__chocolate",
      )
      .forEach((el) => el.classList.add("hidden"));
    [windowsGraphite, windowsLightWood, windowsChocolate].forEach((el) =>
      el.classList.remove("active"),
    );
  }

  // Инициализация обработчиков для фасадных элементов
  function initFacade() {
    [facadeWhite, facadeGray, facadeBlack].forEach((el) => {
      el.addEventListener("click", function () {
        // Убираем active у всех
        [facadeWhite, facadeGray, facadeBlack].forEach((i) =>
          i.classList.remove("active"),
        );
        // Добавляем active текущему
        this.classList.add("active");

        // Обновляем отображение
        updateFacade();
      });
    });
  }

  // Обновление отображения фасада
  function updateFacade() {
    const activeFacade = document.querySelector(
      '[data-img^="facade__"].active',
    );
    const facadeType = fasadPlanken.checked ? "facade-planken" : "facade";

    // Скрываем все варианты
    document
      .querySelectorAll(
        "#facade__white, #facade__gray, #facade__black, #facade-planken__white, #facade-planken__gray, #facade-planken__black",
      )
      .forEach((el) => el.classList.add("hidden"));

    // Показываем нужный вариант
    if (activeFacade) {
      const color = activeFacade.dataset.img.split("__")[1];
      document
        .getElementById(`${facadeType}__${color}`)
        .classList.remove("hidden");
    }
  }

  // Инициализация обработчиков для балконных элементов
  function initPlanken() {
    [plankenWalnut, plankenRosewood, plankenPine, plankenBlack].forEach(
      (el) => {
        el.addEventListener("click", function () {
          // Убираем active у всех
          [plankenWalnut, plankenRosewood, plankenPine, plankenBlack].forEach(
            (i) => i.classList.remove("active"),
          );
          // Добавляем active текущему
          this.classList.add("active");

          // Обновляем отображение
          updatePlanken();
        });
      },
    );
  }

  // Обновление отображения балкона
  function updatePlanken() {
    const activePlanken = document.querySelector(
      '[data-img^="planken__"].active',
    );

    // Скрываем все варианты
    document
      .querySelectorAll(
        "#planken__walnut, #planken__rosewood, #planken__pine, #planken__black",
      )
      .forEach((el) => el.classList.add("hidden"));

    // Показываем нужный вариант
    if (activePlanken) {
      const type = activePlanken.dataset.img.split("__")[1];
      document.getElementById(`planken__${type}`).classList.remove("hidden");
    }
  }

  // Инициализация обработчиков для оконных элементов
  function initWindows() {
    [windowsGraphite, windowsLightWood, windowsChocolate].forEach((el) => {
      el.addEventListener("click", function () {
        // Убираем active у всех
        [windowsGraphite, windowsLightWood, windowsChocolate].forEach((i) =>
          i.classList.remove("active"),
        );
        // Добавляем active текущему
        this.classList.add("active");

        // Обновляем отображение
        updateWindows();
      });
    });
  }

  // Обновление отображения окон
  function updateWindows() {
    const activeWindow = document.querySelector(
      '[data-img^="windows__"].active',
    );

    // Скрываем все варианты
    document
      .querySelectorAll(
        "#windows__graphite, #windows__light_wood, #windows__chocolate",
      )
      .forEach((el) => el.classList.add("hidden"));

    // Показываем нужный вариант
    if (activeWindow) {
      const type = activeWindow.dataset.img.split("__")[1];
      document.getElementById(`windows__${type}`).classList.remove("hidden");
    }
  }

  // Инициализация всех обработчиков
  function init() {
    initFacade();
    initPlanken();
    initWindows();

    // Обработчики для чекбоксов и радио
    fasadPlanken.addEventListener("change", function () {
      updateTabs();
      setDefaultValues();
      updateFacade();
    });

    windows1.addEventListener("change", function () {
      updateTabs();
      resetWindows();
      // Если выбрано windows1, активируем фасад
      if (windows1.checked) {
        activateFasadTab();
      }
    });

    windows2.addEventListener("change", function () {
      updateTabs();
      setDefaultValues();
    });

    windows3.addEventListener("change", function () {
      updateTabs();
      setDefaultValues();
    });

    // Обработчики для вкладок
    btnFasad.addEventListener("click", activateFasadTab);
    btnBalk.addEventListener("click", activateBalkTab);
    btnWindows.addEventListener("click", activateWindowsTab);

    // Первоначальная настройка
    updateTabs();
    setDefaultValues();
    facadeWhite.classList.add("active");
    updateFacade();
    activateFasadTab();
  }

  // Запуск
  init();
});

document.addEventListener("DOMContentLoaded", function () {
  // Функция для формирования ссылки WhatsApp
  function generateWhatsAppLink() {
    const phone = "79145445585";

    // Получаем все видимые изображения в блоке #colors-params
    const visibleImages = document.querySelectorAll(
      "#colors-params img:not(.hidden)",
    );

    // Собираем alt тексты видимых изображений
    const params = Array.from(visibleImages).map((img) => img.alt.trim());

    // Формируем текст сообщения
    let messageText = "Расцветка дома на МКЦ-08:\n\n";
    params.forEach((param) => {
      messageText += `- ${param}\n`;
    });

    // Кодируем текст для URL
    const encodedText = encodeURIComponent(messageText);

    // Формируем итоговую ссылку
    return `https://wa.me/${phone}?text=${encodedText}`;
  }

  // Функция для обновления кнопки/ссылки WhatsApp
  function updateWhatsAppButton() {
    const whatsappBtn = document.getElementById("wa-check-colors"); // Предполагаем, что есть кнопка с этим ID
    if (whatsappBtn) {
      whatsappBtn.href = generateWhatsAppLink();
    }

    // Для теста можно вывести ссылку в консоль
    console.log("WhatsApp ссылка:", generateWhatsAppLink());
  }

  // Наблюдаем за изменениями в блоке #colors-params
  const observer = new MutationObserver(updateWhatsAppButton);
  const colorsParams = document.getElementById("colors-params");

  if (colorsParams) {
    observer.observe(colorsParams, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["class"],
    });
  }

  // Инициализация при загрузке
  updateWhatsAppButton();
});

const EXTRA_PRICE = 100000;

const originalPrices = new WeakMap();

function parsePrice(text) {
  return parseInt(text.replace(/\D/g, ""), 10);
}

function formatPrice(value) {
  return `+${value.toLocaleString("ru-RU")} ₽`;
}

function shouldAffectBlock(block) {
  const input = block.querySelector("input");
  if (!input) return false;

  // чекбоксы
  if (["snow-holders", "water-sliv-system"].includes(input.name)) {
    return true;
  }

  // ТОЛЬКО клик-фальц
  if (
    input.name === "roof" &&
    input.dataset.title &&
    input.dataset.title.toLowerCase().includes("клик")
  ) {
    return true;
  }

  return false;
}

function applyVisualPrices() {
  if (!isGableRoof) return;

  document.querySelectorAll(".block-choice").forEach((block) => {
    if (!shouldAffectBlock(block)) return;

    const priceEl = block.querySelector(".price-value");
    if (!priceEl) return;

    if (!originalPrices.has(block)) {
      originalPrices.set(block, parsePrice(priceEl.textContent));
    }

    const base = originalPrices.get(block);
    priceEl.textContent = formatPrice(base + EXTRA_PRICE);
  });
}

function restoreVisualPrices() {
  document.querySelectorAll(".block-choice").forEach((block) => {
    if (!originalPrices.has(block)) return;

    const priceEl = block.querySelector(".price-value");
    if (!priceEl) return;

    priceEl.textContent = formatPrice(originalPrices.get(block));
  });
}

// === КНОПКИ КРОВЛИ ===
document.querySelectorAll(".roof-switch__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".roof-switch__btn")
      .forEach((b) => b.classList.remove("is-active"));

    btn.classList.add("is-active");

    isGableRoof = btn.dataset.roof === "gable";

    if (isGableRoof) {
      applyVisualPrices();
    } else {
      restoreVisualPrices();
    }
  });
});

// === ЛЮБОЙ change (чекбоксы, радио) ===
document.addEventListener("change", (e) => {
  if (!isGableRoof) return;

  const block = e.target.closest(".block-choice");
  if (!block) return;

  // калькулятор мог перезаписать цену → мы возвращаем апскейл
  setTimeout(applyVisualPrices, 0);
});
// === MUTATION OBSERVER — фикс клика по уже выбранной галочке ===

const baseDefault = document.getElementById("default");
const baseGable = document.getElementById("default-gable");

// Начальное состояние: вальмовая крыша (не gable)
let isGableRoof = false;

function updateBaseHouse() {
  if (!baseDefault || !baseGable) return;

  if (isGableRoof) {
    baseDefault.classList.add("hidden");
    baseGable.classList.remove("hidden");
  } else {
    baseDefault.classList.remove("hidden");
    baseGable.classList.add("hidden");
  }
}

const houseImages = document.querySelectorAll(
  ".section-calculator-block__house img",
);
document.querySelectorAll(".roof-switch__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    isGableRoof = btn.dataset.roof === "gable";
    updateBaseHouse();

    if (isGableRoof) {
      for (let i = 0; i < houseImages.length; i++) {
        const img = houseImages[i];
        const src = img.src;
        if (/-gable\.(png|jpe?g)$/i.test(src)) continue;
        img.src = src.replace(/\.(png|jpe?g)$/i, "-gable.$1");
      }
    } else {
      document.getElementById("fasad-planken").disabled = false;
      for (let i = 0; i < houseImages.length; i++) {
        const img = houseImages[i];
        const src = img.src;
        img.src = src.replace(/-gable(?=\.(png|jpe?g)$)/i, "");
      }
    }
  });
});

// Инициализация при загрузке страницы
updateBaseHouse();

// Дополнительно можно сразу отметить кнопку активной для вальмовой
const initialBtn = document.querySelector('.roof-switch__btn[data-roof="hip"]');
if (initialBtn) initialBtn.classList.add("is-active");


let btn__fasad = document.getElementById("btn__fasad");
let btn__balk = document.getElementById("btn__balk");
let btn__windows = document.getElementById("btn__windows");

let section__fasad = document.getElementById("section__fasad");
let section__balk = document.getElementById("section__balk");
let section__windows = document.getElementById("section__windows");

let tab = 1;

btn__fasad.addEventListener("click", toggleFasad);
btn__balk.addEventListener("click", toggleBalk);
btn__windows.addEventListener("click", toggleWindows);

function toggleFasad() {
  section__fasad.classList.remove("hidden");
  section__balk.classList.add("hidden");
  section__windows.classList.add("hidden");

  btn__fasad.classList.add("active");
  btn__balk.classList.remove("active");
  btn__windows.classList.remove("active");

  tab = 1;
}

function toggleBalk() {
  section__fasad.classList.add("hidden");
  section__balk.classList.remove("hidden");
  section__windows.classList.add("hidden");

  btn__fasad.classList.remove("active");
  btn__balk.classList.add("active");
  btn__windows.classList.remove("active");

  tab = 2;
}

function toggleWindows() {
  section__fasad.classList.add("hidden");
  section__balk.classList.add("hidden");
  section__windows.classList.remove("hidden");

  btn__fasad.classList.remove("active");
  btn__balk.classList.remove("active");
  btn__windows.classList.add("active");

  tab = 3;
}
