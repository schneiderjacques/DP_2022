const fs = require("fs");

/**
 * Méthode permettant de récupérer les données du site
 * @returns {any}
 */
function get_datas() {
    // Récupérer les données du site
    return JSON.parse(
        fs.readFileSync(__dirname + "/../data/" + "data.json", "utf8")
    );
}

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
    let users = get_datas();

    // Vérifier si le username et le password sont présents dans la base de données
    for (let i = 0; i < users.length; i++) {
        if (
            users[i].username === req.body.username &&
            users[i].password === req.body.password
        ) {
            // Génération d'un token de session
            users[i].token.push(Math.random().toString(36).substr(2));

            // Enregistrer les données du site
            fs.writeFileSync(__dirname + "/../data/" + "data.json", JSON.stringify(users));

            // On retourne l'utilisateur avec son token
            users[i].token = users[i].token[users[i].token.length - 1];

            res.set({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
            res.send(users[i]);
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
    let users = get_datas();

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
        token: [Math.random().toString(36).substr(2)],
        rdvs: [],
    });

    // Enregistrer les données du site
    fs.writeFileSync(
        __dirname + "/../data/" + "data.json",
        JSON.stringify(users)
    );

    // On retourne le dernier utilisateur ajouté
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.send(users[users.length - 1]);
}

/**
 * Méthode permettant à l'utilisateur de se déconnecter
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function logout(req, res) {
    // Récupérer les données du site
    let users = get_datas();

    // Récupérer l'utilisateur
    for (var i = 0; i < users.length; i++) {
        // Cherche le token dans la liste des tokens de l'utilisateur
        let index = users[i].token.indexOf(req.headers.authorization.substring(7));

        // Si le token est trouvé
        if (index > -1) {
            // On le supprime
            users[i].token.splice(index, 1);
            // On enregistre les données du site
            fs.writeFileSync(__dirname + "/../data/" + "data.json", JSON.stringify(users));
            res.sendStatus(200);
            return;
        }
    }

    res.sendStatus(404);
}

/**
 * Méthode permettant de récupérer les données de l'utilisateur
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function get_user(req, res) {
    // Récupérer les données du site
    let users = get_datas();

    // Récupérer l'utilisateur
    let found = false;
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < users[i].token.length; j++) {
            if (users[i].token[j] == req.headers.authorization.substring(7)) {
                found = true;
                users[i].token = users[i].token[users[i].token.length - 1];
                res.set({
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                });
                res.send(users[i]);
                return;
            }
        }
    }

    if (!found) {
        res.sendStatus(404);
    }
}

function get_user_id(req) {
    // Récupérer les données du site
    let users = get_datas();

    // Récupérer l'utilisateur
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < users[i].token.length; j++) {
            if (users[i].token[j] == req.headers.authorization.substring(7)) {
                return users[i].id
            }
        }
    }

    return null;
}

module.exports = {
    login: login,
    register: register,
    get_user: get_user,
    get_datas: get_datas,
    get_user_id: get_user_id,
    logout: logout,
};
