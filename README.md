
# Calculateur d'Investissement Immobilier

Application web gratuite pour calculer la capacité d'emprunt, la rentabilité locative et les intérêts composés dans le cadre d'investissements immobiliers en France.

## 🚀 Fonctionnalités

- **Calculateur de capacité d'emprunt** : Basé sur les normes HCSF 2025
- **Simulateur de rentabilité locative** : Calculs conformes à la fiscalité française
- **Calculateur d'intérêts composés** : Projection d'investissements financiers
- **Interface responsive** : Optimisée pour desktop et mobile
- **Données actualisées** : Taux et réglementations 2025

## 🛠️ Technologies

- **Frontend** : React 18, TypeScript, Vite
- **UI** : Tailwind CSS, Shadcn/UI, Radix UI
- **Charts** : Recharts
- **Routing** : React Router
- **Query** : TanStack Query
- **Build** : Vite avec optimisations de production

## 📦 Installation et développement

```bash
# Installation des dépendances
npm install

# Serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualisation de la build
npm run preview
```

## 🌐 Déploiement

### GitHub Pages (Automatique)

1. Forkez ce repository
2. Activez GitHub Pages dans les paramètres du repository
3. Les déploiements se font automatiquement via GitHub Actions

### Configuration requise

1. **Mise à jour du nom du repository** dans `vite.config.ts` :
   ```typescript
   base: mode === 'production' ? '/votre-nom-de-repo/' : '/',
   ```

2. **Google Analytics** (optionnel) :
   - Créez une variable d'environnement `VITE_GA_MEASUREMENT_ID`
   - Ou modifiez directement dans `src/config/environment.ts`

### Autres plateformes

- **Netlify** : Connectez votre repository GitHub
- **Vercel** : Import depuis GitHub avec build command `npm run build`
- **Firebase Hosting** : `npm run build` puis `firebase deploy`

## 📁 Structure du projet

```
src/
├── components/          # Composants React
├── hooks/              # Hooks personnalisés
├── utils/              # Utilitaires et calculateurs
├── config/             # Configuration (env, SEO)
├── constants/          # Constantes et valeurs par défaut
├── pages/              # Pages de l'application
└── types/              # Types TypeScript
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local` pour le développement :

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Personnalisation

- **Couleurs et thème** : Modifiez `src/index.css` et `tailwind.config.ts`
- **Valeurs par défaut** : Éditez `src/constants/calculators.ts`
- **SEO** : Configurez `src/config/seo.ts`

## 📊 Fonctionnalités techniques

- **Lazy loading** des composants pour optimiser les performances
- **Memoization** des calculs complexes
- **Validation** robuste des entrées utilisateur
- **Responsive design** avec Tailwind CSS
- **Accessibilité** via Radix UI
- **SEO optimisé** avec métadonnées structurées

## 🚀 Optimisations de production

- **Code splitting** automatique
- **Tree shaking** pour réduire la taille du bundle
- **Compression** des assets
- **Mise en cache** optimisée
- **Lazy loading** des images et composants

## 📱 Support navigateurs

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobiles iOS/Android modernes

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Ouvrez une issue ou soumettez une pull request.

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Note importante** : Ce calculateur fournit des estimations à titre informatif. Consultez un professionnel pour tout projet d'investissement.
