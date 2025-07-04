# MyTests - Projet CMS avec Nuxt + Directus

## Architecture

```
myTests/
├── frontend/          # Nuxt 3 + PrimeVue (interface utilisateur)
└── directus/          # Directus CMS (gestion de contenu + API)
```

## Installation

### 1. Installation complète (recommandé)

```bash
npm run install:all
```

### 2. Installation manuelle

#### Frontend Nuxt

```bash
cd frontend
npm install
npm run dev
```

#### Directus CMS

```bash
cd directus
npm install
npm run dev
```

## Démarrage

### Démarrer les deux serveurs en même temps

```bash
npm run dev
```

### Démarrer séparément

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Directus CMS
npm run dev:directus
```

## URLs

- **Frontend** : http://localhost:3000
- **Articles** : http://localhost:3000/articles
- **Admin Directus** : http://localhost:8055/admin
- **API Directus** : http://localhost:8055

## Configuration

### Variables d'environnement Frontend

Créez un fichier `.env` dans le dossier `frontend/` :

```bash
# frontend/.env
NUXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

**Exemples pour différents environnements :**

- Développement local : `http://localhost:8055`
- Production : `https://api.votredomaine.com`
- Staging : `https://staging-api.votredomaine.com`

### Variables d'environnement Directus

Le fichier `directus/.env` contient la configuration :

- Base de données SQLite : `data.db`
- Port : 8055
- Admin : admin@example.com / d1r3ctu5

Copiez `directus/env.example` et modifiez si nécessaire :

- `ADMIN_EMAIL` : Email de l'administrateur
- `ADMIN_PASSWORD` : Mot de passe de l'administrateur
- `KEY` et `SECRET` : Clés de sécurité

## Fonctionnalités

### Frontend (Nuxt)

- ✅ Interface moderne avec PrimeVue
- ✅ Page d'accueil avec articles récents
- ✅ Page articles avec filtres et recherche
- ✅ Pages articles individuelles avec permissions
- ✅ Gestion des permissions (brouillons = admin uniquement)
- ✅ Bouton admin flottant
- ✅ Composants réactifs
- ✅ Intégration API Directus
- ✅ **Illustrations d'articles** avec gestion des images
- ✅ **Variables d'environnement** configurables

### Directus CMS

- ✅ Interface d'administration moderne
- ✅ Gestion d'utilisateurs avec rôles
- ✅ Articles avec éditeur riche
- ✅ **Champ illustration** pour les articles
- ✅ Pages statiques
- ✅ Gestion des médias
- ✅ API REST/GraphQL
- ✅ Base de données SQLite (aucune installation requise)
- ✅ 100% gratuit et open source

## Illustrations d'Articles

### Ajout du champ Illustration

Le champ `illustration` a été ajouté à la collection `articles` dans Directus. Ce champ permet d'ajouter une image d'illustration à chaque article.

### Configuration

1. **Appliquer le nouveau schéma** :

   ```bash
   npm run apply-schema
   ```

2. **Redémarrer Directus** :
   ```bash
   npm run dev:directus
   ```

### Utilisation

#### Dans l'interface Directus

1. Accédez à l'admin Directus : http://localhost:8055/admin
2. Allez dans la section "Articles"
3. Créez ou modifiez un article
4. Dans le champ "Illustration", cliquez sur "Sélectionner un fichier"
5. Uploadez une image (formats supportés : JPG, PNG, GIF, WebP)
6. Sauvegardez l'article

#### Affichage dans le frontend

Les illustrations s'affichent automatiquement :

- **Page d'accueil** : Dans les cartes d'articles récents
- **Page articles** : Dans les cartes de la grille d'articles
- **Page article individuel** : En grand format en haut de l'article

#### Fallback

Si aucun article n'a d'illustration, un placeholder avec une icône s'affiche automatiquement.

### Formats recommandés

- **Ratio** : 16:9 ou 4:3 pour un meilleur rendu
- **Taille** : Minimum 800x600px, maximum 2MB
- **Formats** : JPG, PNG, WebP

## Avantages de cette architecture

1. **Simplicité** : Directus est beaucoup plus simple que Next.js + Payload
2. **Interface moderne** : Plus belle que WordPress
3. **API simple** : Nuxt consomme juste des données JSON
4. **Gestion d'utilisateurs** : Système complet avec rôles
5. **Base de données** : SQLite par défaut, aucune installation requise
6. **100% gratuit** : Aucune limitation
7. **Illustrations** : Gestion native des images avec Directus
8. **Configuration flexible** : Variables d'environnement pour tous les environnements

## Développement

### Base de données

Directus utilise SQLite par défaut (fichier `directus/data.db`). Aucune installation de base de données requise !

### Déploiement

#### Variables d'environnement pour la production

**Vercel :**

```bash
NUXT_PUBLIC_DIRECTUS_URL=https://api.votredomaine.com
```

**Netlify :**

```bash
NUXT_PUBLIC_DIRECTUS_URL=https://api.votredomaine.com
```

**Docker :**

```dockerfile
ENV NUXT_PUBLIC_DIRECTUS_URL=https://api.votredomaine.com
```

### Utilisation dans le code

```javascript
// Dans les composables
const { getImageUrl } = useDirectus()
const imageUrl = getImageUrl(article.illustration)

// L'URL sera automatiquement construite avec la bonne base URL
// Ex: /assets/8b94b8cc-27b1-47b9-b816-582e8b6fd926
```

### Gestion des images

Le projet utilise des balises `<img>` standard avec lazy loading pour les illustrations d'articles :

- **Lazy loading** : Chargement différé pour les performances
- **Responsive** : Images adaptées avec CSS
- **Fallback** : Placeholder avec icône si pas d'illustration

```vue
<template>
  <img
    :src="getImageUrl(article.illustration)"
    :alt="article.title"
    class="w-full h-full object-cover"
    loading="lazy"
  />
</template>
```
