const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';

export const fetcher = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${apiBaseUrl}${path}`);

    if (!response.ok) {
        throw new Error(`API request to ${path} failed with status ${response.status}`);
    }

    return response.json();
};
