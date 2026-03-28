# GiGuard Frontend Setup

This document outlines the proposed implementation plan for generating the GiGuard frontend project structure according to your specifications. 

## Proposed Changes

I will set up the React+Vite project with a strict feature-based architecture.

### Project Initialization
- Create a new Vite React application with TypeScript.
- Install dependencies: `react-router-dom`, `@reduxjs/toolkit`, `react-redux`, `axios`, `tailwindcss` (and related tooling).
- Configure Tailwind CSS, Prettier, and ESLint.

### Directory Structure Creation
I will create the following feature-based directory tree in `src/`:

```
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
├── features/
│   ├── auth/
│   ├── policy/
│   ├── claims/
│   ├── premium/
│   ├── location/
│   └── dashboard/
├── pages/
├── routes/
├── services/
├── store/
├── hooks/
├── utils/
├── types/
├── constants/
└── config/
```

### Boilerplate & Handlers
- **Store Setup:** Centralized Redux store with slices for all features (`authSlice`, `policySlice`, etc.).
- **API Setup:** An Axios instance with interceptors configured in `src/services/api.ts`.
- **Routing:** Centralized router configured using React Router in `src/routes/`.
- **Feature Module Example:** `features/auth/` will be fully populated with its `slice.ts`, `api.ts`, hooks, and components as an example.
- **Pages Placeholder:** Placeholder page files for Login, Registration, Dashboard, Policy Management, Claims, and Premium Details.

### Documentation Files
- README.md
- ARCHITECTURE.md
- API_CONTRACT.md
- DEVELOPMENT_PLAN.md
- FOLDER_STRUCTURE.md

## Verification Plan
1. Ensure all configuration files (`tsconfig.json`, `vite.config.ts`, `tailwind.config.js`) are correctly formatted.
2. Verify that there are no empty directories by ensuring each folder has at least one meaningful placeholder file.
3. Check `npm install` and `npm run build` output to ensure the boilerplate is syntactically sound.
