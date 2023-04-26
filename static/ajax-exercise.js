'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  // fetch fortune from /fortune
  // .then .then -> data -> querySeletor("").innterHTML = data
  fetch('/fortune')
    .then(response => response.text())
    .then(reponseData =>
      document.querySelector("#fortune-text").innerHTML = reponseData
    )
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  const queryString = new URLSearchParams({ zipcode: zipcode }).toString();
  fetch(`${url}?${queryString}`)
    .then(response => response.json())
    .then(responseData =>
      document.querySelector('#weather-info').innerHTML = responseData.forecast
    );
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // formInputs
  const qty = document.querySelector("#qty-field").value
  const melonType = document.querySelector("#melon-type-field").value
  const formInputs = { qty: qty, melon_type: melonType }

  // POST request with formInputs
  fetch('/order-melons.json', {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(responseJson => {
      document.querySelector("#order-status").innerHTML = responseJson.msg
      document.querySelector("#order-status").classList.remove("order-error")
      // determine the status?
      if (responseJson.code == "ERROR") {
        document.querySelector("#order-status").classList.add("order-error")
      }
    }
    )

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)

}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


// 

function getDogImg(evt) {
  // url -> fetch -> xxx.img
  const url = "https://dog.ceo/api/breeds/image/random"
  fetch(url)
    .then(response => response.json())
    .then(reponseData => {
      const img = reponseData.message
      // find #("#dog-image") -> put img
      const dogImg = document.querySelector("#dog-image-div")
      // console.log(dogImg)
      if (dogImg) {
        document.querySelector("#dog-image").removeChild(dogImg);
      }
      document.querySelector("#dog-image").insertAdjacentHTML(
        "beforeend", `<div id='dog-image-div'><img src='${img}'width="100" height="100"></img></div>`
      );
    }
    )
}

document.querySelector("#get-dog-image").addEventListener('click', getDogImg);