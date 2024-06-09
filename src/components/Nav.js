import { Link } from 'react-router-dom';

export function Nav() {
	return (
		<nav
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center',
				height: '10vh',
				width: '100vw',
				backgroundColor: 'GrayText',
			}}>
			<Link
				to={'/'}
				style={{
					cursor: 'pointer',
					color: 'bisque',
				}}>
				<h3>Habits</h3>
			</Link>
		</nav>
	);
}
