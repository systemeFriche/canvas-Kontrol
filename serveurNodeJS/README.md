# Liaison bi-directionelle application (UDP) <-> client web (WS)

Le serveur nodejs permet de relier une page web avec une autre application (MAX par exemple) pour échanger des informations via une liaison UDP.

Le serveur nodejs ouvre une Web Socket et écoute sur le port 8081. Cela permet ainsi à une page web d'envoyer des données à ce serveur nodejs. 

Le serveur nodejs ouvre une connexion UDP et écoute sur le port 7400 et envoie les données udp sur le port 7500 à la machine sur laquelle est exécutée l'application avec laquelle on souhaite échanger. 

Ainsi notre page web peut envoyer des données à l'application tierce. 

page Web <---- Web Socket ----> Serveur Node JS <---- UDP ----> Application tierce

## Version Node.JS

Ce code doit être exécuté avec la version 4.8.7 de node.js

## Installation du serveur

Le code fourni comprend déjà tout le nécessaire. 

## Exécution du serveur

1. éditer le fichier lancementServeur.command et préciser le chemin du dossier du serveur nodejs. 
2. lancer le script lancementServeur.command