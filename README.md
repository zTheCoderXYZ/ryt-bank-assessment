# Ryt Bank Assessment

Built with accessibility in mind, this app supports both English and Malay using i18n, along with light and dark mode managed via custom hooks and Zustand for global state.

The app maintains design consistency by reusing components and applying a shared stylesheet across screens.

Form handling is implemented with React Hook Form for robust validation and better input state management. API interactions are handled using `useQuery` and `useMutation` for predictable fetching and mutation flows.

The app is built with Expo to leverage native-friendly capabilities such as biometric authentication, contacts access, routing, and fast mobile testing with Expo Go.

## Run the App (Expo Go)

1. Install dependencies:
   ```
   yarn install
   ```
2. Install Expo Go on your mobile phone.
3. Start the Metro server for Expo Go:
   ```
   yarn start:go
   ```
4. Scan the QR code shown in the terminal:
   - iOS: Scan using the Camera app.
   - Android: Scan using the Expo Go app.
