const User = require("../models/user");
const Job = require("../models/job");

module.exports.profile = async function (req, res) {

  let jobs = await Job.find({})
                    .populate('user');

  let user = await User.findById(req.params.id);

  return res.render("user_profile", {
    title: "Profile",
    profile_user: user,
    jobs: jobs
  });

};

module.exports.applyJob = function (req, res) {
  return res.render("apply_job", {
    title: "Apply a Job"
  });
};

module.exports.support = function (req, res) {
  return res.render("support", {
    title: "Expert Support"
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      if (err) {
        console.log("Error in updating user profile");
        return res.redirect("back");
      }

      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorised");
  }
};

module.exports.createSession = function (req, res) {

  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};

module.exports.postJob = function (req, res) {
  return res.render("post_job", {
    title: "Post a Job",
  });
};

module.exports.createJob = function (req, res) {

  req.body["user"] = req.user._id; 
  Job.create(req.body);
  return res.redirect("back");
};

module.exports.searchJob = async function (req, res) {
  try
    {      
        let jobs = await Job.find({$or:[{coreskill: req.body.keyskill},{location:req.body.location}, {pincode:req.body.picode}]})
                    .populate('user');

        return res.render('home', {
            title : 'WorkForce | Search',
            jobs : jobs,
        });   
    }
    catch(err)
    {
        console.log('There is an error ', err);
        return;
    }
};
