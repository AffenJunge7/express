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

// Open "Add Issue Modal" & Load Fields
const addModule = function() {
  const date = $(this).data("day");
  $("#addModuleModal").on("show.bs.modal", function() {
    $(this)
      .find(".modal-title span")
      .html(date);
  });
};
$(".addModuleBtn").one("click", function() {
  addModule();
});

// Save Module from "Add Module Modal"
function saveModule() {
  const date = $("#addModuleModal")
    .find(".modal-title span")
    .html();
  const issueType = $("#issueType").val();
  const summary = $("#summary").val();

  fetch("/api/issue", {
    method: "POST",
    body: JSON.stringify({ date, issueType, summary }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(function(response) {
      if (response.ok) {
        location.reload();
      } else {
        throw new Error("Request failed.");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}
$("#issueSaveBtn").on("click", function() {
  saveModule();
});

// Show Issue Details
function showIssueDetails(issueID) {
  $("#issueDetailModal").one("show.bs.modal", function() {
    fetch(`/api/issue/${issueID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Request failed.");
        }
      })
      .then(data => {
        console.log(data);
        $("#issueDetailModal .modal-title").html(
          `${data.issue.issueType} - Modul`
        );
        const fieldnames = Object.keys(data.issue.fields);
        const fieldvalues = Object.values(data.issue.fields);

        fieldnames.forEach((fieldname, index) =>
          $("#issueDetailModal .modal-body").append(
            `<li>${fieldname} : ${fieldvalues[index]}</li>`
          )
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}
$(".issueDetailBtn").one("click", function() {
  const issueID = $(this)
    .parent("div")
    .attr("id");
  showIssueDetails(issueID);
});
