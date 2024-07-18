export const fetchOrders = () => {
    return fetch('/orders.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Failed to fetch data :', error);
            return [];
        });
}