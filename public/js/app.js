// Client-Side Code
//

//  Add Day
const addDayBtn = document.getElementsByClassName("addDayBtn");

const addDay = function() {
  const date = this.getAttribute("data-day");

  fetch("/dical.:day", {
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

// Open "Add Module Modal"
const addModuleBtn = document.getElementsByClassName("addModuleBtn");

const addModule = function() {
  const date = $(this).data("day");
  $("#addModuleModal").on("show.bs.modal", function() {
    $(this)
      .find(".modal-title span")
      .html(date);
  });
};

for (var i = 0; i < addModuleBtn.length; i++) {
  addModuleBtn[i].addEventListener("click", addModule, false);
}

// Save Module from "Add Module Modal"
const saveButton = document.getElementById("modalSave");

const saveModule = function() {
  const date = $("#addModuleModal")
    .find(".modal-title span")
    .html();
  fetch("/dical/createModule", {
    method: "POST",
    body: JSON.stringify({ name: `Hallo ${date}`, date }),
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

saveButton.addEventListener("click", saveModule, false);
