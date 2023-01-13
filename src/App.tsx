import { useState } from 'react';
import { Card } from './components/Card';
import { useRepos } from './hooks/useRepos';
import { reposStore } from './store/favoritesRepos';

export const App = () => {
	const [githubUser, setGithubUser] = useState<string>('');
	const { isLoading, data, isError } = useRepos(githubUser || 'moises717');

	const { favoritesIds } = reposStore();

	return (
		<div className='list'>
			<div className='search'>
				<input
					type='text'
					placeholder='Search for github user ⏎'
					onKeyDown={e => {
						if (e.key === 'Enter' || e.keyCode === 13) {
							setGithubUser(e.currentTarget.value);
						}
					}}
				/>
				<i className='fa-brands fa-github'></i>
				{isLoading && (
					<div className='lds-ring'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				)}
			</div>
			{isError && <div className='error'>User not found</div>}
			{data?.map(repo => (
				<Card repo={repo} key={repo.id} isFavorite={favoritesIds.includes(repo.id)} />
			))}
		</div>
	);
};
