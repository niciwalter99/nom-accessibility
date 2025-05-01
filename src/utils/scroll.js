export const scrollToPosition = (targetPosition) => {
    const currentPosition = window.scrollY;
    const distance = targetPosition - currentPosition;
    const duration = 200;
    const startTime = performance.now();

    const scrollStep = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
        const easeInOutQuad = progress < 0.5
            ? 4 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Ease-in-out function

        window.scrollTo(0, currentPosition + distance * easeInOutQuad);

        if (progress < 1) {
            window.requestAnimationFrame(scrollStep);
        }
    };

    window.requestAnimationFrame(scrollStep);
};
