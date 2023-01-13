import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { api } from '../api/github';
import { Repository } from './types';

export async function fetchRepos(ctx: QueryFunctionContext) {
	const [_, githubUsername] = ctx.queryKey;
	const { data } = await api.get<Repository[]>(`/users/${githubUsername}/repos`);
	return data;
}

export function useRepos(githubUser: string) {
	const { isLoading, data, error, isError } = useQuery(['repos', githubUser], fetchRepos);

	return {
		isLoading,
		data,
		error,
		isError,
	};
}
