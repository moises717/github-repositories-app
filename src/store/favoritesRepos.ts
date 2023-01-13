import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Repo = {
	favoritesIds: number[];
	addFavorite: (id: number) => void;
	removeFavorite: (id: number) => void;
};

export const reposStore = create(
	persist<Repo>(
		set => ({
			favoritesIds: [],
			addFavorite: (id: number) =>
				set(state => ({
					favoritesIds: [...state.favoritesIds, id],
				})),

			removeFavorite: (id: number) =>
				set(state => ({
					favoritesIds: state.favoritesIds.filter(favoriteId => favoriteId !== id),
				})),
		}),
		{
			name: 'favorites-repos',
		},
	),
);
