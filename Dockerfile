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
