import { privacyPolicyData } from './privacyPolicy';
import { termsOfServiceData } from './termsOfService';
import { TabConfig } from '../model';

// Экспорт типов и данных
export { privacyPolicyData } from './privacyPolicy';
export { termsOfServiceData } from './termsOfService';

// Массив вкладок - здесь можно легко добавлять новые документы
export const documentTabs: TabConfig[] = [
    {
        value: 'privacy',
        label: 'Политика',
        icon: 'mdi-shield-account',
        data: privacyPolicyData
    },
    {
        value: 'terms',
        label: 'Соглашение',
        icon: 'mdi-file-document',
        data: termsOfServiceData
    }
    // Здесь можно добавить новые вкладки:
    // {
    // 	value: 'cookies',
    // 	label: 'Cookies',
    // 	icon: 'mdi-cookie',
    // 	data: cookiesPolicyData
    // }
];

// Экспорт типов
export { DocumentData, TabConfig } from '../model';

