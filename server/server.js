const express = require('express');
const app = express();
const tool_user = require('./tools/user.js');

app.use(express.json());

/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Authentication
 */
app.post('/login', function (req, res) {
	if (!req.body.username || !req.body.password) {
		res.sendStatus(422);
		return;
	}

	res.sendStatus(tool_user.check_login(req.body) ? 200 : 401);
	res.end()
});

/**
 * Listener sur le port 8080
 */
app.listen(8080, () => {
	console.log("Serveur à l'écoute");
});