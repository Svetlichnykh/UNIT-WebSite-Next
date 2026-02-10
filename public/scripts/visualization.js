document.addEventListener("DOMContentLoaded", function () {
  const areas = document.querySelectorAll(
    ".visualization-scheme__wrapper .area",
  ); // Все области на плане
  const sliders = document.querySelectorAll(".visualization-slider"); // Все слайдеры

  // Скрыть все слайдеры
  function hideAllSliders() {
    sliders.forEach((slider) => {
      slider.style.display = "none";
    });
  }

  // Показать слайдер по индексу
  function showSlider(index) {
    hideAllSliders(); // Сначала скрываем все слайдеры
    sliders[index].style.display = "block"; // Показываем нужный слайдер
  }

  // Добавляем обработчики событий на области
  areas.forEach((area, index) => {
    area.addEventListener("click", function () {
      showSlider(index); // Показываем слайдер, соответствующий кликнутой области
    });
  });

  // Изначально скрываем все слайдеры, кроме первого
  hideAllSliders();
  showSlider(4); // Показываем первый слайдер по умолчанию
});
