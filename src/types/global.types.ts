export interface UserReferral {
    id: string;
    _id: string;
    username: string;
    email: string;
}

export interface User {
    _id: string;
    id: string;
    username: string;
    email: string;
    referralCode: string;
}