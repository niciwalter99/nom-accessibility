import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useThemeDetection() {
    const theme = ref(getThemeFromBody())

    function getThemeFromBody() {
        const classList = document.body.classList
        if (classList.contains('high-contrast')) return 'high-contrast'
        return 'default'
    }

    let observer

    onMounted(() => {
        theme.value = getThemeFromBody();
        observer = new MutationObserver(() => {
            theme.value = getThemeFromBody()
        })

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        })
    })

    onBeforeUnmount(() => {
        if (observer) observer.disconnect()
    })

    return { theme }
}
