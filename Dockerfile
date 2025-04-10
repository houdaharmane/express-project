# Étape 1: Utiliser une image Node.js comme base
FROM node:20-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

COPY package*.json ./

# Installer les dépendances nécessaires
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port sur lequel ton app fonctionne, généralement 3000 pour Express
EXPOSE 3000

# Définir la commande qui démarre ton application Node.js (app.js ici)
CMD ["node", "app.js"]
