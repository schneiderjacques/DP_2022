const express = require("express");
const cors = require("cors");
const app = express();
const tool_user = require("./tools/user.js");
const tool_planning = require("./tools/planning.js");
const fs = require("fs");
const { Server } = require('ws');
const sockserver = new Server({ port: 443 });
const connections = new Set();
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
      for (var j = 0; j < users[i].token.length; j++) {
        if (users[i].token[j] == req.headers.authorization.substring(7)) {
          found = true;
          next();
        }
      }
    }
  }

  if (!found) {
    res.sendStatus(401);
  }
}

/**
 * Le client se connecte au serveur
 * @param event
 *  l'évènement
 */
sockserver.on('connection', (ws, req) => {
  ws.idUser = req.headers['sec-websocket-protocol'];
  connections.add(ws);

  /**
   * Le client se déconnecte du serveur
   */
  ws.on('close', () => {
    connections.delete(ws);
  });
});

/**
 * Méthode notifiant les clients connectés avec l'id de l'utilisateur donné dans la requête
 * @param req
 * la requête
 */
function notifyClients(req) {
  connections.forEach((client) => {
    if (client.idUser == tool_user.get_user_id(req)) {
      const data = JSON.stringify({'type': 'message', 'message': 'update'});
      client.send(data);
    }
  })
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
 * Méthode de déconnexion
 * @api {post} /logout Logout
 * @apiName Logout
 * @apiGroup Authentication
 */
app.post("/logout", function (req, res) {
  tool_user.logout(req, res);
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
app.put("/add_appointment", checkToken, function (req, res) {
  tool_planning.add_appointment(req, res);
  notifyClients(req);
  res.end();
});

/**
 * Méthode permettant de modifier un événement du planning
 * @api {post} /edit_appointment Edit event
 * @apiName Edit appointment
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.patch("/edit_appointment/:id", checkToken, function (req, res) {
  tool_planning.edit_appointment(req, res);
  notifyClients(req);
  res.end();
});

/**
 * Méthode permettant de supprimer un événement du planning
 * @api {post} /delete_appointment Delete event
 * @apiName Delete appointment
 * @apiGroup Planning
 * @apiHeader {String} Authorization Token de session
 */
app.delete("/delete_appointment/:id", checkToken, function (req, res) {
  tool_planning.delete_appointment(req, res);
  notifyClients(req);
  res.end();
});

/**
 * Listener sur le port 8000
 */
app.listen(8000, () => {
  console.log("Serveur à l'écoute");
});
