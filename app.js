const express = require("express");
const bodyparser = require("body-parser");

const port = 3000;
let items = ["Buy food", "Make dinner", "Invide in Laws"];
let workItems = ["Check emails", "Drink Cofee", "Follow up emails", "Check Mail Box"];

const app = express();

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {

  let today = new Date();
  let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-us", option);

  res.render("list", {listTitle: day, newListItems: items});
})

app.post("/", (req, res) => {
  let item = req.body.newListItems;

if (req.body.list === "Work List") {
  workItems.push(item);
  res.redirect("/work");
}else {
  items.push(item);

  res.redirect("/");
}

})

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/about", (req, res) => {
  res.render("about");
})

app.listen(port, () => {

  console.log("server started on port 3000");
})
