import { useGetParticipantsByGameIdQuery } from '@/features/winGame/winGameApi';
import { toast } from 'react-toastify';
import { fetchBaseQueryError } from '@services/helpers';
import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';

const Participants = ({ id }: { id: any }) => {
	const { data, isLoading, isSuccess, isError, error, refetch } =
		useGetParticipantsByGameIdQuery(id);
	const { participants } = data || [];

	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl, {
			transports: ['websocket', 'polling'],
		});

		socket.on('get-game', (data) => {
			// console.log('data', data);
			if (data.game.game_type === '5m') {
				refetch();
			}
			if (data.game.game_type === '3m') {
				refetch();
			}
		});

		// Cleanup function to disconnect the socket and remove event listener when the component unmounts
		return () => {
			socket.disconnect();
			// Remove the 'result-pop' event listener
		};
	}, []);

	console.log('participants', participants);
	let content;
	if (isLoading) {
		content = <div>Loading...</div>;
	}
	if (isError) {
		const err = error as fetchBaseQueryError;
		return (content = (
			<div>
				<h4 className='text-center text-danger'>{err.data?.message}</h4>
			</div>
		));
	}
	if (isSuccess) {
		return (content = (
			<div>
				import Table from 'react-bootstrap/Table';
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Join</th>
							<th>Amount</th>
							<th>User Balance</th>
						</tr>
					</thead>
					<tbody>
						{participants?.map((participant: any, index: number) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{participant?.name}</td>
								<td
									style={{
										backgroundColor: participant?.trade_colors[0],
										color: '#fff',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										fontWeight: 'bold',
										textTransform: 'capitalize',
									}}
								>
									{participant?.bet_id}
								</td>
								<td>
									{Number(participant?.amount).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</td>
								<td>
									{Number(participant?.user_balance).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		));
	}

	return <Container>{content}</Container>;
};

export default Participants;
