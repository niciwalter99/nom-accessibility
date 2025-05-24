import {useStorage} from "@vueuse/core";

export const filter = useStorage('filter', {blind: false, deaf: false, mobility: false, cognitive: false, keywords: []})
