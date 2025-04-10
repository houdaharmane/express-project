<<<<<<< HEAD
FROM node:20-alpine

# Ajout des dépendances nécessaires à node-gyp
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && python3 -m ensurepip \
    && pip3 install --upgrade pip

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Lancer l'application
CMD ["npm", "start"]
=======
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
>>>>>>> e86ad5d221f3bfbfbe3b6d8d42418069916b6a80
