export interface LoginRequest {
    user_id: number | null;
    token: string | null;
    email: string | null;
    password: string | null;
}
export interface LoginResponse {
    user_id: number;
    token: string;
    name: string;
    avatar: string;
    hierarchy: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface DefaultResponse {
    message: string;
}

export interface ChangePasswordRequest {
    user_id: number;
    oldPassword: string;
    newPassword: string;
}
export interface ChangeAvatar {
    user_id: number;
    avatar: string;
}