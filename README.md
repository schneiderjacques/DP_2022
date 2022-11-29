
# DP_2022
Développement en groupe d'une application Web avec une architecture client-serveur pour gérer des agendas.

|Contributeurs    |
|-----------------|
|BRANCATI Silvio  |
|MOITRIER Arthur  |
|SCHNEIDER Jacques|

# Documentation
## Front
[Manuel d'utilisation de l'application](./documentation/Manuel%20utilisation%20-%20Front.pdf)
## Back
[Documentation de l'API détaillée en ligne](https://documenter.getpostman.com/view/20058446/2s847PKVEZ)\
[Documentation de l'API détaillée en PDF](./documentation/Documentation%20API%20-%20Back.pdf)

# Installation

## Installation des packages nodeJS
Se rendre dans le dossier ``/server`` et exécuter la commande suivante :
```nodejs  
npm install  
```

Se rendre dans le dossier ``/client`` et exécuter la commande suivante :
```nodejs  
npm install  
```

# Utilisation

## Lancement du serveur

Se rendre dans le dossier ``/server`` et exécuter la commande suivante :
```bash
node server.js
```
La commande retourne l'url du serveur (URL par défaut : http://localhost:8000).

## Lancement du client
Dans un deuxième terminal en parallèle, se rendre dans le dossier ``/client`` et exécuter la commande suivante afin de lancer le client VueJS :
```bash
npm run serve
```
La commande retourne l'url de l'application (URL par défaut : http://localhost:8080).

## Connexion
L'application est accessible à l'adresse http://localhost:8080.\
Pour se connecter, il faut utiliser les identifiants suivants :
- Identifiant : ``user``
- Mot de passe : ``password``

Des événements sont déjà présents dans l'application sur cet utilisateur (du 18 au 23 décembre) à titre d'exemples.