import { apiSlice } from '../api/apiSlice';
import { setUser, logoutUser } from './authSlice';
export interface IUser {
	user: any;
	token: string;
	success: boolean;
	data: {
		_id: string;
		name: string;
		email: string;
		role: string;
		createdAt: string;
		updatedAt: string;
	};
}
export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get user by email
		getUserByEmail: builder.query<any, void>({
			query: (email) => `/user-by-email/${email}`,
			providesTags: ['User'],
		}),
	}),
});

export const { useGetUserByEmailQuery } = authApi;
