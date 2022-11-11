const express = require("express");
const cors = require("cors");
const app = express();
const tool_user = require("./tools/user.js");
const tool_planning = require("./tools/planning.js");
const fs = require("fs");

app.use(express.json(), cors());

/**
 * Middleware permettant de vérifier si le token est présent dans la requête
 */
function checkToken(req, res, next) {
  let found = false;
  if (req.headers.authorization) {
    let users = JSON.parse(
      fs.readFileSync(__dirname + "/data/" + "data.json", "utf8")
    );
    for (var i = 0; i < users.length; i++) {
      if (users[i].token == req.headers.authorization.substring(7)) {
        found = true;
        next();
      }
    }
  }

  if (!found) {
    res.sendStatus(401);
  }
}

/**
 * Méthode de connexion
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Authentication
 */
app.post("/login", function (req, res) {
  tool_user.login(req, res);
  res.end();
});

/**
 * Méthode d'enregistrement
 * @api {post} /register Register
 * @apiName Register
 * @apiGroup Authentication
 */
app.post("/register", function (req, res) {
  tool_user.register(req, res);
  res.end();
});

/**
 * Méthode de récupération des données de l'utilisateur
 * @api {get} /user Get user
 * @apiName User
 * @apiGroup User
 * @apiHeader {String} Authorization Token de session
 */
app.get("/user", checkToken, function (req, res) {
  tool_user.get_user(req, res);
  res.end();
});

/**
 * Méthode retournant les rendez-vous du mois donné
 * @api {get} /planning/:month/:year Get planning
 * @apiName Planning
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.get("/month_planning/:month/:year", checkToken, function (req, res) {
  tool_planning.month_view(req, res);
  res.end();
});

/**
 * Méthode retournant les rendez-vous de la semaine donnée
 * @api {get} /week_planning/:first_day_week Get planning
 * @apiName Planning
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.get("/week_planning/:first_day_week", checkToken, function (req, res) {
  tool_planning.week_view(req, res);
  res.end();
});

/**
 * Méthode retournant les rendez-vous du jour donné
 * @api {get} /day_planning/:day Get planning
 * @apiName Planning
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.get("/day_planning/:day", checkToken, function (req, res) {
  tool_planning.day_view(req, res);
  res.end();
});

/**
 * Méthode permettant d'ajouter un événement au planning
 * @api {post} /add_appointment Add event
 * @apiName Add appointment
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.post("/add_appointment", checkToken, function (req, res) {
  tool_planning.add_appointment(req, res);
  res.end();
});

/**
 * Méthode permettant de modifier un événement du planning
 * @api {post} /edit_appointment Edit event
 * @apiName Edit appointment
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.post("/edit_appointment", checkToken, function (req, res) {
  tool_planning.edit_appointment(req, res);
  res.end();
});

/**
 * Listener sur le port 5000
 */
app.listen(8000, () => {
  console.log("Serveur à l'écoute");
});
