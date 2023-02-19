# Application légère et basique de gestion de stock de lait maternel

L'objectif de cette application est de mettre à disposition un outil léger pour pouvoir gérer un stock de lait maternel pour des Mamans qui tirent quotidiennement ou moins régulièrement leur lait.

### Auteur:

Hery RAKOTOMANANA A (Hery34)

## Description

### Langages utilisés

| Langage    | Bibliothèque | 
-----------------------------
| HTML       |              |
| CSS        |              |
| Javascript |              |

### Librairies utilisées

| Nom         | Version         | Utilité 
----------------------------------------------------------------------------------------------------------------
| Express     | ^4.18.2         | Framework léger et souple permettant de manipuler et gérer des requêtes HTTP |
| fs          | ^0.0.1-security | Middleware permettant de manipuler des fichiers                              |
| Body-Parser | ^0.0.1-security | Middleware permettant de récupérer et manipuler des propriétés de requêtes   |
| Cors        | ^2.8.5          | Middleware permettant de surmonter les blocages de ressources issues d'origines différentes |

## Utilité et fonctionnement de l'application

L'application a été développée pour être une alternative plus souple et plus ergonomique à une gestion de stock via excel. Elle a pour objectif de pouvoir gérer au quotidien les mouvements de stock d'un lait maternel à domicile à partir d'une interface épurée. Elle fonctionne selon le schéma client-serveur.
* Dans la partie client, le front-end a été conçu pour pouvoir gérer la visualisation, la création, la modification et la suppression du stock.
* Dans la partie serveur, l'API a été conçue pour récupérer les requêtes du client générées dans le front et fonctionne en se basant sur le modèle **CRUD** (Create, Read, Update, Delete).

## Installation:
* Copier le contenu du dossier sur le serveur
* Se mettre à la racine du dossier et y ouvrir un terminal. Vérifier l'installation de Node.js
``` node -v ```
* Si tout est en ordre, lancer le serveur, à partir du terminal, toujours en étant à la racine du projet en tapant:
``` npm start ```
* Pour arrêter le serveur, taper dans le terminal "ctrl +c" et accepter d'arrêter le serveur

### Une fois que le serveur tourner, ouvrir dans un navigateur le fichier dashboard.html dans le dossier dashboard. L'API peut fonctionner.