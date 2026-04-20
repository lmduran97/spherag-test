# Spherag Test App

## Get started

1. Paste .env file in root project

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

## Application functionality

- Login
- List user farms
- Access farm details and browse all atlas registered in that farm
- Access atlas details and view the location on a map

## Tech Stack

- **Expo**
- **React Native**
- **TypeScript**
- **Expo Router**
- **Expo Vector Icons**
- **TanStack Query**
- **Zustand**
- **NativeWind**
- **React Native Maps**

## Technical decisions

### Navigation

The app uses **Expo Router** to define navigation through file-based routing and to separate public and protected flows.

- (public): contains the login screen
- (app): contains authenticated screen

### State management

Two different kinds of states are handled separately:

- TanStack Query: for server state and API caching
- Zustand: for global authentication

### Session persistence

The authentication token is stored locally in order to persist the user session between app restarts.

### Project structure

The project is organized by **feature**, grouping each domain into:

- `api`
- `components`
- `hooks`
- `stores`
- `types`

This keeps the codebase clean and scalable, even for a small application.

## Project structure

```bash
app/
  _layout.tsx
  index.tsx
  (public)/
    _layout.tsx
    login.tsx
  (app)/
    _layout.tsx
    farms/
      index.tsx
      [farmId]/
        index.tsx
        atlas/
          [id].tsx

src/
  components/
  features/
    auth/
      api/
      hooks/
      store/
      types/
    farms/
      api/
      components/
      hooks/
      types/
   lib/
      query/
   utils/

```
