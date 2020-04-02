const IssueType = require("../models/issueType");
const IssueTypeScheme = require("../models/IssueTypeScheme");

exports.index = async function(req, res) {
  const issueTypeSchemes = await IssueTypeScheme.find()
    .exec()
    .then(res => res);
  const issueTypeSchemesNames = issueTypeSchemes.map(
    issueTypeScheme => issueTypeScheme.name
  );
  IssueType.find({}, function(err, issueTypes) {
    res.render("admin/issueTypes/index", { issueTypes, issueTypeSchemesNames });
  });
};

exports.create = (req, res) => {
  const { name, description } = req.body;
  let errors = [];

  //  Check name field
  if (!name) {
    errors.push({ msg: "Please enter a Issue Type Name" });
  }

  // Check Project Length
  if (name.length < 3) {
    errors.push({ msg: "The Name should be at least 3 characters long" });
  }

  if (errors.length > 0) {
    IssueType.find({}, function(err, issueTypes) {
      res.render("admin/issueTypes/index", {
        errors,
        name,
        description,
        issueTypes
      });
    });
  } else {
    // Validation passed
    IssueType.findOne({ name: name }).then(issueType => {
      if (issueType) {
        errors.push({ msg: "Issue Type already registered" });
        res.render("admin/issueTypes/index", {
          errors,
          name,
          description
        });
      } else {
        const newIssueType = new IssueType({
          name,
          description
        });
        newIssueType
          .save()
          .then(() => {
            req.flash("success_msg", "Issue Type successfully registered");
            res.redirect("/admin/issueTypes");
          })
          .catch(err => console.log(err));
      }
    });
  }
};

exports.details = function(req, res) {
  IssueType.find({}, function(err, issueTypes) {
    let issueTypeName = req.params.name;
    let issueType = issueTypes.find(function(issueType) {
      return issueType.name == issueTypeName;
    });
    // console.log(issueType);
    res.render("admin/issueTypes/details/index", { issueType });
  });
};

exports.edit = function(req, res) {
  IssueType.find({}, function(err, issueTypes) {
    let issueTypeName = req.params.name;
    let issueType = issueTypes.find(function(issueType) {
      return issueType.name == issueTypeName;
    });
    res.render("admin/issueTypes/edit/index", { issueType });
  });
};

exports.update = function(req, res) {
  IssueType.find({ name: req.params.name }, function(err, issueTypes) {
    const { name, description } = req.body;
    const errors = [];

    const issueType = issueTypes.find(function(issueType) {
      return issueType.name == req.params.name;
    });

    //  Check name field
    if (!name) {
      errors.push({ msg: "Please enter a Issue Type Name" });
    }

    // Check Project Length
    if (name.length < 3) {
      errors.push({ msg: "The Name should be at least 3 characters long" });
    }
    if (errors.length > 0) {
      res.render("admin/issueTypes/edit/index", {
        errors,
        name,
        description,
        issueType
      });
    } else {
      IssueType.findOne({ name: name }).then(() => {
        const updatedIssueType = {
          name,
          description
        };
        IssueType.update({ name: req.params.name }, updatedIssueType)
          .then(() => {
            req.flash("success_msg", "Issue Type successfully updated");
            res.redirect("/admin/issueTypes");
          })
          .catch(err => console.log(err));
      });
    }
  });
};

exports.delete = function(req, res) {
  IssueType.find({}, function(err, issueTypes) {
    let issueTypeName = req.params.name;
    let issueType = issueTypes.find(function(issueType) {
      return issueType.name == issueTypeName;
    });

    res.render("admin/issueTypes/delete/index", { issueType });
  });
};

exports.deletePost = function(req, res) {
  IssueType.deleteOne({ name: req.params.name })
    .then(() => {
      req.flash("success_msg", "Issue Type successfully deleted");
      res.redirect("/admin/issueTypes");
    })
    .catch(err => console.log(err));
};
