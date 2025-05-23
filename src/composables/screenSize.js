import {ref, onMounted, onUnmounted} from "vue";

const breakpoints = {
    desktop: 1040,
};

export function useScreenSize() {
    const lg = ref(window.innerWidth <= breakpoints.desktop);

    const updateDeviceType = () => {
        lg.value = window.innerWidth <= breakpoints.desktop;
    };

    onMounted(() => {
        window.addEventListener("resize", updateDeviceType);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", updateDeviceType);
    });
    return {lg}
}
