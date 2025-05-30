import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useThemeDetection() {
    const theme = ref(getThemeFromBody())

    function getThemeFromBody() {
        const classList = document.body.classList
        if (classList.contains('high-contrast')) return 'high-contrast'
        if (classList.contains('color-blind')) return 'color-blind'
        return 'default'
    }

    let observer

    onMounted(() => {
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
