import { $host,  } from '@/shared';
import { jwtDecode } from 'jwt-decode';

// Функция для авторизации пользователя
export const login = async (name: string) => {
	const { data } = await $host.get('user/login', { params: { name } });
	localStorage.setItem('accessToken', data.accessToken);
	localStorage.setItem('refreshToken', data.refreshToken);
	localStorage.setItem('user', JSON.stringify(data.user));
	return jwtDecode(data.accessToken);
};
