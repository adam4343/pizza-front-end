'use client'
import { axiosInstance } from "@/lib/configs/axios.config";
import { toast } from "sonner";

import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

const ButtonGoogle: React.FC = () => {
    const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        const { credential } = credentialResponse;

        const res = await axiosInstance.post('/auth/google', {
            token: credential 
        });

        toast.success(res.data.message);

        window.location.href = '/';
    };

    const handleLoginFailure = () => {
        console.error('Login failed');
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
        />
    );
};

export default ButtonGoogle;
