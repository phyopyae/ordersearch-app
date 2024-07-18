export const fetchDetails = () => {
    return fetch('/details.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Failed to fetch data :', error);
            return [];
        });
}