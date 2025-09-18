import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    theme: {
        defaultTheme: 'darkGreen',
        themes: {
            darkGreen: {
                dark: true, // включаем тёмную тему
                colors: {
                    background: '#0b1d13',       // общий фон сайта
                    surface: '#123524',          // панели, drawer, app-bar
                    primary: '#1db954',          // акцентные элементы (кнопки, ссылки)
                    secondary: '#1f4d35',        // второстепенные элементы
                    error: '#e74c3c',            // ошибки
                    success: '#27ae60',          // успех
                    warning: '#f39c12',          // предупреждения
                    info: '#16a085',             // информационные сообщения
                    onBackground: '#ffffff',     // основной текст
                    onSurface: '#ffffff',        // текст на панелях
                    onPrimary: '#000000',        // текст на акценте
                    onSecondary: '#ffffff',      // текст на второстепенных элементах
                }
            }
        }
    }
});
