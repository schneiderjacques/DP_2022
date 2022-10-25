const fs = require("fs");

/**
 * Méthode permettant de récupérer les données du site
 * @param req
 * @returns {[]|[{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string}]|*|null}
 */
function get_planning(req) {
    // Récupérer les données du site
    let users = JSON.parse(fs.readFileSync(__dirname + "./../data/" + "data.json", 'utf8'));

    // Chercher l'utilisateur
    for (var i = 0; i < users.length; i++) {
        if (users[i].token == req.headers.authorization.substring(7)) {
            return users[i].rdvs;
        }
    }

    return null;
}

/**
 * Méthode retournant tous les rendez-vous d'un utilisateur à un mois donnée
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function month_view(req, res) {
    // Vérifier si le mois et l'année sont présents dans la requête
    if (!req.params.month || !req.params.year) {
        res.sendStatus(422);
        return;
    }

    // Récupérer le planning de l'utilisateur
    let planning = get_planning(req);

    if (planning) {
        // Récupérer les rendez-vous du mois
        let rdvs = [];
        for (var i = 0; i < planning.length; i++) {
            let date = new Date(planning[i].date);
            if ((date.getMonth() + 1) == req.params.month && date.getFullYear() == req.params.year) {
                rdvs.push(planning[i]);
            }
        }
        res.set({"Content-Type":"application/json","Access-Control-Allow-Origin":"*"});
        res.send(rdvs);
    } else {
        res.sendStatus(404);
        return;
    }
}

module.exports = {
    month_view: month_view
}