import { apiSlice } from '../api/apiSlice';

export const kycApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get pending kyc
		getPendingKyc: builder.query<any, void>({
			query: () => '/admin/kyc/pending',
			providesTags: ['KYC'],
		}),

		// get pending kyc
		getPendingKycById: builder.query<any, any>({
			query: (id) => `/admin/kyc/pending/${id}`,
			providesTags: ['KYC'],
		}),

		// approve kyc by id
		approveKycById: builder.mutation<any, any>({
			query: (id) => ({
				url: `/admin/kyc/approve/${id}`,
				method: 'PUT',
			}),
		}),
	}),
});

export const {
	useGetPendingKycQuery,
	useGetPendingKycByIdQuery,
	useApproveKycByIdMutation,
} = kycApi;
