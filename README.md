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

Note: When using Expo Go, biometrics like face and touch id will not be available on iOS. For that to be enabled. Run the project on Macbook and connect via cable with phone. Then use the command yarn ios.

For devices without any biometrics setup, the app will prompt to enter a password instead which is defaulted currently to 1234

Link to Demo Video: [https://drive.google.com/file/d/1QLT-BkZ-zZk7wGNnXx5MTR5RPHCt9le9/view?usp=sharing](https://drive.google.com/file/d/1nI10qkPTh9Nbfc9S9EGkQM7serKy16is/view?usp=sharing)
