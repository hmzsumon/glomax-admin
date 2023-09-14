import { apiSlice } from '../api/apiSlice';
import { logoutUser } from '../auth/authSlice';

export const winGameApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get active test
		getActiveTest: builder.query<any, void>({
			query: () => ({
				url: `/active-test`,
				method: 'GET',
			}),
			providesTags: ['User', 'Test'],
		}),

		// 1m active game
		oneMActiveGame: builder.query<any, void>({
			query: () => ({
				url: `/active-1m-win-game`,
				method: 'GET',
			}),
			providesTags: ['User', 'Game-1m'],
		}),

		// 3m active game
		threeMActiveGame: builder.query<any, void>({
			query: () => ({
				url: `/active-3m-win-game`,
				method: 'GET',
			}),
			providesTags: ['User', 'Game-3m'],
		}),

		// 5m active game
		fiveMActiveGame: builder.query<any, void>({
			query: () => ({
				url: `/active-5m-win-game`,
				method: 'GET',
			}),
			providesTags: ['User', 'Game-5m'],
		}),

		// win game create trade
		winGameCreateTrade: builder.mutation<any, any>({
			query: (body) => ({
				url: `/win-game-create-trade`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['User'],
		}),

		// get winGame result by game_type
		getWinGameResult: builder.query<any, string>({
			query: (game_type) => ({
				url: `/win-games-results/${game_type}`,
				method: 'GET',
			}),
			providesTags: ['User', 'Game-1m', 'Game-3m', 'Game-5m'],
			// onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
			// 	dispatch(winGameApi.util.resetApiState('loadUser'));
			// },
		}),

		// logged in user records
		getLoggedInUserRecords: builder.query<any, void>({
			query: (id) => ({
				url: `/logged-in-user-records/${id}`,
				method: 'GET',
			}),
			providesTags: ['User', 'Game-1m', 'Game-3m', 'Game-5m'],
		}),
	}),
});

export const {
	useGetActiveTestQuery,
	useOneMActiveGameQuery,
	useThreeMActiveGameQuery,
	useFiveMActiveGameQuery,
	useWinGameCreateTradeMutation,
	useGetWinGameResultQuery,
	useGetLoggedInUserRecordsQuery,
} = winGameApi;
