"use strict";

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
const carousel = document.querySelector(".results__slider");
const firstSlide = carousel.querySelector(".results__slide");
const sliderButtons = document.querySelectorAll(".results__button");
let firstSlideWidth = firstSlide.clientWidth + 32.5;

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    carousel.scrollLeft +=
      button.id == "resultsLeft" ? -firstSlideWidth : firstSlideWidth;
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
// Открытие попапа формы
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".popup_form").style.display = "block";
  });
});

// Форма
const form = document.querySelector(".modal-form");

form.onsubmit = (event) => {
  const formData = new FormData(form);
  const inputs = document.querySelectorAll(".modal-form__input");
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
    })
    .catch((error) => console.log(error));

  return false;
};

// Бургер
const burgerMenu = document.querySelector(".burger-menu");
document
  .querySelector(".header__burger-button")
  .addEventListener("click", () => {
    burgerMenu.style.display = "block";
  });

document
  .querySelector(".burger-menu__close-button")
  .addEventListener("click", () => {
    burgerMenu.style.display = "none";
  });

// Cлушатель запрос к json при загрузке DOM
document.addEventListener("DOMContentLoaded", fetchData());
