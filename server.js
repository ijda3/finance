import express from "express";
import path from "path";
import livereload from "livereload";
import livereloadMiddleware from "connect-livereload";
import mustacheExpress from "mustache-express";

const app = express();
const __dirname = path.resolve();
const VIEWS_PATH = __dirname + "/views";

app.engine("mst", mustacheExpress(VIEWS_PATH + "/partials", ".mst"));
app.set("view engine", "mst");
app.set("views", VIEWS_PATH);
app.disable("view cache");

const hotServer = livereload.createServer({
  debug: true,
});

hotServer.watch(__dirname);

app.use(livereloadMiddleware());
app.use(express.static(path.join(__dirname, "./static")));

app.get("/", function (req, res) {
  res.render("index", {
    menu_conta: true,
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
