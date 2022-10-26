# DP_2022
Développement en groupe d'une application Web avec une architecture client-serveur pour gérer des agendas

# Documentation

## API
### Routes
#### POST /login
```
http://localhost:8080/login
```
Permet de se connecter à l'application.

#### POST /register
```
http://localhost:8080/register
```
Permet de s'inscrire dans l'application.

#### GET /user
```
http://localhost:8080/user
```
Permet de récupérer les informations de l'utilisateur connecté.

#### GET /month_planning/:month/:year
```
http://localhost:8080/month_planning/12/2021
```
Permet de récupérer le planning du mois donné.\
`month` -> numéro du mois (1 à 12)\
`year` -> année

#### GET /week_planning/:first_day_of_week
```
http://localhost:8080/2021-12-06
```
Permet de récupérer le planning de la semaine à partir du premier jour de la semaine donné (au format `YYYY-mm-dd`).

#### GET /day_planning/:day
```
http://localhost:8080/2021-12-06
```
Permet de récupérer le planning du jour donné (au format `YYYY-mm-dd`).

#### POST /add_appointment
```
http://localhost:8080/add_appointment
```
Méthode permettant d'ajouter un rendez-vous dans le planning de l'utilisateur.
Le rendez-vous ajouté doit être unique.

#### POST /modify_appointment
```
http://localhost:8080/modify_appointment
```
Méthode permettant de modifier un rendez-vous dans le planning de l'utilisateur.

[Documentation de l'API détaillée](https://documenter.getpostman.com/view/20058446/2s847PKVEZ#bbd3e5bc-1ff2-4215-a16a-99a22a33b8f3)

# Installation

Se rendre dans le dossier ``/server`` et exécuter la commande suivante :
```nodejs
npm install
```