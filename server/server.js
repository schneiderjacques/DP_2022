const express = require('express');
const cors = require('cors')
const app = express();
const tool_user = require('./tools/user.js');
const fs = require("fs");


app.use(express.json(), cors());

/**
 * Middleware permettant de vérifier si le token est présent dans la requête
 */
function checkToken(req, res, next) {
	let found = false;
	if (req.headers.authorization) {
		let users = JSON.parse(fs.readFileSync(__dirname + "/data/" + "data.json", 'utf8'));
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
app.post('/login', function (req, res) {
	tool_user.login(req, res)
	res.end()
});

/**
 * Méthode d'enregistrement
 * @api {post} /register Register
 * @apiName Register
 * @apiGroup Authentication
 */
app.post('/register', function (req, res) {
	tool_user.register(req, res);
	res.end()
});

/**
 * Méthode de récupération des données de l'utilisateur
 * @api {get} /user Get user
 * @apiName User
 * @apiGroup User
 * @apiHeader {String} Authorization Token de session
 */
app.get('/user', checkToken, function (req, res) {
	tool_user.get_user(req, res);
	res.end();
});

/**
 * Listener sur le port 8080
 */
app.listen(8080, () => {
	console.log("Serveur à l'écoute");
});