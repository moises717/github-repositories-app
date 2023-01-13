import confetti from 'canvas-confetti';
import { Repository } from '../hooks/types';
import { reposStore } from '../store/favoritesRepos';

interface CardProps {
	repo: Repository;
	isFavorite: boolean;
}

export const Card = ({ repo, isFavorite }: CardProps) => {
	const addFavoriteRepo = reposStore(state => state.addFavorite);
	const removeFavoriteRepo = reposStore(state => state.removeFavorite);

	const handleLike = () => {
		if (isFavorite) {
			removeFavoriteRepo(repo.id);
		} else {
			addFavoriteRepo(repo.id);
			confetti({
				zIndex: 9999,
				particleCount: 100,
				spread: 160,
				angle: -100,
				origin: {
					x: 1,
					y: 0,
				},
			});
		}
	};

	return (
		<div key={repo.id}>
			<h3>{repo.name}</h3>
			<p>{repo.description}</p>

			<a href={repo.html_url} target='_blank' rel='noreferrer'>
				{repo.html_url}
			</a>
			<br />
			<br />
			<button onClick={handleLike}>
				<i
					className={`${isFavorite ? 'fa-solid fa-heart fa-2x' : 'fa-regular fa-heart fa-2x'}`}
					style={{
						color: isFavorite ? 'red' : 'black',
					}}
				></i>
			</button>
		</div>
	);
};
