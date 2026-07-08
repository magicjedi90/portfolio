import { SWRConfiguration } from 'swr';
import useSWR from 'swr';
import type { Project, Job } from './types';
import { fetcher } from './fetcher';

// Generic hook for fetching data
export function useApi<T>(
  url: string | null,
  config?: SWRConfiguration
) {
  const result = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...config,
  });
  console.log('Hook result:', result);
  return result;
}

export function useProjects() {
  const { data, error, isLoading } = useApi<Project[]>('/projects');
  return {
    projects: data,
    isLoading,
    isError: error
  };
}

export function useJobs() {
  const { data, error, isLoading } = useApi<Job[]>('/jobs');
  return {
    jobs: data,
    isLoading,
    isError: error
  };
}
