
export const bodyLock = (boolean: boolean) => {
    if (boolean) {
        document.body.classList.remove('overflow-hidden');
        document.body.classList.add('overflow-y-scroll');
        document.body.style.paddingRight = '';
    } else {
        document.body.classList.add('overflow-hidden');
        document.body.classList.remove('overflow-y-scroll');
        document.body.style.paddingRight = `5px`;
    }
};

export const getIpAddress = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        // В случае ошибки возвращаем значение по умолчанию
        return 'unknown';
    }
};

// Функция для получения часового пояса
export const getTimezone = (): string => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
        // В случае ошибки возвращаем UTC
        return 'UTC';
    }
};