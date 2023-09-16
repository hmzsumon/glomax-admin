import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import socketIOClient from 'socket.io-client';
import ioBaseUrl from '@/config/ioBaseUrl';
import { set } from 'nprogress';

const TimerThree = (gameType: any) => {
	const [time, setTime] = React.useState(0);
	const [gam_type, setGame_type] = React.useState('');
	useEffect(() => {
		setGame_type(gameType);
	}, [gameType]);
	const [period, setPeriod] = React.useState(0);
	const formatTime = (timeInSeconds: number): string => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	};
	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl, {
			transports: ['websocket', 'polling'],
		});

		socket.on('game-3m', (data) => {
			// console.log('data', data);
			setTime(data?.time);
			setPeriod(data?.game_id);
		});

		// Cleanup function to disconnect the socket and remove event listener when the component unmounts
		return () => {
			socket.disconnect();
			// Remove the 'result-pop' event listener
		};
	}, []);
	return (
		<div>
			<Card>
				<Card.Body className='gap-2 d-flex'>
					<div className='gap-2 d-flex'>
						<Card.Title>Period No</Card.Title>
						<Card.Text>{period}</Card.Text>
					</div>
					<div className='gap-2 d-flex'>
						<span>Time</span>
						<span>{formatTime(time)}</span>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default TimerThree;
