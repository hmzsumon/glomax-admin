import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBell,
	faEnvelope,
	IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
import {
	faBasketShopping,
	faChartBar,
	faGaugeHigh,
	faList,
	faUserMinus,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import useSound from 'use-sound';
import {
	Badge,
	Card,
	Dropdown,
	Nav,
	NavLink,
	ProgressBar,
} from 'react-bootstrap';
import Link from 'next/link';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Image from 'next/image';
import socketIOClient from 'socket.io-client';
import {
	useGetNotificationsQuery,
	useUpdateNotificationMutation,
} from '@/features/notifications/notificationApi';
import ioBaseUrl from '@/config/ioBaseUrl';

type ItemWithIconProps = {
	icon: IconDefinition;
} & PropsWithChildren;

const ItemWithIcon = (props: ItemWithIconProps) => {
	const { icon, children } = props;

	return (
		<>
			<FontAwesomeIcon className='me-2' icon={icon} fixedWidth />
			{children}
		</>
	);
};

export default function HeaderNotificationNav() {
	const { data, isSuccess } = useGetNotificationsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	const [updateNotification, { isSuccess: u_isSuccess, isError, error }] =
		useUpdateNotificationMutation();
	const { notifications } = data || [];
	const [allNotifications, setAllNotifications] = useState<any>([]);
	const [notificationCount, setNotificationCount] = useState(0);

	const [play, { stop }] = useSound('/assets/sounds/ring1.wav', { volume: 5 });

	// handle notification click
	const handleNotificationClick = async (notification: any) => {
		const { _id } = notification;
		const id = _id;
		await updateNotification(id);
	};

	useEffect(() => {
		if (u_isSuccess) {
			setAllNotifications(notifications);
			setNotificationCount(notifications?.length);
		}

		if (isError) {
			console.log(error);
		}
	}, [u_isSuccess, notifications]);

	useEffect(() => {
		if (isSuccess) {
			setAllNotifications(notifications);
			setNotificationCount(notifications?.length);
		}
	}, [isSuccess, notifications]);

	useEffect(() => {
		const socket = socketIOClient(ioBaseUrl);

		socket.on('notification', (data) => {
			// console.log('data', data);
			setAllNotifications([...allNotifications, data]);
			setNotificationCount(notificationCount + 1);
			play();
		});

		// Cleanup function to disconnect the socket and remove event listener when the component unmounts
		return () => {
			socket.disconnect();
			// Remove the 'result-pop' event listener
		};
	}, [allNotifications, notificationCount, play]);

	return (
		<Nav>
			<Nav.Item>
				<Dropdown>
					<Dropdown.Toggle
						as={NavLink}
						bsPrefix='hide-caret'
						id='dropdown-notification'
					>
						<FontAwesomeIcon icon={faBell} size='lg' />
						<Badge pill bg='danger' className='top-0 right-0 position-absolute'>
							{notificationCount}
						</Badge>
					</Dropdown.Toggle>
					<Dropdown.Menu className='pt-0' align='end'>
						<Dropdown.Header className='bg-light fw-bold rounded-top'>
							You have {notifications?.length} notifications
						</Dropdown.Header>
						{notifications?.map((notification: any) => (
							<Link
								key={notification?._id}
								href={`${notification?.url}`}
								passHref
								legacyBehavior
							>
								<Dropdown.Item
									onClick={() => handleNotificationClick(notification)}
								>
									<Card className='px-1 message'>
										<div>
											<small className='text-muted'>
												{notification?.username
													? notification?.username
													: 'John Doe'}
											</small>
											<small className='mt-1 text-muted float-end'>
												Just now
											</small>
										</div>
										<div className='text-truncate font-weight-bold'>
											<span className='text-danger'>!</span>{' '}
											{notification.message}
										</div>
										<div className='small text-truncate text-muted'>
											{notification.message}
										</div>
									</Card>
								</Dropdown.Item>
							</Link>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</Nav.Item>
			<Nav.Item>
				<Dropdown>
					<Dropdown.Toggle
						as={NavLink}
						bsPrefix='hide-caret'
						id='dropdown-task'
					>
						<FontAwesomeIcon icon={faList} size='lg' />
						<Badge
							pill
							bg='warning'
							className='top-0 right-0 position-absolute'
						>
							5
						</Badge>
					</Dropdown.Toggle>
					<Dropdown.Menu className='pt-0' align='end'>
						<Dropdown.Header className='bg-light fw-bold rounded-top'>
							You have 5 pending tasks
						</Dropdown.Header>

						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<small className='d-flex'>
									<div>Upgrade Next.JS</div>
									<div className='ms-auto'>0%</div>
								</small>
								<ProgressBar
									className='mt-2 progress-thin'
									variant='primary'
									now={0}
								/>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<small className='d-flex'>
									<div>Train Pokemons</div>
									<div className='ms-auto'>25%</div>
								</small>
								<ProgressBar
									className='mt-2 progress-thin'
									variant='danger'
									now={25}
								/>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<small className='d-flex'>
									<div>Complete Pokedex</div>
									<div className='ms-auto'>50%</div>
								</small>
								<ProgressBar
									className='mt-2 progress-thin'
									variant='warning'
									now={50}
								/>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<small className='d-flex'>
									<div>Catch all shiny</div>
									<div className='ms-auto'>75%</div>
								</small>
								<ProgressBar
									className='mt-2 progress-thin'
									variant='primary'
									now={75}
								/>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<small className='d-flex'>
									<div>Beat all gyms</div>
									<div className='ms-auto'>100%</div>
								</small>
								<ProgressBar
									className='mt-2 progress-thin'
									variant='success'
									now={100}
								/>
							</Dropdown.Item>
						</Link>

						<Dropdown.Divider />

						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item className='text-center fw-bold'>
								View all tasks
							</Dropdown.Item>
						</Link>
					</Dropdown.Menu>
				</Dropdown>
			</Nav.Item>
			<Nav.Item>
				<Dropdown>
					<Dropdown.Toggle
						as={NavLink}
						bsPrefix='hide-caret'
						id='dropdown-mail'
					>
						<FontAwesomeIcon icon={faEnvelope} size='lg' />
						<Badge
							pill
							bg='primary'
							className='top-0 right-0 position-absolute'
						>
							7
						</Badge>
					</Dropdown.Toggle>
					<Dropdown.Menu className='pt-0' align='end'>
						<Dropdown.Header className='bg-light fw-bold rounded-top'>
							You have 4 messages
						</Dropdown.Header>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<div className='message'>
									<div className='py-3 me-3 float-start'>
										<div className='avatar d-inline-flex position-relative'>
											<Image
												fill
												className='rounded-circle'
												src='/assets/img/avatars/1.jpg'
												alt='user@email.com'
											/>
											<span className='bottom-0 border border-white avatar-status position-absolute d-block end-0 bg-success rounded-circle' />
										</div>
									</div>
									<div>
										<small className='text-muted'>John Doe</small>
										<small className='mt-1 text-muted float-end'>
											Just now
										</small>
									</div>
									<div className='text-truncate font-weight-bold'>
										<span className='text-danger'>!</span> Pet Pikachu
									</div>
									<div className='small text-truncate text-muted'>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit,
										sed do eiusmod tempor incididunt
									</div>
								</div>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<div className='message'>
									<div className='py-3 me-3 float-start'>
										<div className='avatar d-inline-flex position-relative'>
											<Image
												fill
												className='rounded-circle'
												src='/assets/img/avatars/2.jpg'
												alt='user@email.com'
											/>
											<span className='bottom-0 border border-white avatar-status position-absolute d-block end-0 bg-warning rounded-circle' />
										</div>
									</div>
									<div>
										<small className='text-muted'>John Doe</small>
										<small className='mt-1 text-muted float-end'>
											5 mins ago
										</small>
									</div>
									<div className='text-truncate font-weight-bold'>
										Dress Eevee
									</div>
									<div className='small text-truncate text-muted'>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit,
										sed do eiusmod tempor incididunt
									</div>
								</div>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<div className='message'>
									<div className='py-3 me-3 float-start'>
										<div className='avatar d-inline-flex position-relative'>
											<Image
												fill
												className='rounded-circle'
												src='/assets/img/avatars/3.jpg'
												alt='user@email.com'
											/>
											<span className='bottom-0 border border-white avatar-status position-absolute d-block end-0 bg-danger rounded-circle' />
										</div>
									</div>
									<div>
										<small className='text-muted'>John Doe</small>
										<small className='mt-1 text-muted float-end'>1:52 PM</small>
									</div>
									<div className='text-truncate font-weight-bold'>
										Team up training
									</div>
									<div className='small text-truncate text-muted'>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit,
										sed do eiusmod tempor incididunt
									</div>
								</div>
							</Dropdown.Item>
						</Link>
						<Link href='#' passHref legacyBehavior>
							<Dropdown.Item>
								<div className='message'>
									<div className='py-3 me-3 float-start'>
										<div className='avatar d-inline-flex position-relative'>
											<Image
												fill
												className='rounded-circle'
												src='/assets/img/avatars/4.jpg'
												alt='user@email.com'
											/>
											<span className='bottom-0 border border-white avatar-status position-absolute d-block end-0 bg-primary rounded-circle' />
										</div>
									</div>
									<div>
										<small className='text-muted'>John Doe</small>
										<small className='mt-1 text-muted float-end'>4:03 PM</small>
									</div>
									<div className='text-truncate font-weight-bold'>
										Go to Safari Zone
									</div>
									<div className='small text-truncate text-muted'>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit,
										sed do eiusmod tempor incididunt
									</div>
								</div>
							</Dropdown.Item>
						</Link>
					</Dropdown.Menu>
				</Dropdown>
			</Nav.Item>
		</Nav>
	);
}
