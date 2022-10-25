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

/**
 * Méthode retournant tous les rendez-vous d'un utilisateur à une semaine donnée
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function week_view(req, res) {
    // Vérifier si le mois et l'année sont présents dans la requête
    if (!req.params.first_day_week) {
        res.sendStatus(422);
        return;
    }

    // Récupérer le planning de l'utilisateur
    let planning = get_planning(req);

    if (planning) {
        // Récupérer les rendez-vous de la semaine
        let rdvs = [];

        // Récupérer la date de début et de fin de la semaine
        let start_week = new Date(req.params.first_day_week);
        let end_week = new Date(start_week);
        end_week.setDate(end_week.getDate() + 6);

        for (var i = 0; i < planning.length; i++) {
            let date = new Date(planning[i].date);

            // Vérifier si la date du rendez-vous est dans la semaine
            if (date >= start_week && date <= end_week) {
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

/**
 * Méthode retournant tous les rendez-vous d'un utilisateur à un jour donnée
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function day_view(req, res) {
    // Vérifier si le mois et l'année sont présents dans la requête
    if (!req.params.day) {
        res.sendStatus(422);
        return;
    }

    // Récupérer le planning de l'utilisateur
    let planning = get_planning(req);

    if (planning) {
        // Récupérer les rendez-vous de la journée
        let rdvs = [];
        let date_matching = new Date(req.params.day);
        for (var i = 0; i < planning.length; i++) {
            let date = new Date(planning[i].date);

            // Vérifier si la date du rendez-vous est dans la journée
            if (date.getDate() === date_matching.getDate()) {
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
    month_view: month_view,
    week_view: week_view,
    day_view: day_view
}