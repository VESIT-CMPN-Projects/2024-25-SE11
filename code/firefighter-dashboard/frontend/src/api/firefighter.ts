const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getFirefighters = async () => {
  try {
    const response = await fetch(`${API_URL}/api/firefighters`);
    if (!response.ok) throw new Error('Failed to fetch firefighters');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
