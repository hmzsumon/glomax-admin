import { apiSlice } from '../api/apiSlice';

export const adminWinnerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// create winner
		createWinner: builder.mutation<any, any>({
			query: (data) => ({
				url: `/admin/winner`,
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useCreateWinnerMutation } = adminWinnerApi;
