//gets the first form it founds
const weatherForm = document.querySelector("form");
const searchField = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

//e: event
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchField.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://127.0.0.1:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
