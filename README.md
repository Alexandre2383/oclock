# O'Clock

O'Clock est une application qui intègre plusieurs fonctionnalités pratiques liées à la gestion du temps et à la météo. Les fonctionnalités principales sont :

- **Horloge** : Affiche l'heure actuelle en temps réel.
- **Météo** : Affiche les conditions météorologiques actuelles pour votre localisation.
- **Minuteur** : Permet de définir un compte à rebours pour une durée spécifiée.
- **Chronomètre** : Permet de mesurer le temps écoulé depuis son démarrage.
- **Réveil** : Permet de régler une alarme pour une heure spécifique.

## Table des Matières

- [Installation](#installation)
- [Configuration de l'API Météo](#configuration-de-lapi-météo)
- [Licence](#licence)

## Installation

Pour installer et exécuter O'Clock, suivez ces étapes :

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/oclock.git
   ```

2. **Installez les dépendances Node.js :**

   ```bash
   npm install
   ```

3. **Installez node-fetch pour les requêtes HTTP :**

   ```bash
   npm install node-fetch
   ```

4. **Démarrez l'application :**

   ```bash
   node index.mjs
   ```

## Configuration de l'API Météo

1. **Obtention d'une clé OpenWeather :**

- rendez-vous sur le site d'OpenWeather https://openweathermap.org/ afin de créer un compte et d'accéder à une clé d'API.

2. **Initialisation de la clé WEATHER_API :**

- Créez un fichier .env à la racine du projet puis copiez la variablie en passant votre clé d'API

**Fichier .env**

```bash
  WEATHER_API='API_KEY'
```

## Licence

### O'Clock est sous licence MIT.
