import { useGetAllTransactionsQuery } from '@/features/auth/authApi';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import { useRouter } from 'next/router';
import React from 'react';
import { Spinner } from 'react-bootstrap';

const Transactions = () => {
	const router = useRouter();
	const userId = router.query.userId as any;
	const { data, isLoading, isError, isSuccess } =
		useGetAllTransactionsQuery(userId);

	const { transactions } = data || [];

	return (
		<AdminLayout>
			<ProtectedRoute>
				{isLoading ? (
					<div className=' d-flex justify-content-center align-items-center'>
						<Spinner animation='border' variant='primary' />
					</div>
				) : (
					<div className='container'>
						<h3>
							{transactions?.length === 0 ? 'No Transactions' : 'Transactions'}
						</h3>
						{isSuccess && transactions?.length > 0 && (
							<table className='table table-striped table-hover'>
								<thead>
									<tr>
										<th scope='col'>#</th>
										<th scope='col'>Date</th>
										<th scope='col'>Type</th>
										<th scope='col'>Amount</th>
										<th scope='col'>Purpose</th>
										<th scope='col'>Description</th>
									</tr>
								</thead>
								<tbody>
									{transactions?.map((transaction: any, index: number) => (
										<tr key={index}>
											<th scope='row'>{index + 1}</th>
											<td>
												{
													<span>
														{new Date(
															transaction?.createdAt
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
															day: 'numeric',
															hour: 'numeric',
															minute: 'numeric',
														})}
													</span>
												}
											</td>
											<td>{transaction?.transactionType}</td>
											<td>
												{Number(transaction?.amount).toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
													minimumFractionDigits: 2,
													maximumFractionDigits: 6,
												})}
											</td>
											<td>{transaction?.purpose}</td>
											<td>{transaction?.description}</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				)}
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Transactions;
