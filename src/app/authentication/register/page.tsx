'use client';

import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import styles from './register.module.css';

const OTP_TIMER_SECONDS = 30;
const ANIMATION_DURATION_MS = 500;

// Helper to generate a 6-digit OTP
const generateNewOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Type definitions for form state and errors
type FormFields = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    otp: string;
};

// Using keyof FormFields to ensure errors object matches form fields
type FormErrors = Record<keyof FormFields, string>;


const ForestAnimation = () => (
    <div className={styles.forestContainer}>
        <div className={`${styles.tree} ${styles.tree1}`}>
            <div className={styles.branches}>
                <div className={styles.branch}></div>
                <div className={styles.branch}></div>
                <div className={styles.branch}></div>
                <div className={styles.branch}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.fallingLeaf}></div>
                <div className={styles.fallingLeaf}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.sparkle}></div>
                <div className={styles.sparkle}></div>
            </div>
        </div>
        <div className={`${styles.tree} ${styles.tree2}`}>
            <div className={styles.branches}>
                <div className={styles.branch}></div>
                <div className={styles.branch}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.fallingLeaf}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
                <div className={styles.sparkle}></div>
            </div>
        </div>
        <div className={`${styles.tree} ${styles.tree3}`}>
            <div className={styles.branches}>
                <div className={styles.branch}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.leaves}></div>
                <div className={styles.fallingLeaf}></div>
                <div className={styles.flower}></div>
                <div className={styles.flower}></div>
            </div>
        </div>
        <div className={styles.groundLeaf}></div>
        <div className={styles.groundLeaf}></div>
        <div className={styles.groundLeaf}></div>
    </div>
);

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormFields>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        otp: '',
    });
    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        otp: '',
    });
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [timeLeft, setTimeLeft] = useState(OTP_TIMER_SECONDS);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [shakeField, setShakeField] = useState('');
    const [animation, setAnimation] = useState({ step1: styles.slideIn, step2: '' });

    useEffect(() => {
        let timerInterval: ReturnType<typeof setInterval>;
        if (isTimerActive && timeLeft > 0) {
            timerInterval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(timerInterval);
    }, [isTimerActive, timeLeft]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // The 'name' from an input is a string. We cast it to a key of our form fields type.
        // This is a common pattern, and we ensure safety by making sure all input 'name' attributes
        // match the keys in our FormFields type.
        const fieldName = name as keyof FormFields;
        setFormData(prev => ({ ...prev, [fieldName]: value }));
        if (errors[fieldName]) {
            setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors: FormErrors = { username: '', email: '', password: '', confirmPassword: '', otp: '' };
        let isValid = true;

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^(?:\+?1[-. ]?)?(?:\(\d{3}\)|\d{3})[-. ]?\d{3}[-. ]?\d{4}$/;
        if (!emailPattern.test(formData.email) && !phonePattern.test(formData.email)) {
            newErrors.email = 'Please enter a valid email or phone number';
            isValid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSendOTP = () => {
        if (!validateStep1()) return;

        const newOTP = generateNewOTP();
        setGeneratedOTP(newOTP);
        console.log(`OTP sent to ${formData.email}: ${newOTP}`);

        setAnimation({ step1: styles.slideOut, step2: '' });
        setTimeout(() => {
            setStep(2);
            setAnimation({ step1: '', step2: styles.slideIn });
            setTimeLeft(OTP_TIMER_SECONDS);
            setIsTimerActive(true);
        }, ANIMATION_DURATION_MS);
    };

    const handleResendOTP = () => {
        const newOTP = generateNewOTP();
        setGeneratedOTP(newOTP);
        console.log(`New OTP sent to ${formData.email}: ${newOTP}`);
        alert('New OTP has been sent!');
        setTimeLeft(OTP_TIMER_SECONDS);
        setIsTimerActive(true);
    };

    const handleRegisterSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.otp.trim() !== generatedOTP) {
            setErrors(prev => ({ ...prev, otp: 'Invalid OTP' }));
            setShakeField('otp');
            setTimeout(() => setShakeField(''), 500);
            return;
        }

        setIsTimerActive(false);
        console.log('Registration successful:', { username: formData.username, email: formData.email });
        alert('Registration successful!');
    };

    const goBack = () => {
        setIsTimerActive(false);
        setAnimation({ step1: '', step2: styles.slideOut });
        setTimeout(() => {
            setStep(1);
            setAnimation({ step1: styles.slideIn, step2: '' });
            setFormData(prev => ({ ...prev, otp: '' }));
            setErrors(prev => ({ ...prev, otp: '' }));
        }, ANIMATION_DURATION_MS);
    };

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.container}>
                <ForestAnimation />
                <div className={styles.registerContainer}>
                    <h2 className={styles.title}>Create Account</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        {step === 1 && (
                            <div className={`${styles.registerStep} ${animation.step1}`}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="username" className={styles.label}>Username</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        aria-invalid={!!errors.username}
                                        aria-describedby="username-error"
                                    />
                                    {errors.username && <div id="username-error" className={styles.error}>{errors.username}</div>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>Email or Mobile Phone Number</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="Email or phone"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        aria-invalid={!!errors.email}
                                        aria-describedby="email-error"
                                    />
                                    {errors.email && <div id="email-error" className={styles.error}>{errors.email}</div>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password" className={styles.label}>Password</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        placeholder="••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        aria-invalid={!!errors.password}
                                        aria-describedby="password-error"
                                    />
                                    {errors.password && <div id="password-error" className={styles.error}>{errors.password}</div>}
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="confirm-password" className={styles.label}>Confirm Password</label>
                                    <input
                                        className={styles.input}
                                        type="password"
                                        id="confirm-password"
                                        name="confirmPassword" required placeholder="••••••" value={formData.confirmPassword} onChange={handleInputChange}
                                        aria-invalid={!!errors.confirmPassword}
                                        aria-describedby="confirm-password-error"
                                    />
                                    {errors.confirmPassword && <div id="confirm-password-error" className={styles.error}>{errors.confirmPassword}</div>}
                                </div>
                                <button type="button" className={styles.formButton} onClick={handleSendOTP}>Send OTP</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className={`${styles.registerStep} ${animation.step2}`}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="otp" className={styles.label}>Enter OTP</label>
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        required
                                        maxLength={6}
                                        pattern="\d{6}"
                                        placeholder="------"
                                        value={formData.otp}
                                        onChange={handleInputChange}
                                        className={`${styles.otpInput} ${shakeField === 'otp' ? styles.shake : ''}`}
                                        aria-invalid={!!errors.otp}
                                        aria-describedby="otp-error"
                                    />
                                    {errors.otp && <div id="otp-error" className={styles.error}>{errors.otp}</div>}
                                </div>
                                {isTimerActive ? (
                                    <div className={styles.timer}>Resend available in {timeLeft}s</div>
                                ) : (
                                    <button type="button" className={styles.resendLink} onClick={handleResendOTP}>Resend OTP</button>
                                )}
                                <div className={styles.buttonGroup}>
                                    <button type="button" className={styles.formButton} onClick={goBack}>Back</button>
                                    <button type="submit" className={styles.formButton}>Verify & Sign Up</button>
                                </div>
                            </div>
                        )}
                    </form>
                    <div className={styles.authLinks}>
                        <Link href="/authentication/forgot-password">Forgot Password?</Link>
                        <Link href="/authentication/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;