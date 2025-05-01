import { createI18n } from 'vue-i18n';
import en from './locales/en';
import de from './locales/de';

const i18n = createI18n({
    legacy: false,
    locale: 'en', // Default locale
    fallbackLocale: 'en', // Fallback locale
    messages: {
        en,
        de,
    },
});

export default i18n;