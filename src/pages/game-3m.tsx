import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import React from 'react';

const Game3m = () => {
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div>
					<h1>Game 3m</h1>
					<p>Developer is Sleeping now! Please come back later. Thank you!</p>
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Game3m;
