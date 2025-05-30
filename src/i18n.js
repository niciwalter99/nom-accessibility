import { createI18n } from 'vue-i18n';
import en from './locales/en';
import de from './locales/de';
import enPlain from './locales/en-plain';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        de,
        enPlain,
    },
});

export default i18n;