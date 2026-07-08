import useSWR, { SWRConfiguration } from 'swr';
import type { Project, Job } from './types';
import { fetcher } from './fetcher';

export function useApi<T>(url: string | null, config?: SWRConfiguration) {
    return useSWR<T>(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        ...config,
    });
}

export function useProjects() {
    const { data: projects, isLoading, error } = useApi<Project[]>('/projects');
    return { projects, isLoading, error };
}

export function useJobs() {
    const { data: jobs, isLoading, error } = useApi<Job[]>('/jobs');
    return { jobs, isLoading, error };
}
