const Module = require("../models/module");

exports.index = function(req, res) {
  Module.find({}, function(err, modules) {
    res.render("api/modules/index", { modules });
  });
};

exports.createModule = (req, res) => {
  const { name, description } = req.body;
  let errors = [];

  //  Check name field
  if (!name) {
    errors.push({ msg: "Please enter a Module Name" });
  }

  // Check Project Length
  if (name.length < 3) {
    errors.push({ msg: "The Name should be at least 3 characters long" });
  }

  if (errors.length > 0) {
    Module.find({}, function(err, modules) {
      res.render("api/modules/index", {
        errors,
        name,
        description,
        modules
      });
    });
  } else {
    // Validation passed
    Module.findOne({ name: name }).then(module => {
      if (module) {
        errors.push({ msg: "Module already registered" });
        res.render("api/modules/index", {
          errors,
          name,
          description
        });
      } else {
        const newModule = new Module({
          name,
          description
        });
        newModule
          .save()
          .then(() => {
            req.flash("success_msg", "Module successfully registered");
            res.redirect("/api/modules");
          })
          .catch(err => console.log(err));
      }
    });
  }
};

exports.details = function(req, res) {
  console.log(req);
  Module.find({}, function(err, modules) {
    let moduleName = req.params.name;
    let module = modules.find(function(module) {
      return module.name == moduleName;
    });
    console.log(module);
    res.render("api/modules/details/index", { module });
  });
};

exports.edit = function(req, res) {
  Module.find({}, function(err, modules) {
    let moduleName = req.params.name;
    let module = modules.find(function(module) {
      return module.name == moduleName;
    });
    res.render("api/modules/edit/index", { module });
  });
};

exports.update = function(req, res) {
  Module.find({ name: req.params.name }, function(err, modules) {
    const { name, description } = req.body;
    const errors = [];

    const module = modules.find(function(module) {
      return module.name == req.params.name;
    });

    //  Check name field
    if (!name) {
      errors.push({ msg: "Please enter a Module Name" });
    }

    // Check Project Length
    if (name.length < 3) {
      errors.push({ msg: "The Name should be at least 3 characters long" });
    }
    if (errors.length > 0) {
      res.render("api/module/edit/index", {
        errors,
        name,
        description,
        module
      });
    } else {
      Module.findOne({ name: name }).then(() => {
        const updatedModule = {
          name,
          description
        };
        Module.update({ name: req.params.name }, updatedModule)
          .then(() => {
            req.flash("success_msg", "Module successfully updated");
            res.redirect("/api/modules");
          })
          .catch(err => console.log(err));
      });
    }
  });
};

exports.delete = function(req, res) {
  Module.find({}, function(err, modules) {
    let moduleName = req.params.name;
    let module = modules.find(function(module) {
      return module.name == moduleName;
    });

    res.render("api/modules/delete/index", { module });
  });
};

exports.deletePost = function(req, res) {
  Module.deleteOne({ name: req.params.name })
    .then(() => {
      req.flash("success_msg", "Module successfully deleted");
      res.redirect("/api/modules");
    })
    .catch(err => console.log(err));
};
