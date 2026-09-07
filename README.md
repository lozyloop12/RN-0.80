# React Native 0.87 Architecture (RN87)

A modern, production-grade **React Native** starter boilerplate and architecture template built with **React Native 0.87**, **React 19**, and **TypeScript**. Designed for scalability, maintainability, high performance, and rapid developer velocity.

---

## 🚀 Tech Stack & Core Libraries

| Category | Technology / Library | Version | Description |
| :--- | :--- | :--- | :--- |
| **Core** | [React Native](https://reactnative.dev/) | `0.87.0` | Latest React Native core |
| **Framework** | [React](https://react.dev/) | `19.2.3` | React 19 with modern concurrency & hooks |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^6.0.3` | Strict type safety and autocompletion |
| **Navigation** | [React Navigation](https://reactnavigation.org/) | `v7.x` | Native Stack navigation with centralized typed helpers |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) | `v5.0.15` | Lightweight global store with AsyncStorage persistence |
| **Server State / Caching** | [TanStack React Query](https://tanstack.com/query) | `v5.102.8` | Declarative asynchronous caching, syncing, and mutation state |
| **Networking** | [Axios](https://axios-http.com/) + [qs](https://github.com/ljharb/qs) | `^1.7.9` | Preconfigured HTTP client with token injection & error interceptors |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) | `^7.87.0` / `^1.7.1` | Performant form controls with schema-based validation |
| **Internationalization** | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) | `^26.4.2` / `^17.0.13` | Multi-language localization (EN, FR, extensible) |
| **Animations & Gestures**| [Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) | `v4.6.0` / `v3.2.1` | Native 60/120fps gesture-driven animations |
| **UI & Vector Icons** | [React Native SVG](https://github.com/software-mansion/react-native-svg) + [SVG Transformer](https://github.com/kristerkari/react-native-svg-transformer) | `^15.15.5` | Crisp vector assets converted directly into React components |
| **Toasts & Feedback** | [React Native Toast Message](https://github.com/calintamas/react-native-toast-message) | `^2.5.0` | Global customizable toast notification system |
| **Environment Config** | [react-native-config](https://github.com/luggit/react-native-config) | `^1.7.2` | Multi-environment config management via `.env` |

---

## 📁 Project Architecture

The codebase adheres to a clean, **Domain-Driven Modular Architecture** where feature modules are isolated from core infrastructure and design tokens:

```
RN87/
├── App.tsx                      # App entry point (delegates to AppProvider)
├── index.js                     # React Native app registration
├── src/
│   ├── app/                     # App-level orchestration & setup
│   │   ├── config/              # App configurations (i18n init, etc.)
│   │   ├── navigation/          # React Navigation v7 stacks, routes, typed params
│   │   ├── stores/              # Zustand stores (Auth, Language, Loading) with persistence
│   │   ├── app-provider.tsx     # Context providers wrapper (QueryClient, SafeArea, I18n, Gestures)
│   │   └── app.tsx              # Root application container & global feedback components
│   │
│   ├── assets/                  # Static assets
│   │   ├── fonts/               # Custom fonts (linked via react-native.config.js)
│   │   ├── i18n/                # Localization translation JSONs (en.json, fr.json)
│   │   ├── images/              # Raster images (auto-exported by sync-images.js)
│   │   └── svgs/                # Vector SVG icons (auto-exported by sync-svgs.js)
│   │
│   ├── core/                    # Reusable shared core & design system
│   │   ├── api/                 # Common React Query hooks & mutations
│   │   ├── components/          # Reusable UI component library
│   │   │   ├── button/          # ButtonPrimary, ButtonIcon
│   │   │   ├── container/       # ContainerMain (safe-area, navigation header)
│   │   │   ├── dropdown/        # DropdownBase
│   │   │   ├── element/         # UIImage, UILabel, UIModal, UISwitch, UICheckbox
│   │   │   ├── forms/           # HFTextInput, HFPasswordInput (React Hook Form integrated)
│   │   │   └── loading/         # LoadingApp (global activity modal)
│   │   ├── constants/           # Common constants & route keys
│   │   ├── hook/                # Custom React hooks (useAppNavigation, useDebounce, useTimeout)
│   │   ├── model/               # TypeScript interfaces & types (Requests, Responses, Components)
│   │   ├── services/            # ApiService (Axios wrapper with interceptors & auto token header)
│   │   └── utils/               # Responsive size scaling, color tokens, storage, validators
│   │
│   ├── modules/                 # Feature & business domain modules
│   │   └── home/                # Example feature module (pages, components, local hooks)
│   │       ├── pages/           # Screen views (e.g. HomePage)
│   │       └── index.ts         # Module public export barrel
│   │
│   └── scripts/                 # Developer automation tooling
│       ├── sync-images.js       # Auto-indexes and names PNG/JPG images (`Img*`)
│       └── sync-svgs.js         # Auto-indexes and names SVG icons (`Icon*`)
```

---

## ⚡️ Path Aliases

Path aliases are preconfigured in [tsconfig.json](file:///Users/duydo/Sourcebase/React-Native/RN0.87/RN87/tsconfig.json) and [babel.config.js](file:///Users/duydo/Sourcebase/React-Native/RN0.87/RN87/babel.config.js) for clean imports without relative nesting:

| Alias | Target Directory | Description |
| :--- | :--- | :--- |
| `@src/*` | `src/*` | Root source directory |
| `@src/app/*` | `src/app/*` | App setup, navigation, and global stores |
| `@src/core/*` | `src/core/*` | Core design system, services, hooks, and utils |
| `@src/modules/*` or `@modules/*` | `src/modules/*` | Business features and page screens |
| `@src/assets/*` | `src/assets/*` | Images, icons, translations, and fonts |

---

## 🛠 Prerequisites

Ensure your development environment meets the following specifications:

- **Node.js**: `>= 22.11.0` (Recommended: LTS `v22.x` via `nvm`)
- **Ruby**: `>= 2.6.10` (Specified in `Gemfile`)
- **Package Manager**: `npm` (or `yarn`)
- **macOS Requirements (for iOS)**:
  - Xcode `16.x` or later
  - [CocoaPods](https://cocoapods.org/) via Bundler
- **Android Requirements**:
  - JDK `17` or higher
  - Android Studio with Android SDK Platform 34 / 35 & Command-line Tools

---

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd RN87
```

### 2. Install JavaScript Dependencies
```bash
npm install
```

### 3. Install iOS CocoaPods (macOS only)
Make sure Bundler is installed, then install CocoaPods dependencies:
```bash
bundle install
cd ios && bundle exec pod install && cd ..
```

### 4. Setup Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env # or create .env manually
```
Add your backend API configuration:
```env
API_URL=https://jsonplaceholder.typicode.com
```

---

## 🏃 Running the Application

### Start the Metro Bundler
```bash
npm start
```

### Run on iOS
```bash
npm run ios
# Or target a specific device:
npx react-native run-ios --simulator="iPhone 16 Pro"
```

### Run on Android
```bash
npm run android
```

---

## 📜 Available NPM Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm start` | `react-native start` | Starts the Metro development bundler |
| `npm run ios` | `react-native run-ios` | Builds and launches the app on iOS Simulator / device |
| `npm run android` | `react-native run-android` | Builds and launches the app on Android Emulator / device |
| `npm run lint` | `eslint . --ext .ts,.tsx` | Runs ESLint analysis across all TypeScript files |
| `npm test` | `jest` | Executes unit and snapshot tests with Jest |
| `npm run sync-images`| `node src/scripts/sync-images.js` | Scans `src/assets/images` and generates `Img<Name>` barrel exports |
| `npm run sync-svgs` | `node src/scripts/sync-svgs.js` | Scans `src/assets/svgs` and generates `Icon<Name>` barrel exports |

---

## 🧩 Key Architecture Patterns & Guidelines

### 1. Responsive Screen Scaling
Avoid hardcoding layout metrics in pixels. Utilize the guideline scale utility (`src/core/utils/size.util.tsx` based on the standard `375 x 812` artboard):

```tsx
import { horizontalScale, verticalScale, moderateScale, fontSize } from '@src/core';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
  },
  card: {
    borderRadius: moderateScale(8),
  },
  title: {
    fontSize: fontSize(18),
  },
});
```

### 2. Managing Vector & Image Assets
Never manually write repetitive import statements for images or SVGs.
1. Drop your `.svg` icon into `src/assets/svgs/` (e.g. `user-avatar.svg`).
2. Run:
   ```bash
   npm run sync-svgs
   ```
3. Import and use directly as a React component:
   ```tsx
   import { IconUserAvatar } from '@src/assets/svgs';

   <IconUserAvatar width={24} height={24} fill="#000" />
   ```
*(Same process applies for PNG/JPG images in `src/assets/images/` using `npm run sync-images` resulting in `Img<Name>`)*.

### 3. API & Data Fetching (TanStack Query + Axios)
API requests are powered by `ApiService` with automatic bearer token injection and error handling:

```tsx
// 1. Define query / mutation hook in src/core/api/
import { useQuery } from '@tanstack/react-query';
import { ApiService, useLoadingStore } from '@src/core';

export const useGetProfile = () => {
  const { showLoading, hideLoading } = useLoadingStore();

  return useQuery({
    queryKey: ['PROFILE'],
    queryFn: async () => {
      showLoading();
      try {
        return await ApiService.get('users/me');
      } finally {
        hideLoading();
      }
    },
  });
};

// 2. Consume in your screen / module component
const { data, isLoading, refetch } = useGetProfile();
```

### 4. Forms & Yup Validation
Combine `react-hook-form` with pre-built form elements:

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HFTextInput, HFPasswordInput, ButtonPrimary, loginSchema } from '@src/core';

const LoginForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema()),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values) => console.log('Payload:', values);

  return (
    <>
      <HFTextInput
        control={control}
        name="email"
        label="Email"
        placeholder="user@example.com"
      />
      <HFPasswordInput
        control={control}
        name="password"
        label="Password"
        placeholder="••••••••"
      />
      <ButtonPrimary label="Sign In" onPress={handleSubmit(onSubmit)} />
    </>
  );
};
```

### 5. Persistent State (Zustand)
Global states like authentication and language preference persist across app sessions via AsyncStorage:

```tsx
import { useAuthStore } from '@src/app/stores';

// In any component or service
const token = useAuthStore((state) => state.token);
const setAccessToken = useAuthStore((state) => state.setAccessToken);
const clearTokens = useAuthStore((state) => state.clearTokens);
```

### 6. Programmatic Navigation
Navigate from anywhere (even outside React components) with `NavigationUtil`:

```tsx
import { NavigationUtil } from '@src/core';
import { Screen } from '@src/app/navigation/app-route-type';

NavigationUtil.navigate(Screen.Home);
NavigationUtil.replace(Screen.SignIn);
NavigationUtil.goBack();
```

---

## 🌐 Localization (i18n)

Translations are organized under `src/assets/i18n/`:
- `en.json`: English strings
- `fr.json`: French strings

Usage in components:
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <UILabel value={t('welcome_message')} />;
};
```

---

## 🤝 Contribution & Code Style

- Code must conform to ESLint and Prettier configurations.
- Run `npm run lint` before committing any changes.
- Ensure all new components and hooks include TypeScript type definitions.

---

## 📄 License

This project is private and intended for internal use.
