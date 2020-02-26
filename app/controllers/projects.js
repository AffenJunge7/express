const Project = require("../models/project");

exports.index = function(req, res) {
  Project.find({}, function(err, projects) {
    res.render("api/projects/index", { projects });
  });
};

exports.createProject = (req, res) => {
  const { name, description } = req.body;
  let errors = [];

  //  Check name field
  if (!name) {
    errors.push({ msg: "Please enter a Project Name" });
  }

  // Check Project Length
  if (name.length < 3) {
    errors.push({ msg: "The Name should be at least 3 characters long" });
  }

  if (errors.length > 0) {
    Project.find({}, function(err, projects) {
      res.render("api/projects/index", {
        errors,
        name,
        description,
        projects
      });
    });
  } else {
    // Validation passed
    Project.findOne({ name: name }).then(project => {
      if (project) {
        errors.push({ msg: "Project already registered" });
        res.render("api/projects/index", {
          errors,
          name,
          description
        });
      } else {
        let key = name.replace(/ /g, "");
        const newProject = new Project({
          name,
          description,
          key
        });
        newProject
          .save()
          .then(() => {
            req.flash("success_msg", "Project successfully registered");
            res.redirect("/api/projects");
          })
          .catch(err => console.log(err));
      }
    });
  }
};

exports.details = function(req, res) {
  Project.find({}, function(err, projects) {
    let projectKey = req.params.key;
    let project = projects.find(function(project) {
      return project.key == projectKey;
    });
    res.render("api/projects/details/index", { project });
  });
};

exports.edit = function(req, res) {
  // let projectKey = req.params.key;
  Project.find({}, function(err, projects) {
    let projectKey = req.params.key;
    let project = projects.find(function(project) {
      return project.key == projectKey;
    });
    res.render("api/projects/edit/index", { project });
  });
};

exports.editPost = function(req, res) {
  Project.find({ key: req.params.key }, function(err, projects) {
    const { name, description } = req.body;
    const errors = [];

    const project = projects.find(function(project) {
      return project.key == req.params.key;
    });

    //  Check name field
    if (!name) {
      errors.push({ msg: "Please enter a Project Name" });
    }

    // Check Project Length
    if (name.length < 3) {
      errors.push({ msg: "The Name should be at least 3 characters long" });
    }
    if (errors.length > 0) {
      res.render("api/projects/edit/index", {
        errors,
        name,
        description,
        project
      });
    } else {
      Project.findOne({ name: name }).then(() => {
        const updatedProject = {
          name,
          description
        };
        Project.update({ key: req.params.key }, updatedProject)
          .then(() => {
            req.flash("success_msg", "Project successfully updated");
            res.redirect("/api/projects");
          })
          .catch(err => console.log(err));
      });
    }
  });

  // console.log(name, description);
  // Project.find({ key: key }, function(err, project) {
  //   // res.render("api/projects/edit/index", { project });
  // });
};

exports.delete = function(req, res) {
  Project.find({}, function(err, projects) {
    let projectKey = req.params.key;
    let project = projects.find(function(project) {
      return project.key == projectKey;
    });

    res.render("api/projects/delete/index", { project });
  });
};

exports.deletePost = function(req, res) {
  Project.deleteOne({ key: req.params.key })
    .then(() => {
      req.flash("success_msg", "Project successfully deleted");
      res.redirect("/api/projects");
    })
    .catch(err => console.log(err));
};
