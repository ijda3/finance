const express = require("express");
const path = require("path");

const app = express();
const VIEWS_PATH = __dirname + "/views";
const PRODUCTION = process.env.NODE_ENV === "production";

app.set("view engine", "ejs");
app.set("views", VIEWS_PATH);
app.disable("view cache");

app.use(express.static(path.join(__dirname, "./static")));

const CATEGORIES = require("./data/categories.json");

app.use((req, res, next) => {
  res.locals.current_url = req.originalUrl.split("?")[0];
  res.locals.query = req.query;
  res.locals.categories = CATEGORIES;
  next();
});

app.get("/", function (req, res) {
  res.redirect("/accounts/itau");
});

app.get("/accounts/new", function (req, res) {
  res.render("accounts/new");
});

app.get("/accounts/:account", function (req, res) {
  const { category } = req.query;
  const { account } = req.params;
  const dados = { ...require(`./data/accounts/${account}.json`) };

  dados.transacoes = dados.transacoes.filter(
    (item) => !category || item.tags.includes(category)
  );

  res.render("accounts/index", {
    dados: dados,
  });
});

app.get("/:page", function (req, res) {
  const { page } = req.params;
  const CREDIT_CARD_PAGES = [
    "credit-card",
    "new-creditcard",
    "new-transaction-creditcard",
  ];

  res.render(page, {
    credit_card_page: CREDIT_CARD_PAGES.includes(page),
    chart_page: page == "charts",
    menu_conta: page != "charts" && !CREDIT_CARD_PAGES.includes(page),
    menu_credit_card: CREDIT_CARD_PAGES.includes(page),
    menu_charts: page == "charts",
  });
});

// /accounts/:account?category=receitas
// /credit-cards/:credit_card
//

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
