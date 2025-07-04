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

### Directus

Le fichier `directus/.env` contient la configuration :

- Base de données SQLite : `data.db`
- Port : 8055
- Admin : admin@example.com / d1r3ctu5

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

### Directus CMS

- ✅ Interface d'administration moderne
- ✅ Gestion d'utilisateurs avec rôles
- ✅ Articles avec éditeur riche
- ✅ Pages statiques
- ✅ Gestion des médias
- ✅ API REST/GraphQL
- ✅ Base de données SQLite (aucune installation requise)
- ✅ 100% gratuit et open source

## Avantages de cette architecture

1. **Simplicité** : Directus est beaucoup plus simple que Next.js + Payload
2. **Interface moderne** : Plus belle que WordPress
3. **API simple** : Nuxt consomme juste des données JSON
4. **Gestion d'utilisateurs** : Système complet avec rôles
5. **Base de données** : SQLite par défaut, aucune installation requise
6. **100% gratuit** : Aucune limitation

## Développement

### Variables d'environnement

Copiez `directus/env.example` et modifiez si nécessaire :

- `ADMIN_EMAIL` : Email de l'administrateur
- `ADMIN_PASSWORD` : Mot de passe de l'administrateur
- `KEY` et `SECRET` : Clés de sécurité

### Base de données

Directus utilise SQLite par défaut (fichier `directus/data.db`). Aucune installation de base de données requise !
