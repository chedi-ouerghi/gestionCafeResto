# Projet de Gestion CafeResto

## Description

Ce projet est une application de gestion de vente en ligne avec une séparation des rôles entre **Admin** et **Caissier**. Le projet utilise un **frontend** développé avec **React.js**, un **backend** construit avec **Node.js** et **Express**, et une base de données **MySQL**. Le système permet de gérer les produits, effectuer des ventes, et fournir un ticket d'achat au client. Il inclut également une gestion sécurisée des utilisateurs avec l'authentification via **JWT**.

### Fonctionnalités principales :
- **Admin** :
  - Ajouter et mettre à jour les produits.
  - Visualiser les ventes sous forme de pourcentage par produit.
- **Caissier** :
  - Enregistrer les achats des clients.
  - Générer un ticket d'achat pour valider la transaction.
  
Le projet inclut également un système de contrôle d'accès pour les utilisateurs, garantissant que l'accès aux fonctionnalités est restreint selon le rôle de l'utilisateur (Admin ou Caissier).

## Technologies utilisées

- **Frontend** : React.js
- **Backend** : Node.js, Express
- **Base de données** : MySQL
- **Sécurité** : JSON Web Token (JWT) pour l'authentification et la gestion des sessions utilisateur.

## Installation

### Prérequis
Assurez-vous d'avoir installé **Node.js**, **MySQL** et **npm** sur votre machine.

1. Clonez ce dépôt sur votre machine :
   ```bash
    git clone https://github.com/chedi-ouerghi/gestionCafeResto.git

### Étapes pour installer le backend (Node.js + Express)

1. cd backend
2. npm install

3. Lancez le serveur backend :
npm start

### Étapes pour installer le frontend (React.js)

1. cd frontend
2. npm install

3. Lancez le serveur backend :
npm start

###  Authentification et Sécurisation avec JWT
Lors de l'authentification, un token JWT est généré et renvoyé à l'utilisateur.
Ce token est utilisé pour sécuriser les connexions et garantir l'accès uniquement aux utilisateurs authentifiés.
Le middleware de JWT vérifie la validité du token pour accéder aux différentes routes protégées (comme l'ajout de produits par l'Admin ou l'enregistrement des ventes par le Caissier).
Rôles d'utilisateur
- **Admin** :
. Accède aux fonctionnalités d'ajout et de mise à jour des produits.
. Visualise les ventes et les pourcentages de chaque produit.
  
- **Caissier**  :
. Saisie des achats des clients.
. Génération d'un ticket d'achat pour valider l'achat.


###  Contrôle d'accès
Le contrôle d'accès est assuré par un système de gestion de rôles dans l'application. Lorsqu'un utilisateur se connecte, un token JWT est généré et stocké côté client. Ce token est utilisé pour authentifier les utilisateurs à chaque requête.

Les rôles sont définis comme suit :

- **Admin** : Accès complet aux fonctionnalités de gestion des produits et des ventes.

- **Caissier**  : Accès limité à l'enregistrement des ventes et à la génération de tickets d'achat.



