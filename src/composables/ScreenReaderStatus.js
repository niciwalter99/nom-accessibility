
export function SRMessage(message, elementID = 'screenreader-status') {
    const sr = document.getElementById(elementID);
    console.log('SR message', message);
    sr.textContent = '';
    setTimeout(() => {
        sr.textContent = message;
    }, 100);
}