=======================================
# Application Chatbot IMC
=======================================


Ce projet est une application web de chatbot qui calcule l'Indice de Masse Corporelle (IMC) et fournit des conseils de santé personnalisés en fonction des informations de l'utilisateur.

## Fonctionnalités :
- Inscription et connexion des utilisateurs avec authentification JWT
- Calcul de l'IMC et conseils de santé basés sur le poids, la taille et le sexe
- Ressources personnalisées pour maintenir ou améliorer l'IMC
- Design responsive avec Bootstrap 5
- Interface interactive de chatbot

## Prérequis :
- PHP 8.x ou supérieur
- Symfony 5.x ou supérieur
- Composer
- Node.js et npm (pour le front-end React)
- MySQL (ou toute autre base de données prise en charge)

## Installation :

### 1. Cloner le dépôt :
git clone https://github.com/MiraouiAbderrahim/chatbot.git
cd chatbot-imc

2. Configuration du backend :
   cd chatbot-backend
   composer install
3. Créer la base de données :
   php bin/console doctrine:database:create
   php bin/console doctrine:migrations:migrate
4. Lancer le serveur de développement Symfony :
   symfony serve
5. Configuration du frontend :
   cd chatbot-frontend
   npm install
6. Lancer le serveur de développement React :
   npm start





Auteur
------
Projet développé par **Abderrahim Miraoui**.
