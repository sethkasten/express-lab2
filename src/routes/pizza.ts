// require the express module
import express from "express";

// create a new Router object
const pizzaRouter = express.Router();

const toppingArray: string[] = [
  "Pepperoni",
  "Sausage",
  "Chicken",
  "Mushroom",
  "Olive",
  "Green Pepper",
  "Onion",
  "Banana Pepper",
  "Anchovies",
  "Pineapple",
];

pizzaRouter.get("/", (req, res) => {
  res.render("homepage");
});

pizzaRouter.get("/review-confirmation", (req, res) => {
  let name: string = req.query.name as string;
  let comment: string = req.query.comment as string;
  let rating: string = req.query.rating as string;
  res.render("review-confirmation", { name, comment, rating });
});

pizzaRouter.get("/specialty", (req, res) => {
  let name: string = req.query.name as string;
  let price: string = req.query.price as string;
  res.render("specialty", { name, price });
});

pizzaRouter.get("/review", (req, res) => {
  res.render("review");
});

pizzaRouter.get("/build-your-own", (req, res) => {
  res.render("build-your-own", { toppingArray });
});

pizzaRouter.post("/build-your-own-submission", (req, res) => {
  let { size, toppings, gluten, instructions } = req.body;
  let price: number = 0;
  if (size === "Small") {
    price += 7 + toppings * 0.5;
  } else if (size === "Medium") {
    price += 10 + toppings;
  } else if (size === "Large") {
    price += 12 + toppings * 1.25;
  }
  if (gluten === "yes") {
    price += 2;
  }
  if (gluten !== "yes") {
    gluten = "no";
  }
  let shipping: string = "";
  if (price > 15) {
    shipping =
      "Beacuse your order meets the $15.00 minimum, you get FREE DELIVERY!";
  }
  let stringPrice = price.toFixed(2);
  res.render("build-your-own-submission", {
    size,
    toppings,
    gluten,
    instructions,
    stringPrice,
    shipping,
  });
});

export default pizzaRouter;
