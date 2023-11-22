import { apiSlice } from '../api/apiSlice';

export const depositApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get all deposits
		getDeposits: builder.query<any, void>({
			query: () => '/admin/deposits',
			providesTags: ['Deposits'],
		}),

		// get deposit by id
		getDepositById: builder.query<any, string>({
			query: (id) => `/deposit/${id}`,
			providesTags: ['Deposit'],
		}),

		// approve deposit
		approveDeposit: builder.mutation<any, any>({
			query: (data) => ({
				url: `/deposit/approve`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Deposit', 'Deposits', 'Company'],
		}),

		// reject deposit
		rejectDeposit: builder.mutation<any, any>({
			query: (data) => ({
				url: `/deposit/reject`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['Deposit', 'Deposits'],
		}),

		// add txId
		addTxId: builder.mutation<any, any>({
			query: (data) => ({
				url: `/add/tx-id`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['TxIds'],
		}),

		// get all txIds
		getTxIds: builder.query<any, void>({
			query: () => '/all/tx-id',
			providesTags: ['TxIds'],
		}),

		// find deposit by sl_no
		findDepositBySlNo: builder.mutation<any, string>({
			query: (data) => ({
				url: `/find/deposits/sl-no`,
				method: 'PUT',
				body: data,
			}),
		}),
	}),
});

export const {
	useGetDepositsQuery,
	useGetDepositByIdQuery,
	useApproveDepositMutation,
	useRejectDepositMutation,
	useAddTxIdMutation,
	useGetTxIdsQuery,
	useFindDepositBySlNoMutation,
} = depositApi;
