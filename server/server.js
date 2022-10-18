const fs = require('fs/promises');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const { v4: uuidv } = require('uuid');

const app = express();

/**
 * Définition d'une route GET pour le path '/'
 */
app.get('/', (req, res) => {
	res.send('Hello World!');
});

/**
 * Listener sur le port 8080
 */
app.listen(8080, () => {
	console.log("Serveur à l'écoute");
});