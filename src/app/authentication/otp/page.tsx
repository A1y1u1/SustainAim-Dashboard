'use client';

import Link from 'next/link';
import React, { ChangeEvent, ClipboardEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './otp.module.css';

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

const OTP_LENGTH = 6;
const RESEND_TIMER_SECONDS = 30;

const OtpPage = () => {
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const [error, setError] = useState<string>('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(RESEND_TIMER_SECONDS);
    const [isTimerActive, setIsTimerActive] = useState(true);

    // Effect for auto-focusing the first input on mount
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Effect for the resend timer
    useEffect(() => {
        if (!isTimerActive) return;

        if (timeLeft === 0) {
            setIsTimerActive(false);
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, isTimerActive]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // Only allow digits and empty string

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last digit
        setOtp(newOtp);

        // Move to next input if a digit is entered
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');
        if (pasteData) {
            const newOtp = new Array(OTP_LENGTH).fill('');
            for (let i = 0; i < pasteData.length && i < OTP_LENGTH; i++) {
                newOtp[i] = pasteData[i];
            }
            setOtp(newOtp);
            const nextFocusIndex = Math.min(pasteData.length, OTP_LENGTH - 1);
            inputRefs.current[nextFocusIndex]?.focus();
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        const otpRegex = new RegExp(`^\\d{${OTP_LENGTH}}$`);

        if (!otpRegex.test(enteredOtp)) {
            setError(`Please enter a valid ${OTP_LENGTH}-digit OTP`);
            return;
        }

        setError('');
        console.log('OTP Verified:', enteredOtp);
        alert(`OTP Verified: ${enteredOtp}`);
        // Here you would typically make an API call to verify the OTP
    };

    const handleResendOtp = () => {
        if (isTimerActive) return;

        // Logic to resend OTP via API call would go here
        console.log("Resending OTP...");
        alert("A new OTP has been sent.");

        // Reset state
        setOtp(new Array(OTP_LENGTH).fill(''));
        setError('');
        setTimeLeft(RESEND_TIMER_SECONDS);
        setIsTimerActive(true);
        inputRefs.current[0]?.focus();
    };

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.container}>
                <ForestAnimation />
                <div className={styles.verifyContainer}>
                    <h2 className={styles.title}>
                        Verify Your OTP
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="otp-0" className={styles.label}>
                                Enter {OTP_LENGTH}-Digit OTP
                            </label>
                            <div className={styles.otpContainer} onPaste={handlePaste}>
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text" // "text" is better than "number" for single digit inputs
                                        inputMode="numeric" // Provides numeric keyboard on mobile
                                        className={`${styles.otpBox} ${error ? styles.error : ''}`}
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        style={{ '--i': index } as React.CSSProperties}
                                    />
                                ))}
                            </div>
                            {error && <div id="otp-error" className={styles.error}>{error}</div>}
                        </div>
                        <button type="submit" className={styles.formButton}>Verify OTP</button>
                    </form>
                    <div className={styles.authLinks}>
                        {isTimerActive ? (
                            <span className={styles.timerText}>Resend OTP in {timeLeft}s</span>
                        ) : (
                            <button type="button" onClick={handleResendOtp} className={styles.resendButton}>Resend OTP</button>
                        )}
                        <Link href="/authentication/login">Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpPage;