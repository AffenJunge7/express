// Client-Side Code

//
function renderIssueTypeSchemeFields(name, type) {
  switch (type) {
    case "text":
      return `
            <div class="form-group">
              <label class="control-label" for="${name}">${name}</label>
              <input class="form-control" type="text" name=${name} placeholder="${name}" />
            </div>
             `;
    case "textarea":
      return `
            <div class="form-group">
              <label class="control-label" for="${name}">${name}</label>
              <textarea class="form-control" name=${name} rows="3" placeholder="${name}"></textarea>
            </div>
            `;
    default:
      break;
  }
}

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

// Open "Add Issue"
$("#addModuleModal").on("show.bs.modal", function(e) {
  const date = e.relatedTarget.getAttribute("data-day");
  $(this)
    .find(".modal-title span")
    .html(date);
});
// Get Issue Type Fields when Issue Type changes
$("#addModuleModal").one("shown.bs.modal", function() {
  const fieldArea = $(".modal-body-fields");
  $("#issueType", this).on("change", function(e) {
    fieldArea.html("");
    const issueTypeScheme = e.target.value;
    fetch(`/api/issuetypesscheme/${issueTypeScheme}`, {
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
        const fields = data.issuetypesschemes[0].fields;
        fields.forEach(field => {
          const { name, type } = field;
          fieldArea.append(renderIssueTypeSchemeFields(name, type));
        });
      });
  });
});

// Save Module from "Add Module Modal"
function saveModule() {
  const date = $("#addModuleModal")
    .find(".modal-title span")
    .html();
  const issueType = $("#issueType").val();
  const summary = $("#summary").val();

  const inputFields = [];
  let input = {};
  const fields = $(
    "#addModuleModal .modal-body-fields input,#addModuleModal .modal-body-fields textarea"
  );
  fields.each(function() {
    input = {};
    input.name = $(this).attr("name");
    input.value = $(this).val();
    inputFields.push(input);
  });

  fetch("/api/issue", {
    method: "POST",
    body: JSON.stringify({ date, issueType, summary, inputFields }),
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
$("#issueSaveBtn").one("click", function() {
  saveModule();
});

// Show Issue Details
function showIssueDetails(issueID) {
  $("#issueDetailModal").on("show.bs.modal", function() {
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
        //
        fetch(`/api/issuetypesscheme/${data.issue.issueType}`)
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Request failed.");
            }
          })
          .then(data => {
            const issueTypeFields = data.issuetypesschemes[0].fields;
            //  To work on!!!
            issueTypeFields.forEach((field, index) => {
              // console.log(field);
            });
          })
          .catch(function(error) {
            console.log(error);
          });
        //
        $("#issueDetailModal .modal-title").html(
          `${data.issue.issueType} - Modul`
        );
        const fieldnames = Object.keys(data.issue.fields);
        const fieldvalues = Object.values(data.issue.fields);

        fieldnames.forEach(
          (fieldname, index) => console.log(fieldname)
          //   const { name, type } = field;
          // fieldArea.append(renderIssueTypeSchemeFields(name, type));
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}
$(".issueDetailBtn").on("click", function() {
  const issueID = $(this)
    .parent("div")
    .attr("id");
  showIssueDetails(issueID);
});

// Clear Issue Details
$("#issueDetailModal").on("hide.bs.modal", function() {
  $(
    "#issueDetailModal .modal-body-header, #issueDetailModal .modal-body-fields"
  ).html("");
});
