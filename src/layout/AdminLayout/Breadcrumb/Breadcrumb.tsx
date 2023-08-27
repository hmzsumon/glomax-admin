import { useRouter } from 'next/router';
import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap';

export default function Breadcrumb() {
	const route = useRouter();
	const { pathname } = route;
	const { query } = route;
	let breadcrumbLabel = '';
	if (pathname === '/') {
		breadcrumbLabel = 'Dashboard';
	} else if (pathname.startsWith('/users/') || pathname === '/users') {
		breadcrumbLabel = 'Users';
	} else {
		breadcrumbLabel = pathname.replace('/', '').replace('[userID]', '');
	}
	return (
		<BSBreadcrumb listProps={{ className: 'mb-0 align-items-center' }}>
			<BSBreadcrumb.Item
				linkProps={{ className: 'text-decoration-none' }}
				href='/'
			>
				Home
			</BSBreadcrumb.Item>

			<BSBreadcrumb.Item active>{breadcrumbLabel}</BSBreadcrumb.Item>

			{query?.userId && (
				<BSBreadcrumb.Item active>{query?.userId}</BSBreadcrumb.Item>
			)}

			{query?.id && query?.subid && (
				<BSBreadcrumb.Item active>{query?.subid}</BSBreadcrumb.Item>
			)}

			{query?.id && query?.subid && query?.subsubid && (
				<BSBreadcrumb.Item active>{query?.subsubid}</BSBreadcrumb.Item>
			)}
		</BSBreadcrumb>
	);
}
