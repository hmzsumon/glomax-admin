import ExcelDeposit from '@/components/Excel/ExcelDeposit';
import ExcelWithdraw from '@/components/Excel/ExcelWithdraw';
import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';

import { formDateWithTime } from '@/lib/functions';

const Excel = () => {
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div>
					<h4 className='text-center '>Generate Excel Sheet</h4>

					<div className='row'>
						{/* Start Deposit */}
						<div className='w-100 col-md-6'>
							<ExcelDeposit />
						</div>
						{/* End Deposit */}

						{/* Start Withdraw */}
						<div className='mt-5 col-md-6 w-100'>
							<ExcelWithdraw />
						</div>
						{/* End Withdraw */}
					</div>
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Excel;
