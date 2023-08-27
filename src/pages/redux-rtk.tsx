import React from 'react';
import { AdminLayout } from '@layout';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { changeCurrency } from '../features/appSlice';
import { useGetBitcoinDataQuery } from 'src/services/app';

const INTERVAL_TIME = 5000; // 5 seconds
const Redux = () => {
	const { currency } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	const { data, isLoading, error } = useGetBitcoinDataQuery(undefined, {
		pollingInterval: INTERVAL_TIME,
	});

	if (isLoading) return <div>Loading ...</div>;
	if (error) return <div>Something went horrible wrong ...</div>;

	const handleCurrencyChange = (e: any) => {
		dispatch(changeCurrency(e.target.value));
	};
	return (
		<AdminLayout>
			<h1 className='text-success '>Redux Toolkit (RTK) </h1>

			<select onChange={handleCurrencyChange}>
				{data &&
					Object.keys(data).map((currency) => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
			</select>
			<p>Current currency: {currency}</p>
			<div>
				<h2>
					{data && data[currency].symbol} {data && data[currency].last}
				</h2>
			</div>
		</AdminLayout>
	);
};

export default Redux;
