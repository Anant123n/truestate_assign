const API_URL = 'http://localhost:5000/api/sales';

export const fetchSales = async (params) => {
    try {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${API_URL}?${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch sales data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }
};
