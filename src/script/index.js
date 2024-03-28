"use strict";
// Переменные
// Слайдер результаты
const carousel = document.querySelector(".results__slider");
const firstSlide = carousel.querySelector(".results__slide");
const sliderButtons = document.querySelectorAll(".results__button");
let firstSlideWidth = firstSlide.clientWidth + 32.5;
// Формы
const formPopup = document.querySelector(".modal-form");
const formSection = document.querySelector(".form");
// Индикатор длины текста в форме в textarea
const textarea = document.querySelector("#formMessage");
// Бургер
const burgerMenu = document.querySelector(".burger-menu");

// Запрос к данным JSON
const fetchData = () => {
  fetch("src/results.json")
    .then((response) => response.json())
    .then((results) => {
      displayResultsCards(results);
    })
    .catch((err) => {
      console.log(err);
    });

  fetch("src/feedbacks.json")
    .then((response) => response.json())
    .then((feedbacks) => {
      displayFeedbacksCards(feedbacks);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Отрисовка карточек результатов
const displayResultsCards = (results) => {
  const cardTemplate = document.querySelector(".results__slide");

  for (let i = 0; i < results.length; i++) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector(".results__slide-image").src = results[i].src;
    card.querySelector(".results__slide-text_debt").textContent =
      results[i].debt;
    card.querySelector(".results__slide-text_decision").textContent =
      results[i].decision;
    card.querySelector(".results__slide-text_date").textContent =
      results[i].date;
    card.querySelector(".results__slide-text_status").textContent =
      results[i].status;

    document.querySelector(".results__slider").append(card);
  }
  document.querySelector(".results__slider").removeChild(cardTemplate);
};

// Отрисовка карточек отзывов
const displayFeedbacksCards = (feedbacks) => {
  const cardTemplate = document.querySelector(".feedbacks__card");

  for (let i = 0; i < feedbacks.length; i++) {
    const card = cardTemplate.cloneNode(true);

    card.querySelector(".feedbacks__card-subtitle").textContent =
      feedbacks[i].name;
    card.querySelector(".feedbacks__card-text").textContent = feedbacks[i].text;
    card.querySelector(".feedbacks__card-additional-text").textContent =
      feedbacks[i].case;

    document.querySelector(".feedbacks__cards").append(card);
  }
  document.querySelector(".feedbacks__cards").removeChild(cardTemplate);

  // скрываем кнопки слайдера, если отзывов меньше 5
  if (feedbacks.length < 5) {
    document.querySelector(".feedbacks__slider-buttons").style.display = "none";
  }
};

// Слайдер результаты
sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    carousel.scrollLeft +=
      button.id == "resultsLeft" ? -firstSlideWidth : firstSlideWidth;
  });
});

// Открытие попапа формы
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".popup_form").style.display = "block";
  });
});

//Закрытие попапов
document
  .querySelector(".popup__close-button_success")
  .addEventListener("click", () => {
    document.querySelector(".popup_success").style.display = "none";
  });
document.querySelector(".popup__close-button").addEventListener("click", () => {
  document.querySelector(".popup_form").style.display = "none";
});

// Форма с попапа
formPopup.onsubmit = (event) => {
  const inputs = document.querySelectorAll(".modal-form__input");
  const formData = new FormData(formPopup);
  let values = [];

  for (let input of inputs) {
    let validity = input.validity;
    if (validity) values.push(input.value);
  }

  formData.append("name", values[0]);
  formData.append("phone", values[1]);
  formData.append("city", values[2]);

  fetch("http://f0931821.xsph.ru/api/check-form", {
    body: formData,
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === true) {
        document.querySelector(".popup_form").style.display = "none";
        document.querySelector(".popup_success").style.display = "flex";
      }
      if (data.status === false) {
        document.querySelector(".modal-form__error-message").textContent =
          data.message;
      }
    })
    .catch((error) => console.log(error));

  return false;
};

// Форма с главной страницы
formSection.onsubmit = (event) => {
  const inputs = document.querySelectorAll(".form__input");
  const formData = new FormData(formSection);
  let values = [];

  for (let input of inputs) {
    let validity = input.validity;
    if (validity) values.push(input.value);
  }

  formData.append("name", values[0]);
  formData.append("phone", values[1]);
  formData.append("city", "не указано");
  formData.append("question", values[2]);

  fetch("http://f0931821.xsph.ru/api/check-form", {
    body: formData,
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === true) {
        document.querySelector(".popup_form").style.display = "none";
        document.querySelector(".popup_success").style.display = "flex";
      }
      if (data.status === false) {
        document.querySelector(".form__error-message").textContent =
          data.message;
      }
    })
    .catch((error) => console.log(error));

  return false;
};

// Отображаем длину введенного текста в textarea
textarea.addEventListener("keyup", () => {
  console.log("heeeeey");
  document.querySelector(
    ".form__additional-info"
  ).textContent = `${textarea.value.length}/300`;
});

// Бургер открытие
document
  .querySelector(".header__burger-button")
  .addEventListener("click", () => {
    burgerMenu.classList.toggle("burger-menu_active");
  });
// Бургер закрытие
document
  .querySelector(".burger-menu__close-button")
  .addEventListener("click", () => {
    burgerMenu.classList.toggle("burger-menu_active");
  });

// Cлушатель запрос к json при загрузке DOM
document.addEventListener("DOMContentLoaded", fetchData());
document.addEventListener("DOMContentLoaded", () =>
  burgerMenu.classList.replace("burger-menu_hidden", "burger-menu_active")
);

// Скролл наверх при клике на логотип
document.querySelectorAll(".logo").forEach((logo) => {
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
