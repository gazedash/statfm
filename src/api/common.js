export function logError(json) {
    if (json.error) {
        console.error(json);
    }
}