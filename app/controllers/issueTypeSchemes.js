const IssueTypeScheme = require("../models/IssueTypeScheme");

exports.index = function(req, res) {
  const urlQueryParameter = req.query.issuetype || null;
  IssueTypeScheme.find({}, function(err, issueTypeSchemes) {
    res.render("admin/IssueTypeSchemes/index", {
      issueTypeSchemes,
      urlQueryParameter
    });
  });
};

exports.create = (req, res) => {
  const { name, description } = req.body;
  let errors = [];

  //  Check name field
  if (!name) {
    errors.push({ msg: "Please enter a Issue Type Scheme Name" });
  }

  // Check Project Length
  if (name.length < 3) {
    errors.push({ msg: "The Name should be at least 3 characters long" });
  }

  if (errors.length > 0) {
    IssueTypeScheme.find({}, function(err, issueTypeSchemes) {
      res.render("admin/issueTypeSchemes/index", {
        errors,
        name,
        description,
        issueTypeSchemes
      });
    });
  } else {
    // Validation passed
    IssueTypeScheme.findOne({ name: name }).then(issueTypeSchemes => {
      if (issueTypeSchemes) {
        errors.push({ msg: "Issue Type Scheme already registered" });
        res.render("admin/issueTypeSchemes/index", {
          errors,
          name,
          description
        });
      } else {
        const newIssueTypeScheme = new IssueTypeScheme({
          name,
          description
        });
        newIssueTypeScheme
          .save()
          .then(() => {
            req.flash(
              "success_msg",
              "Issue Type Scheme successfully registered"
            );
            res.redirect("/admin/issueTypeSchemes");
          })
          .catch(err => console.log(err));
      }
    });
  }
};

exports.details = function(req, res) {
  IssueTypeScheme.find({}, function(err, issueTypeSchemes) {
    let issueTypeSchemeName = req.params.name;
    let issueTypeScheme = issueTypeSchemes.find(function(issueTypeScheme) {
      return issueTypeScheme.name == issueTypeSchemeName;
    });
    res.render("admin/issueTypeSchemes/details/index", { issueTypeScheme });
  });
};

exports.edit = function(req, res) {
  IssueTypeScheme.find({}, function(err, issueTypeSchemes) {
    let issueTypeSchemeName = req.params.name;
    let issueTypeScheme = issueTypeSchemes.find(function(issueTypeScheme) {
      return issueTypeScheme.name == issueTypeSchemeName;
    });
    res.render("admin/issueTypeSchemes/edit/index", { issueTypeScheme });
  });
};

exports.update = function(req, res) {
  IssueTypeScheme.find({ name: req.params.name }, function(
    err,
    issueTypeSchemes
  ) {
    const { name, description } = req.body;
    const errors = [];

    const issueTypeScheme = issueTypeSchemes.find(function(issueTypeScheme) {
      return issueTypeScheme.name == req.params.name;
    });

    //  Check name field
    if (!name) {
      errors.push({ msg: "Please enter a Issue Type Scheme Name" });
    }

    // Check Project Length
    if (name.length < 3) {
      errors.push({ msg: "The Name should be at least 3 characters long" });
    }
    if (errors.length > 0) {
      res.render("admin/issueTypeSchemes/edit/index", {
        errors,
        name,
        description,
        issueTypeScheme
      });
    } else {
      IssueTypeScheme.findOne({ name: name }).then(() => {
        const updatedIssueTypeScheme = {
          name,
          description
        };
        IssueTypeScheme.update(
          { name: req.params.name },
          updatedIssueTypeScheme
        )
          .then(() => {
            req.flash("success_msg", "Issue Type Scheme successfully updated");
            res.redirect("/admin/issueTypeSchemes");
          })
          .catch(err => console.log(err));
      });
    }
  });
};

exports.addField = function(req, res) {
  IssueTypeScheme.find({ name: req.params.name }, function(
    err,
    issueTypeSchemes
  ) {
    const addFieldInputs = JSON.parse(JSON.stringify(req.body));
    const { fieldname, fieldtype } = addFieldInputs;
    const errors = [];
    const issueTypeScheme = issueTypeSchemes.find(function(issueTypeScheme) {
      return issueTypeScheme.name == req.params.name;
    });

    if (!fieldname) {
      errors.push({ msg: "Please enter a Field Name" });
    }
    if (fieldname.length < 3) {
      errors.push({ msg: "The Name should be at least 3 characters long" });
    }
    if (!fieldtype) {
      errors.push({ msg: "Please select a Field Type" });
    }

    if (errors.length > 0) {
      res.render("admin/issueTypeSchemes/edit/index", {
        errors,
        fieldname,
        fieldtype,
        issueTypeScheme
      });
    } else {
      IssueTypeScheme.findOneAndUpdate(
        { name: req.params.name },
        {
          $push: {
            fields: {
              name: addFieldInputs.fieldname,
              type: addFieldInputs.fieldtype
            }
          }
        },
        {
          $inc: {
            "fields.$.position": 1
          }
        },
        { useFindAndModify: false },
        function(err) {
          if (err) {
            res.json(err);
          } else {
            req.flash("success_msg", "Field added to Issue Type Scheme");
          }
          res.redirect(`/admin/issueTypeSchemes/${req.params.name}/edit`);
        }
      );
    }
  });
};

exports.delete = function(req, res) {
  IssueTypeScheme.find({}, function(err, issueTypeSchemes) {
    let issueTypeSchemeName = req.params.name;
    let issueTypeScheme = issueTypeSchemes.find(function(issueTypeScheme) {
      return issueTypeScheme.name == issueTypeSchemeName;
    });

    res.render("admin/issueTypeSchemes/delete/index", { issueTypeScheme });
  });
};

exports.deletePost = function(req, res) {
  IssueTypeScheme.deleteOne({ name: req.params.name })
    .then(() => {
      req.flash("success_msg", "Issue Type Scheme successfully deleted");
      res.redirect("/admin/issueTypeSchemes");
    })
    .catch(err => console.log(err));
};
