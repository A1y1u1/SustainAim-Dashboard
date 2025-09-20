'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Divider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);

    const { signUp, signInWithGoogle } = useAuth();
    const router = useRouter();

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await signUp(email, password);
            router.push('/');
        } catch (error: any) {
            setError(error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            setGoogleLoading(true);
            setError('');
            await signInWithGoogle();
            router.push('/');
        } catch (error: any) {
            setError(error.message || 'Failed to sign up with Google');
        } finally {
            setGoogleLoading(false);
        }
    };

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

            <form onSubmit={handleEmailSignUp}>
                <Box>
                    <Stack mb={3}>
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                        <CustomTextField 
                            id="name" 
                            variant="outlined" 
                            fullWidth 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                        <CustomTextField 
                            id="email" 
                            variant="outlined" 
                            fullWidth 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                        <CustomTextField 
                            id="password" 
                            variant="outlined" 
                            fullWidth 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='confirmPassword' mb="5px" mt="25px">Confirm Password</Typography>
                        <CustomTextField 
                            id="confirmPassword" 
                            variant="outlined" 
                            fullWidth 
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Stack>
                    <Button 
                        color="primary" 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        type="submit"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : null}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </Box>
            </form>

            <Box sx={{ my: 2 }}>
                <Divider>
                    <Typography variant="body2" color="text.secondary">
                        OR
                    </Typography>
                </Divider>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={handleGoogleSignUp}
                    disabled={googleLoading}
                    startIcon={googleLoading ? <CircularProgress size={20} /> : null}
                    sx={{
                        borderColor: '#db4437',
                        color: '#db4437',
                        '&:hover': {
                            borderColor: '#db4437',
                            backgroundColor: 'rgba(219, 68, 55, 0.04)',
                        }
                    }}
                >
                    {googleLoading ? 'Signing Up...' : 'Continue with Google'}
                </Button>
            </Box>


            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link href="/authentication/login" style={{ color: '#2c7873', textDecoration: 'none' }}>
                        Sign In
                    </Link>
                </Typography>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
