import { useState } from 'react';
import { Card } from './components/Card';
import { useRepos } from './hooks/useRepos';
import { reposStore } from './store/favoritesRepos';

export const App = () => {
	const [githubUser, setGithubUser] = useState<string>('');
	const { isLoading, data, isError, user } = useRepos(githubUser || 'moises717');

	const { favoritesIds } = reposStore();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			setGithubUser(e.currentTarget.value);
		}
	};

	return (
		<div className='list'>
			<div className='search'>
				<div className='search-content'>
					<input type='text' placeholder='Search for github user ⏎' onKeyDown={handleKeyDown} />

					{isLoading ? (
						<div className='lds-ring'>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					) : (
						<img src={user?.avatar_url} className='user-img' />
					)}
				</div>
			</div>
			{isError && <div className='error'>User not found</div>}
			{data?.map(repo => (
				<Card repo={repo} key={repo.id} isFavorite={favoritesIds.includes(repo.id)} />
			))}
		</div>
	);
};
