import { AdminLayout } from '@/layout';
import ProtectedRoute from '@/lib/ProtectedRoute';
import React from 'react';

const Game1m = () => {
	return (
		<AdminLayout>
			<ProtectedRoute>
				<div>
					<h1>Game 1m</h1>
				</div>
			</ProtectedRoute>
		</AdminLayout>
	);
};

export default Game1m;
