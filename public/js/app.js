// Client-Side Code

const buttons = document.getElementsByClassName("addDayBtn");

const myFunction = function(e) {
  const date = this.getAttribute("data-day");

  fetch("/dical", {
    method: "POST",
    body: JSON.stringify({ date: date }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      if (response.ok) {
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function(error) {
      console.log(error);
    });
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", myFunction, false);
}
