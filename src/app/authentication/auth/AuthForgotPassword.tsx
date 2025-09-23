'use client';

import { auth } from '@/lib/firebase';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react';

interface AuthForgotPasswordProps {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}

const AuthForgotPassword = ({ title, subtitle, subtext }: AuthForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        {title ? (
          <Typography fontWeight="700" variant="h2" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}

        <Paper elevation={2} sx={{ p: 3, backgroundColor: '#f0f8f0' }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset email sent successfully!
          </Alert>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Please check your email and follow the instructions to reset your password.
            If you don&apos;t see the email, check your spam folder.
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              component={Link}
              href="/authentication/login"
              sx={{
                backgroundColor: '#2c7873',
                '&:hover': {
                  backgroundColor: '#256d63',
                },
              }}
            >
              Back to Sign In
            </Button>
          </Box>
        </Paper>

        {subtitle}
      </>
    );
  }

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter your email address and we&apos;ll send you a link to reset your password.
        </Typography>

        <form onSubmit={handleResetPassword}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} component="label" mb="5px">
              Email Address
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
            
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ mb: 2 }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Box>
        </form>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Remember your password?{' '}
            <Link href="/authentication/login" style={{ color: '#2c7873', textDecoration: 'none' }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>

      {subtitle}
    </>
  );
};

export default AuthForgotPassword;
