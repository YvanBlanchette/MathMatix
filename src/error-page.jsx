import { useRouteError } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className='container'>
			<Header />
			<main id='error-page' className='d-flex flex-column justify-content-center align-items-center'>
				<h1>Oops!</h1>
				<p>Désolé, une erreur s'est produite.</p>
				<p>
					<i>{error.statusText || error.message}</i>
				</p>
			</main>
			<Footer />
		</div>
	);
}
