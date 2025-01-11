import { useEffect, useState } from 'react';
import {Box, Typography, Card, CardContent, Button} from '@mui/material';
import styles from './UserProfile.module.scss';
import {User, UserReferral} from "../../types/global.types";
import {getUserRef} from "../../services/user";

interface UserProfileProps {
    mainUser: User;
}

function UserProfile({ mainUser }: UserProfileProps) {
    const [user] = useState<User>(mainUser);
    const [refUser, setRefUser] = useState<UserReferral[]>([]);

    useEffect(() => {
        const fetchReferrals = async () => {
            if (!user) return;
            await getUserRef(user.id, setRefUser);
        };

        fetchReferrals();
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
                        <Typography className={styles.value} data-testid={'user-id'}>{user?.id}</Typography>
                    </Box>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>Name</Typography>
                        <Typography className={styles.value} data-testid={'username'}>{user?.username}</Typography>
                    </Box>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>Email</Typography>
                        <Typography className={styles.value} data-testid={'user-email'}>{user?.email}</Typography>
                    </Box>
                    <Box className={styles.field}>
                        <Typography className={styles.label}>Referral Link</Typography>
                        <Typography className={styles.value} data-testid={'invite-link'}>{`${import.meta.env.VITE_FRONT_END_URL}?ref=` + user.referralCode}</Typography>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/test-taskref/';
                            }}
                        >
                            Logout
                        </Button>
                    </Box>

                </CardContent>
            </Card>

            <Card className={styles.referralsBox}>
                <CardContent>
                    <Typography variant="h6">Referrals</Typography>
                    <Box className={styles.referralList}>
                        {refUser?.map((ref, index) => (
                            <Box key={ref.id || index} className={styles.referralItem} data-testid={'ref-user-box'}>
                                <Typography className={styles.referralLabel} data-testid={'ref-id'}>
                                    {ref.id}
                                </Typography>
                                <Typography className={styles.referralLabel} data-testid={'ref-name'} >
                                    {ref.username}
                                </Typography>
                                <Typography className={styles.referralValue} data-testid={'ref-email'}>
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