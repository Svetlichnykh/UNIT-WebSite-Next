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
