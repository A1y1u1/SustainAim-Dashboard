# Firebase Emulator Setup Guide

## Current Status
✅ Firebase project configured: `e-sustainaim`  
❌ Emulators require Java (not currently installed)

## Option 1: Use Live Firebase Project (Recommended for now)

Since Java is not installed, you can use the live Firebase project directly:

### Steps:
1. **Set up your Firebase project:**
   ```bash
   # Use your existing project
   firebase use e-sustainaim
   ```

2. **Configure your .env.local file:**
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_from_firebase_console
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=e-sustainaim.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=e-sustainaim
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=e-sustainaim.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Enable Authentication in Firebase Console:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your `e-sustainaim` project
   - Go to Authentication → Sign-in method
   - Enable Email/Password and Google providers

4. **Test your authentication:**
   ```bash
   npm run dev
   ```

## Option 2: Install Java and Use Emulators (Optional)

If you want to use Firebase emulators for development:

### Install Java:
1. **Download Java JDK:**
   - Go to [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or
   - Use [OpenJDK](https://openjdk.org/install/)

2. **Install and configure PATH:**
   - Install Java JDK
   - Add Java to your system PATH
   - Verify installation: `java -version`

3. **Enable emulators in firebase.ts:**
   ```typescript
   // Uncomment the emulator code in src/lib/firebase.ts
   if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
     if (!auth.emulatorConfig) {
       connectAuthEmulator(auth, 'http://localhost:9099');
     }
     try {
       connectFirestoreEmulator(db, 'localhost', 8080);
     } catch (error) {
       console.log('Firestore emulator connection:', error);
     }
   }
   ```

4. **Start emulators:**
   ```bash
   firebase emulators:start
   ```

## Quick Start (Recommended)

Since you already have a Firebase project, let's set it up quickly:

### 1. Configure your project:
```bash
firebase use e-sustainaim
```

### 2. Get your Firebase config:
- Go to Firebase Console → Project Settings → Your apps
- Copy the config values to your `.env.local` file

### 3. Enable Authentication:
- Go to Authentication → Sign-in method in Firebase Console
- Enable Email/Password, Google, and Phone providers

### 4. Start development:
```bash
npm run dev
```

## Firebase Console Setup

### Enable Authentication Providers:

1. **Email/Password:**
   - Go to Authentication → Sign-in method
   - Enable Email/Password provider

2. **Google:**
   - Enable Google provider
   - Add your domain to authorized domains

### Get Configuration Values:

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Copy the configuration object
4. Add values to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=e-sustainaim.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=e-sustainaim
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=e-sustainaim.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Testing Authentication

Once configured, test these features:

1. **Email/Password:** Register and login
2. **Google OAuth:** Sign in with Google
3. **Password Reset:** Use forgot password functionality

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized":**
   - Check `.env.local` file exists and has correct values
   - Restart development server after adding env variables

2. **"Google sign-in not working":**
   - Verify Google provider is enabled in Firebase Console
   - Check authorized domains configuration


4. **"Project not found":**
   - Run `firebase use e-sustainaim` to set the project

## Next Steps

1. Set up your `.env.local` file with Firebase config
2. Enable authentication providers in Firebase Console
3. Test the authentication system
4. Deploy to production when ready

The authentication system is fully implemented and ready to use with your live Firebase project!
