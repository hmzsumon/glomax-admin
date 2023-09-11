import { apiSlice } from '../api/apiSlice';

export const companyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get company
		getCompany: builder.query<any, void>({
			query: () => '/admin/company',
			providesTags: ['Company'],
		}),

		// get balance info
		getBalanceInfo: builder.query<any, void>({
			query: () => '/admin/company/all-users-balance-info',
		}),
	}),
});

export const { useGetCompanyQuery, useGetBalanceInfoQuery } = companyApi;
