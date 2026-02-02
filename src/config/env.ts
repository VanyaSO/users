const baseUrl = import.meta.env.VITE_BASE_API_URL;

if (!baseUrl) throw new Error('Base URL not found');

export { baseUrl };