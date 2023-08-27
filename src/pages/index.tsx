import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { NextPage } from 'next';
import { deleteCookie, getCookie } from 'cookies-next';
import { AdminLayout } from '@layout';

import {
	BarElement,
	CategoryScale,
	Chart,
	Filler,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from 'chart.js';

import UsersCard from '@components/Dashboard/UsersCard';
import DepositCard from '@components/Dashboard/DepositCard';
import WithdrawCard from '@components/Dashboard/WithdrawCard';
import AiRobotCard from '@components/Dashboard/AiRobotCard';
import ProtectedRoute from '@lib/ProtectedRoute';
import { useGetCompanyQuery } from '@/features/company/companyApi';

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Tooltip,
	Filler
);

const Home: NextPage = () => {
	const { data } = useGetCompanyQuery();
	const { company } = data || {};
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div className='row'>
					<UsersCard users={company?.users} />
					<DepositCard deposit={company?.deposit} />
					<WithdrawCard />
					<AiRobotCard />
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Home;
