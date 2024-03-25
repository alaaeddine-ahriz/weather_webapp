# README for the 3TC WEB Project

## Fonctionnalités de base

Cette section spécifie les fonctionnalités minimales du projet.

### Page de connexion

- Formulaire pour se connecter (login/mdp)
- Hypertexte pour mdp_oublié
- Hypertexte pour créer un compte

Quand cliqués, font apparraître un nouveau bloc d'HTML dans la page (comme ici https://youtu.be/-oQnDrNzTTA?si=uv1L2mM_oBrRNPTZ&t=77)

### Page d'accueil

Si l'utilisateur n'est pas connecté :

- cf. page de connexion

Sinon :

- Affichage de la météo actuelle
  
  - Récupération par API de nombreuses informations
  - L'utilisateur choisi ce qu'il affiche
- Prévisions météorologiques à court terme
  
  - Prévisions pour les prochaines heures.
- Prévisions météorologiques à long terme
  
  - Prévisions pour les prochains jours.
  - Températures minimales et maximales.
- Barre de recherche de l'emplacement
  
  - Possibilité de rechercher et sélectionner un emplacement spécifique.
  - Stockage des recherches météorologiques récentes de l'utilisateur.
- Personnalisation des informations météorologiques
  
  - Enregistrement des préférences météorologiques de l'utilisateur (unités de mesure, langue, etc.).
  - Possibilité de définir des lieux favoris.

### Pour toutes les pages

- Barre de navigation
  
  - Accès rapide à différentes sections du site (accueil, profil utilisateur, historique, etc.).
- Footer
  
  - A définir

Nicolas : Page de connexion / création de compte et section personnalisation utilisateur

## Fonctionnalités avancés

### Page de connexion

- Creer une page parametres utilisateur
  
- Fond dynamique pour la page de connexion
  
- Notification météo
  
  - Option pour activer/désactiver les notifications météorologiques.
     Notifications pour des conditions météorologiques spécifiques ou des alertes.
- Réactivité :
  
  - Conception réactive pour une expérience utilisateur optimale sur différents appareils (ordinateurs, tablettes, smartphones).
- Actualisation automatique
  
  - Mise à jour automatique des informations météorologiques à intervalles réguliers.

## Base de données

Premiere idee de chatgpt

Voici un modèle de base de données simplifié pour les fonctionnalités que vous avez décrites :

```
Utilisateurs (Users) :
    user_id (clé primaire)
    email
    mot_de_passe (peut être stocké de manière sécurisée, par exemple, en tant que hachage)
    nom
    autres informations utilisateur

Préférences Utilisateur (UserPreferences) :
    user_id (clé étrangère référençant Users)
    unités_de_mesure (par exemple, Celsius ou Fahrenheit)
    langue
    autres préférences utilisateur

Emplacements (Locations) :
    location_id (clé primaire)
    nom (nom de l'emplacement, par exemple, ville ou région)
    latitude
    longitude

Historique de Recherche (SearchHistory) :
    search_id (clé primaire)
    user_id (clé étrangère référençant Users)
    location_id (clé étrangère référençant Locations)
    date_recherche

Météo Actuelle (CurrentWeather) :
    location_id (clé étrangère référençant Locations)
    température
    conditions_météorologiques
    autres informations météorologiques actuelles

Prévisions Météorologiques à Court Terme (HourlyForecast) :
    location_id (clé étrangère référençant Locations)
    heure
    température
    conditions_météorologiques
    autres informations de prévision horaire

Prévisions Météorologiques à Long Terme (DailyForecast) :
    location_id (clé étrangère référençant Locations)
    date
    température_min
    température_max
    conditions_météorologiques
    autres informations de prévision quotidienne
```

Ce modèle de base de données prend en charge les fonctionnalités telles que la gestion des utilisateurs, la personnalisation des préférences utilisateur, le suivi de l'historique de recherche, et le stockage des données météorologiques actuelles et prévues pour différents emplacements. Vous pouvez l'ajuster en fonction de vos besoins spécifiques et des détails supplémentaires que vous souhaitez inclure.