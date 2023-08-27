import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Breadcrumb from '@layout/AdminLayout/Breadcrumb/Breadcrumb';
import HeaderFeaturedNav from '@layout/AdminLayout/Header/HeaderFeaturedNav';
import HeaderNotificationNav from '@layout/AdminLayout/Header/HeaderNotificationNav';
import HeaderProfileNav from '@layout/AdminLayout/Header/HeaderProfileNav';
import { Button, Container } from 'react-bootstrap';
import Image from 'next/image';

type HeaderProps = {
	toggleSidebar: () => void;
	toggleSidebarMd: () => void;
};

export default function Header(props: HeaderProps) {
	const { toggleSidebar, toggleSidebarMd } = props;

	return (
		<header className='py-2 mb-4 header sticky-top px-sm-2 border-bottom'>
			<Container fluid className='header-navbar d-flex align-items-center'>
				<Button
					variant='link'
					className='shadow-none header-toggler d-md-none px-md-0 me-md-3 rounded-0'
					type='button'
					onClick={toggleSidebar}
				>
					<FontAwesomeIcon icon={faBars} />
				</Button>
				<Button
					variant='link'
					className='shadow-none header-toggler d-none d-md-inline-block px-md-0 me-md-3 rounded-0'
					type='button'
					onClick={toggleSidebarMd}
				>
					<FontAwesomeIcon icon={faBars} />
				</Button>
				<Link href='/' className='header-brand d-md-none'>
					<Image
						src='/assets/logo/log-black.png'
						alt='logo'
						width={65}
						height={30}
					/>
				</Link>
				<div className='header-nav d-none d-md-flex'>
					<HeaderFeaturedNav />
				</div>
				<div className='header-nav ms-auto'>
					<HeaderNotificationNav />
				</div>
				<div className='header-nav ms-2'>
					<HeaderProfileNav />
				</div>
			</Container>
			<div className='my-2 header-divider border-top mx-sm-n2' />
			<Container fluid>
				<Breadcrumb />
			</Container>
		</header>
	);
}
