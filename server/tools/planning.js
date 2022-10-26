const tool_user = require('./user.js');
const fs = require("fs");

/**
 * Méthode permettant de récupérer les données du site
 * @param req
 * @returns {[]|[{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string},{date: string, heureDebut: string, id: number, heureFin: string, nom: string}]|*|null}
 */
function get_planning(req) {
    // Récupérer les données du site
    let users = JSON.parse(fs.readFileSync(__dirname + "/../data/" + "data.json", 'utf8'));

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

/**
 * Méthode permettant de créer un rendez-vous
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function add_appointment(req, res) {
    // Vérifier si les données sont présentes dans la requête
    if (!req.body.nom || !req.body.date || !req.body.heureDebut || !req.body.heureFin) {
        res.sendStatus(422);
        return;
    }

    // Récupérer le planning de l'utilisateur
    let planning = get_planning(req);

    if (planning) {
        // Récupérer les données du site
        let users = tool_user.get_datas();

        // Chercher l'utilisateur
        for (var i = 0; i < users.length; i++) {
            if (users[i].token == req.headers.authorization.substring(7)) {
                let new_date_debut = new Date(req.body.heureDebut);
                let new_date_fin = new Date(req.body.heureFin);

                // Vérifier si le rendez-vous n'est pas déjà pris
                for (var j = 0; j < planning.length; j++) {
                    let debut = new Date(planning[j].heureDebut);
                    let fin = new Date(planning[j].heureFin);

                    if (debut <= new_date_debut && fin >= new_date_fin) {
                        res.sendStatus(409);
                        return;
                    }
                }

                // Ajouter le rendez-vous
                users[i].rdvs.push({
                    id: planning.length + 1,
                    nom: req.body.nom,
                    date: req.body.date,
                    heureDebut: req.body.heureDebut,
                    heureFin: req.body.heureFin
                });

                // Sauvegarder les données
                fs.writeFileSync(__dirname + "/../data/" + "data.json", JSON.stringify(users));

                res.sendStatus(200);
                return;
            }
        }
    } else {
        res.sendStatus(404);
        return;
    }
}

/**
 * Méthode permettant de modifier un rendez-vous
 * @param req
 * Requête
 * @param res
 * Réponse
 */
function edit_appointment(req, res) {
    // Vérifier si les données sont présentes dans la requête
    if (!req.body.nom || !req.body.date || !req.body.heureDebut || !req.body.heureFin) {
        res.sendStatus(422);
        return;
    }

    // Récupérer les données du site
    let users = tool_user.get_datas();

    // Chercher l'utilisateur
    for (var i = 0; i < users.length; i++) {
        if (users[i].token == req.headers.authorization.substring(7)) {
            let new_date_debut = new Date(req.body.heureDebut);
            let new_date_fin = new Date(req.body.heureFin);

            // Vérifier si le rendez-vous n'est pas déjà pris
            for (var j = 0; j < users[i].rdvs.length; j++) {
                let debut = new Date(users[i].rdvs.heureDebut);
                let fin = new Date(users[i].rdvs.heureFin);

                if (debut <= new_date_debut && fin >= new_date_fin) {
                    res.sendStatus(409);
                    return;
                }
            }

            // Modifier le rendez-vous
            let found = false;
            for (var j = 0; j < users[i].rdvs.length; j++) {
                if (users[i].rdvs[j].id === req.body.id) {
                    found = true;
                    users[i].rdvs[j].nom = req.body.nom;
                    users[i].rdvs[j].date = req.body.date;
                    users[i].rdvs[j].heureDebut = req.body.heureDebut;
                    users[i].rdvs[j].heureFin = req.body.heureFin;
                }
            }

            if (!found) {
                res.sendStatus(404);
                return;
            }

            // Sauvegarder les données
            fs.writeFileSync(__dirname + "/../data/" + "data.json", JSON.stringify(users));

            res.sendStatus(200);
            return;
        }
    }
}

module.exports = {
    month_view: month_view,
    week_view: week_view,
    day_view: day_view,
    add_appointment: add_appointment,
    edit_appointment: edit_appointment
}