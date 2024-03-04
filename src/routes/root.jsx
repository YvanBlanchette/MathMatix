import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Root() {
	return (
		<div className='container d-flex flex-column justify-content-between align-items-center'>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}

export default Root;
