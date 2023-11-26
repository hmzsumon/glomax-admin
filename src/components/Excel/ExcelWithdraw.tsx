import React from 'react';
import ExcelJS from 'exceljs';
import { useFindDepositBySlNoMutation } from '@/features/deposit/depositApi';
import { formDateWithTimeToLocal } from '@/lib/functions';
import { useGetWithdrawsBySlNoMutation } from '@/features/withdraw/withdrawApi';

const ExcelWithdraw = () => {
	const [startSlNO, setStartSlNO] = React.useState(0);
	const [endSlNO, setEndSlNO] = React.useState(0);

	const [getWithdrawsBySlNo, { data, isLoading, isError, error, isSuccess }] =
		useGetWithdrawsBySlNoMutation();

	const { withdraws } = data || [];
	const { totalAmount, count } = data || 0;

	// handle change start sl_no
	const handleChangeStartSlNO = (e: any) => {
		const value = e.target.value;
		const name = e.target.name;

		if (name === 'start_sl_no') {
			setStartSlNO(value);
		} else if (name === 'end_sl_no') {
			setEndSlNO(value);
		}
	};

	// handle search deposit
	const handleSearchDeposit = () => {
		console.log('startSlNO', startSlNO);
		const data = {
			start: startSlNO,
			end: endSlNO,
		};
		getWithdrawsBySlNo(data as any);
	};

	//handle excel export
	const handleExcelExport = () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Deposit');

		// add column name
		worksheet.columns = [
			{ header: 'Sl No', key: 'sl_no', width: 10 },
			{ header: 'User Id', key: 'user_id', width: 20 },
			{ header: 'Amount', key: 'amount', width: 10 },
			{ header: ' ', key: ' ', width: 10 },
			{ header: 'Net Amount', key: 'netAmount', width: 20 },
			{ header: ' ', key: ' ', width: 10 },
			{ header: 'Date', key: 'date', width: 30 },
		];

		// add row
		withdraws?.forEach((withdraw: any) => {
			worksheet.addRow({
				sl_no: withdraw.sl_no,
				user_id: withdraw.customer_id,
				amount: withdraw.amount,
				' ': ' ',
				netAmount: Number(withdraw.net_amount).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				}),

				date: formDateWithTimeToLocal(withdraw.approved_at),
			});
		});

		// save file
		workbook.xlsx.writeBuffer().then((data: any) => {
			const blob = new Blob([data], {
				type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', 'deposit.xlsx');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
	};
	return (
		<div>
			<div className='row'>
				<div className='col-md-6'>
					<div className='card'>
						<div className='card-body'>
							<h5 className='card-title'>Withdraw</h5>
							<p className='card-text'>Generate excel sheet for withdraw</p>

							{/* for input start sl_no and end sl_no  */}
							<div className='mb-3'>
								<label htmlFor='start_sl_no' className='form-label'>
									Start SL No
								</label>
								<input
									type='number'
									className='form-control'
									id='start_sl_no'
									name='start_sl_no'
									value={startSlNO}
									onChange={handleChangeStartSlNO}
								/>

								<label htmlFor='end_sl_no' className='form-label'>
									End SL No
								</label>
								<input
									type='number'
									className='form-control'
									id='end_sl_no'
									name='end_sl_no'
									value={endSlNO}
									onChange={handleChangeStartSlNO}
								/>
							</div>
							{/* end for input start sl_no and end sl_no  */}

							<div>
								{isSuccess && (
									<div className='alert alert-success' role='alert'>
										Total Amount: {totalAmount} | Total Count: {count}
									</div>
								)}
							</div>

							<div className='row'>
								<div className='col-md-6'>
									<button
										className='btn btn-primary'
										onClick={handleSearchDeposit}
									>
										Search
									</button>
								</div>
								<div className='col-md-6'>
									<button
										className='btn btn-primary '
										onClick={handleExcelExport}
										disabled={withdraws?.length === 0}
										style={{
											float: 'right',
											opacity: withdraws?.length === 0 ? 0.5 : 1,
											cursor:
												withdraws?.length === 0 ? 'not-allowed' : 'pointer',
										}}
									>
										Generate
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExcelWithdraw;
