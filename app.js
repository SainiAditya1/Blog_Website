//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts = [];
// use let in place of var to declare a posts bcz it is a safer version
// declare posts array globelly
// creating a home routes (root route) which rdirect to home
// always remember what you want to render must be in the views folder
app.get("/",function(req,res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
  // console.log(posts); pass this log to home.ejs
});

app.get("/about",function(req,res){
  res.render("about", {aboutContent: aboutContent});
  // first aboutContent is a variable from about.ejs
});
app.get("/contact",function(req,res){
  res.render("contact", {aboutcontact: contactContent});
});
app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){
  // console.log(req.body.postTitle);
  const post = {
    title: req.body.postTitle,
    content:req.body.postBody
  };
  // use the name of the variable input here to post it
  // push is use to add the items in array dynamically
  posts.push(post);
  res.redirect("/");
  // redirect is use to redirect to another route
});
// app.post("/compose", function(req,res){
//   console.log(req.body.postBody);
//   // use the name of the variable input here to post it
// });

app.get("/posts/:postname", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postname);

posts.forEach(function(post){

  const storedTitle = _.lowerCase(post.title);

  if(storedTitle === requestedTitle) {
    // console.log("Match Found!");
    res.render("post", {
      title:post.title,
      content:post.content
    });
  }
  // } else {
  //   console.log("Not a match");
  // }
});
  // console.log(req.params.postname);
});
// rs is used to restart the nodemon server












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
