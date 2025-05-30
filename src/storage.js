import {useStorage} from "@vueuse/core";

export const filter = useStorage('filter', {blind: false, deaf: false, mobility: false, cognitive: false, keywords: []})

export const settings = useStorage('settings', {largeCursor: false, highContrast: false, largeText: false, language: 'en', plainLanguage: false, signLanguage: false})
