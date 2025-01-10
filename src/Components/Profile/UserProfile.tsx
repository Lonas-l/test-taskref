import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import styles from './UserProfile.module.scss';

interface UserReferral {
    id: string;
    _id: string;
    username: string;
    email: string;
}

interface User {
    _id: string;
    id: string;
    username: string;
    email: string;
}

interface UserProfileProps {
    mainUser: any;
}

function UserProfile({ mainUser }: UserProfileProps) {
    const [user, setUser] = useState<User | null>(mainUser);
    const [refUser, setRefUser] = useState<UserReferral[]>([]);
    console.log('refUser = ', refUser)
    console.log('mainUser:', mainUser);
    // useEffect(() => {
    //     mainUser.referrals.forEach((ref: string) => {
    //         console.log('ref:', ref);
    //         fetch(`http://localhost:8081/auth/getUserById/${ref}`)
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 if(data) setRefUser([...refUser, data]);
    //             })
    //             .catch((err) => {
    //                 console.error('Error fetching user:', err);
    //             });
    //     })
    //
    // }, []);

    useEffect(() => {
        if (!user) return;

        fetch(`http://localhost:8081/auth/getUserReferrals/${user?.id}`)
                .then((res) => res.json())
                .then((data) => {
                    if(data) setRefUser(data);
                })
                .catch((err) => {
                    console.error('Error fetching user:', err);
                });

    }, [user]);


    if (!refUser) {
        return <div>Loading...</div>;
    }

    return (
        <Box className={styles.container}>
            <Card className={styles.userBox}>
                <CardContent>
                    <Typography variant="h6">User Profile</Typography>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>ID</Typography>
                        <Typography className={styles.value}>{user?.id}</Typography>
                    </Box>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>Name</Typography>
                        <Typography className={styles.value}>{user?.username}</Typography>
                    </Box>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>Email</Typography>
                        <Typography className={styles.value}>{user?.email}</Typography>
                    </Box>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>Referal Link</Typography>
                        <Typography className={styles.value}>{'http://localhost:5173?ref=' + user?.referralCode}</Typography>
                    </Box>
                </CardContent>
            </Card>

            <Card className={styles.referralsBox}>
                <CardContent>
                    <Typography variant="h6">Referrals</Typography>
                    <Box className={styles.referralList}>
                        {refUser?.map((ref, index) => (
                            <Box key={ref.id || index} className={styles.referralItem}>
                                <Typography className={styles.referralLabel}>
                                    {ref.id}
                                </Typography>
                                <Typography className={styles.referralLabel}>
                                    {ref.username}
                                </Typography>
                                <Typography className={styles.referralValue}>
                                    {ref.email}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default UserProfile;