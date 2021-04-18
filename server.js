const express = require("express");
const path = require("path");
const app = express();
const mustacheExpress = require("mustache-express");
const port = process.env.PORT || 3000;
const VIEWS_PATH = __dirname + "/views";

app.engine("mst", mustacheExpress(VIEWS_PATH + "/partials", ".mst"));
app.set("view engine", "mst");
app.set("views", VIEWS_PATH);
app.disable("view cache");

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

app.listen(port, () => {
	console.log(`http://localhost:${port}/`);
});
