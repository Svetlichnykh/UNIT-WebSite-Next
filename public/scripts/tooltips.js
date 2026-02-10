document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.getElementById("tooltip"); // Контейнер для подсказки
  const areas = document.querySelectorAll("*[data-tooltip]"); // Все элементы с подсказками

  areas.forEach((area) => {
    area.addEventListener("mouseenter", (e) => {
      let tooltipText = area.getAttribute("data-tooltip"); // Получаем текст подсказки
      if (tooltipText.includes("\\n")) {
        tooltipText = tooltipText.replace(/\\n/g, "<div></div>");
      }
      tooltip.innerHTML = tooltipText; // Устанавливаем текст в подсказку

      // Показываем подсказку
      tooltip.style.opacity = "1";
      tooltip.style.visibility = "visible";
    });

    area.addEventListener("mousemove", (e) => {
      // Позиционируем подсказку рядом с курсором
      tooltip.style.left = `${e.clientX + 15}px`; // +10px отступ от курсора
      tooltip.style.top = `${e.clientY + 20}px`;
    });

    area.addEventListener("mouseleave", () => {
      // Скрываем подсказку
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
    });
  });
});
