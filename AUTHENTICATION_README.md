# Firebase Authentication System

This project now includes a comprehensive Firebase authentication system with Google OAuth capabilities.

## Features

### 🔐 Authentication Methods
- **Email/Password Authentication**: Traditional email and password login
- **Google OAuth**: Sign in with Google account
- **Password Reset**: Email-based password recovery

### 🛡️ Security Features
- Protected routes with automatic redirection
- Session management with Firebase Auth
- Real-time authentication state monitoring
- Comprehensive error handling

## Setup Instructions

### 1. Firebase Project Setup

Follow the detailed setup guide in `FIREBASE_SETUP.md` to:
- Create a Firebase project
- Enable authentication providers
- Configure Google OAuth
- Set up phone authentication
- Get configuration values

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Development Setup

For local development with Firebase emulators:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize emulators
firebase init emulators

# Start emulators
firebase emulators:start
```

## File Structure

```
src/
├── lib/
│   └── firebase.ts                 # Firebase configuration
├── contexts/
│   └── AuthContext.tsx            # Authentication context provider
├── components/
│   └── ProtectedRoute.tsx         # Route protection component
└── app/authentication/
├── auth/
│   ├── AuthLogin.tsx          # Login form component
│   ├── AuthRegister.tsx       # Registration form component
│   └── AuthForgotPassword.tsx # Password reset component
├── login/
│   └── page.tsx               # Login page
├── register/
│   └── page.tsx               # Registration page
└── forgot-password/
    └── page.tsx               # Password reset page
```

## Usage

### Authentication Context

The `AuthContext` provides authentication state and methods throughout the app:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, signIn, signInWithGoogle, signOutUser } = useAuth();
  
  // Use authentication methods
}
```

### Protected Routes

Wrap components that require authentication:

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  );
}
```

### Authentication Methods

#### Email/Password Authentication
```tsx
const { signIn, signUp } = useAuth();

// Sign in
await signIn(email, password);

// Sign up
await signUp(email, password);
```

#### Google Authentication
```tsx
const { signInWithGoogle } = useAuth();

// Sign in with Google
await signInWithGoogle();
```


## Authentication Flow

### Login Flow
1. User enters email/password or clicks Google sign-in
2. Firebase authenticates the user
3. User is redirected to dashboard
4. Authentication state is maintained across sessions

### Registration Flow
1. User fills out registration form
2. Firebase creates new user account
3. User is automatically signed in
4. User is redirected to dashboard


### Password Reset Flow
1. User enters email on forgot password page
2. Firebase sends password reset email
3. User clicks link in email
4. User sets new password
5. User is redirected to login

## Error Handling

The system includes comprehensive error handling for:
- Invalid credentials
- Network errors
- Firebase authentication errors
- Form validation errors

## UI Components

### AuthLogin Component
- Email/password form
- Google sign-in button
- Forgot password link
- Loading states and error messages

### AuthRegister Component
- Registration form with validation
- Google sign-up option
- Terms and conditions

### AuthForgotPassword Component
- Email input form
- Success confirmation
- Back to login option

## Security Considerations

1. **Environment Variables**: Never commit Firebase config to version control
2. **Domain Restrictions**: Configure authorized domains in Firebase Console
3. **Phone Number Verification**: Uses Firebase's built-in SMS verification
4. **Rate Limiting**: Firebase handles rate limiting for authentication attempts
5. **Session Management**: Firebase manages secure session tokens

## Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check environment variables are set correctly
   - Ensure Firebase project is properly configured

2. **"Google sign-in not working"**
   - Verify Google OAuth is enabled in Firebase Console
   - Check authorized domains configuration


4. **"Emulator connection issues"**
   - Ensure Firebase emulators are running
   - Check port configurations (9099 for Auth, 8080 for Firestore)

### Development Tips

1. Use Firebase emulators for local development
2. Check browser console for detailed error messages
3. Use Firebase Console to monitor authentication events
4. Test with different phone numbers and email addresses

## Production Deployment

1. Set up production Firebase project
2. Configure production environment variables
3. Set up proper domain restrictions
4. Enable security rules
5. Monitor authentication metrics in Firebase Console

## Support

For issues or questions:
1. Check Firebase documentation
2. Review error messages in browser console
3. Check Firebase Console for configuration issues
4. Verify environment variables are correctly set
