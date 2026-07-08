import { typedApi } from './config';

// Generic fetcher function
export const fetcher = async <T>(url: string): Promise<T> => {
  console.log('Fetching:', url);
  try {
    const response = await typedApi.get<T>(url);
    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}; 