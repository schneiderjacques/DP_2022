var fs = require("fs");

/**
 * Méthode permettant à l'utilisateur de se connecter
 * @param req
 *  Requête
 * @param res
 *  Réponse
 */
function login(req, res) {
    // Vérifier si le username et le password sont présents dans la requête
    if (!req.body.username || !req.body.password) {
        res.sendStatus(422);
        return;
    }

    // Récupérer les données du site
    let users = JSON.parse(fs.readFileSync(__dirname + "./../data/" + "data.json", 'utf8'));

    // Vérifier si le username et le password sont présents dans la base de données
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === req.body.username && users[i].password === req.body.password) {
            // Génération d'un token de session
            users[i].token = Math.floor(Date.now() / 1000) + (60 * 60);
            res.status(200).send(users[i]);
            return;
        }
    }

    // Si le username et le password ne sont pas présents dans la base de données
    res.sendStatus(401);
}

/**
 * Méthode permettant à l'utilisateur de s'enregistrer
 * @param req
 *  Requête
 * @param res
 *  Réponse
 */
function register(req, res) {
    // Vérifier si le username, le password et le password_confirmation sont présents dans la requête
    if (!req.body.username || !req.body.password || !req.body.confirm_password) {
        res.sendStatus(422);
        return;
    }

    // Vérifier si le password et le password_confirmation sont identiques
    if (req.body.password !== req.body.confirm_password) {
        res.sendStatus(422);
        return;
    }

    // Récupérer les données du site
    let users = JSON.parse(fs.readFileSync(__dirname + "./../data/" + "data.json", 'utf8'));

    // Vérifier si le username est déjà présent dans la base de données
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === req.body.username) {
            res.sendStatus(409);
            return;
        }
    }

    // Ajouter l'utilisateur dans la base de données
    users.push({
        id: users.length + 1,
        username: req.body.username,
        password: req.body.password,
        // Génération d'un token de session
        token: Math.floor(Date.now() / 1000) + (60 * 60),
        rdvs: []
    });

    // Enregistrer les données du site
    fs.writeFileSync(__dirname + "./../data/" + "data.json", JSON.stringify(users));

    // On retourne le dernier utilisateur ajouté
    res.status(200).send(users[users.length-1]);
}

module.exports = {
    login: login,
    register: register
}