import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { StarWarsPerson, StarWarsApiResponse } from './types';
import type { TanstackTable } from '@e-burgos/tucutable';

export interface UseStarWarsPeopleReturn {
  data: StarWarsPerson[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  totalCount: number;
  fetchPage: (pagination: TanstackTable.PaginationState) => void;
  isFetching: boolean;
}

const SWAPI_BASE_URL = 'https://swapi.dev/api/people';

async function fetchStarWarsPeople(
  pagination: TanstackTable.PaginationState
): Promise<StarWarsApiResponse> {
  const response = await fetch(
    `${SWAPI_BASE_URL}/?page=${pagination.pageIndex + 1}&size=${
      pagination.pageSize
    }&format=json`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export function useStarWarsPeople({
  pagination,
}: {
  pagination: TanstackTable.PaginationState;
}): UseStarWarsPeopleReturn {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching } =
    useQuery<StarWarsApiResponse>({
      queryKey: ['starWarsPeople', pagination],
      queryFn: () => fetchStarWarsPeople(pagination),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      placeholderData: keepPreviousData,
    });

  const fetchPage = (pagination: TanstackTable.PaginationState) => {
    // Prefetch the next page for better UX
    queryClient.prefetchQuery({
      queryKey: ['starWarsPeople', 'prefetch', pagination],
      queryFn: () => fetchStarWarsPeople(pagination),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    data: data?.results ?? [],
    isLoading,
    isError,
    isFetching,
    totalCount: data?.count ?? 0,
    fetchPage,
    error:
      error instanceof Error ? error : error ? new Error(String(error)) : null,
  };
}
