import {User} from "../types/global.types";

export const getUserRef = async (userId: string, setRefUser: (data: any) => void) => {
    fetch(`${import.meta.env.VITE_BACK_END_URL}/auth/getUserReferrals/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            if(data) setRefUser(data);
        })
        .catch((err) => {
            console.error('Error fetching user:', err);
        });
}


export const getUser = async (token: string) : Promise<User> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACK_END_URL}/auth/getUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        return await response.json();
    } catch {
        throw new Error('Failed to fetch user info');
    }
}