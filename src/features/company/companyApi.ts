import { apiSlice } from '../api/apiSlice';

export const companyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get company
		getCompany: builder.query<any, void>({
			query: () => '/admin/company',
			providesTags: ['Company'],
		}),
	}),
});

export const { useGetCompanyQuery } = companyApi;
