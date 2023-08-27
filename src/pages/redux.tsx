import React from 'react';
import { AdminLayout } from '@layout';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { changeCurrency } from '../features/appSlice';

const Redux = () => {
	const { currency } = useAppSelector((state) => state.app);
	const dispatch = useAppDispatch();

	const handleCurrencyChange = (e: any) => {
		dispatch(changeCurrency(e.target.value));
	};
	return (
		<AdminLayout>
			<h1>Redux</h1>
			<p>Current currency: {currency}</p>
			<select onChange={handleCurrencyChange}>
				<option value='USD'>USD</option>
				<option value='EUR'>EUR</option>
				<option value='GBP'>GBP</option>
			</select>
		</AdminLayout>
	);
};

export default Redux;
