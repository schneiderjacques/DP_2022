
# DP_2022
Développement en groupe d'une application Web avec une architecture client-serveur pour gérer des agendas.

|Contributeurs    |
|-----------------|
|BRANCATI Silvio  |
|MOITRIER Arthur  |
|SCHNEIDER Jacques|

# Front
[Manuel d'utilisation de l'application](https://user-images.githubusercontent.com/55313428/204584029-8472fe6b-ccee-4061-9d4f-7c3ae483292d.png)

# API
[Documentation de l'API détaillée](https://documenter.getpostman.com/view/20058446/2s847PKVEZ)

## Authentification

#### POST /login
Permet de se connecter à l'application.
#### POST /register
Permet de s'inscrire.
#### POST /logout
Permet de se déconnecter de l'application.
#### GET /user
Permet de récupérer les données de l'utilisateur connecté.

## Gestion du planning
#### GET /month_planning/{month}/{year}
Permet de récupérer le planning du mois demandé.
`{month}` : `{1..12}`
`{year}` : `{YYYY}`
#### GET /week_planning/{date}
Permet de récupérer le planning de la semaine demandée.
`{date}` : premier jour de la semaine demandée au format `YYYY-mm-dd`
#### GET /day_planning/{date}
Permet de récupérer le planning du jour demandé.
`{date}` : date demandée au format `YYYY-mm-dd`
#### PUT /add_appointment
Permet d'ajouter un rendez-vous dans le planning de l'utilisateur.
```json
{
    "date": "YYYY-mm-dd",
    "heureDebut": "YYYY-mm-dd hh:mm:ss",
    "heureFin": "YYYY-mm-dd hh:mm:ss",
    "nom": "name of the appointment",
    "couleur": "#FFFFFF"
}
```
#### PATCH /edit_appointment/{id}
Permet de modifier un rendez-vous déjà existant.

`{id}`: identifiant du rendez-vous à modifier
```json
{
    "date": "YYYY-mm-dd",
    "heureDebut": "YYYY-mm-dd hh:mm:ss",
    "heureFin": "YYYY-mm-dd hh:mm:ss",
    "nom": "name of the appointment"
}
```  
#### DELETE /delete_appointment/{id}
Permet de supprimer un rendez-vous.

`{id}`: identifiant du rendez-vous à supprimer
# Installation

Se rendre dans le dossier ``/server`` et exécuter la commande suivante :
```nodejs  
npm install  
```

# Exécution
