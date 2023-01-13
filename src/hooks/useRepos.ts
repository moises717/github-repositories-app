import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { api } from '../api/github';
import { GithubUser, Repository } from './types';

export async function fetchRepos(ctx: QueryFunctionContext) {
	const [_, githubUsername] = ctx.queryKey;
	const { data } = await api.get<Repository[]>(`/users/${githubUsername}/repos`);
	return data;
}

export async function getGithubUser(ctx: QueryFunctionContext) {
	const [_, username] = ctx.queryKey;
	const { data } = await api.get<GithubUser>(`/users/${username}`);
	return data;
}

export function useRepos(githubUser: string) {
	const { isLoading, data, error, isError } = useQuery(['repos', githubUser], fetchRepos);
	const { isLoading: userLoading, data: user } = useQuery(['user', githubUser], getGithubUser);

	return {
		isLoading,
		userLoading,
		data,
		error,
		isError,
		user,
	};
}
