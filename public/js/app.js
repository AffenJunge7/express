// Client-Side Code
//

//  Add Day
const addDayBtn = document.getElementsByClassName("addDayBtn");

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

for (var i = 0; i < addDayBtn.length; i++) {
  addDayBtn[i].addEventListener("click", addDay, false);
}

// Add Module to Day
const addModuleBtn = document.getElementsByClassName("addModuleBtn");

const addModule = e => {
  console.log("Add Module Button Works!");
};

for (var i = 0; i < addModuleBtn.length; i++) {
  addModuleBtn[i].addEventListener("click", addModule, false);
}
