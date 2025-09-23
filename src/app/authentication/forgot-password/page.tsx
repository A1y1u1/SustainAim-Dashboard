'use client';

import { Typography } from '@mui/material';
import AuthForgotPassword from '../auth/AuthForgotPassword';
import styles from '../register/register.module.css';

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

const ForgotPasswordPage = () => {
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.container}>
                <ForestAnimation />
                <div className={styles.registerContainer}>
                    <AuthForgotPassword 
                        title="Reset Password"
                        subtext={
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                                Don&apos;t worry, it happens to the best of us
                            </Typography>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
