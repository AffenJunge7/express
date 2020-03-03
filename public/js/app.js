// Client-Side Code

const buttons = document.getElementsByClassName("addDayBtn");

const addDay = function(e) {
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
        location.reload();
      }
      throw new Error("Request failed.");
    })
    .catch(function(error) {
      console.log(error);
    });
};

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", addDay, false);
}
