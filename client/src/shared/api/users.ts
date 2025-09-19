import { $host, } from '@/shared';
import { jwtDecode } from 'jwt-decode';

export const createUser = async (values: { name: string, email: string, password: string, verificationUrl: string }) => {
    await $host.post('/user/create-user', values );
    return 'Успешная регистрация';
}

// Функция для авторизации пользователя
export const login = async (value: {loginOrEmail: string, password: string}) => {
    const { data } = await $host.post('/user/login', value);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userData', JSON.stringify(data.user));
    return jwtDecode(data.accessToken);
};

export const verifyEmail = async (token: string) => {
    const result = await $host.get('/user/verify-email', { params: { token } });
    return result.data.message;
}
